import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { google } from 'googleapis';
import mongoose from 'mongoose';

// Load environment variables from .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(
  envFile
    .split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_DRIVE_ROOT_FOLDER_ID = env.GOOGLE_DRIVE_ROOT_FOLDER_ID || '1Nt7xkTFIJuBRpFAh9QhydkdopEP49WOl';
const MONGODB_URI = env.MONGODB_URI;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
  console.error('Missing Google OAuth credentials in .env.local');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth: oauth2Client });

const SCREENSHOTS_BASE_DIR = 'd:/modernisum/vidhyam/vidhyam_school/desktop_app/ui/tests/screenshots';

const SCREENSHOTS_CONFIG = [
  {
    id: 'dashboard',
    title: 'Executive Cockpit & School Dashboard',
    category: 'Executive Overview',
    caption: 'Real-time administrative telemetry: daily attendance metrics, fee collection summaries, active bus tracking alerts, and quick actions.',
    relPath: 'school-admin/dashboard_overview_screen.png',
    fileName: 'vidhyam_desktop_dashboard_overview.png',
    isMain: true,
  },
  {
    id: 'attendance',
    title: 'Automated RFID & Face AI Attendance Console',
    category: 'Attendance & Security',
    caption: 'Sub-second contactless campus entry logging with instant parent WhatsApp notifications and leave quota tracking.',
    relPath: 'school-admin/attendance_overview_screen.png',
    fileName: 'vidhyam_desktop_attendance_overview.png',
  },
  {
    id: 'timetable',
    title: 'Conflict-Free Timetable & Teacher Substitution Engine',
    category: 'Academic Scheduling',
    caption: 'Intelligent timetable matrix with drag-and-drop slot reordering and automated teacher substitution resolving.',
    relPath: 'school-admin/timetable_grid_overview.png',
    fileName: 'vidhyam_desktop_timetable_grid.png',
  },
  {
    id: 'call_center',
    title: 'Autonomous Voice Campaign & Parent Call Center',
    category: 'Communication & CRM',
    caption: 'Integrated outbound calling engine for batch attendance alerts, fee recovery reminders, and automated DTMF feedback collection.',
    relPath: 'call-center/01_call_center_dashboard.png',
    fileName: 'vidhyam_desktop_call_center_dashboard.png',
  },
  {
    id: 'assistant',
    title: 'Integrated AI Administrative Copilot',
    category: 'Cognitive AI',
    caption: 'Context-aware conversational assistant delivering instant student dossiers, marksheet analytics, and board policy answers.',
    relPath: 'assistant/01_assistant_global_overview_layout.png',
    fileName: 'vidhyam_desktop_assistant_overview.png',
  },
  {
    id: 'admissions',
    title: 'In-Place Multi-Step Student Admission Suite',
    category: 'Student Onboarding',
    caption: 'Paperless admission workflow with instant certificate OCR, fee schedule assignment, and bus route mapping.',
    relPath: 'school-admin/student_admission_inplace_form.png',
    fileName: 'vidhyam_desktop_student_admission.png',
  },
  {
    id: 'roster',
    title: 'Centralized Student Information & Dossier Directory',
    category: 'Records & Dossiers',
    caption: 'Comprehensive student records with multi-attribute filtering, emergency contact cards, and complete academic audit trails.',
    relPath: 'school-admin/students_roster_table.png',
    fileName: 'vidhyam_desktop_students_roster.png',
  },
];

async function uploadFile(filePath, destFileName) {
  const fileBuffer = fs.readFileSync(filePath);
  const stream = new Readable();
  stream.push(fileBuffer);
  stream.push(null);

  // Check if file already exists in folder
  const existingRes = await drive.files.list({
    q: `'${GOOGLE_DRIVE_ROOT_FOLDER_ID}' in parents and name = '${destFileName}' and trashed = false`,
    fields: 'files(id, name, webViewLink)',
  });

  let fileId;
  let webViewLink;

  if (existingRes.data.files && existingRes.data.files.length > 0) {
    fileId = existingRes.data.files[0].id;
    webViewLink = existingRes.data.files[0].webViewLink;
    console.log(`[GDrive] File already exists: ${destFileName} (ID: ${fileId})`);
  } else {
    console.log(`[GDrive] Uploading ${destFileName}...`);
    const uploadRes = await drive.files.create({
      requestBody: {
        name: destFileName,
        parents: [GOOGLE_DRIVE_ROOT_FOLDER_ID],
      },
      media: {
        mimeType: 'image/png',
        body: stream,
      },
      supportsAllDrives: true,
      fields: 'id, name, webViewLink',
    });
    fileId = uploadRes.data.id;
    webViewLink = uploadRes.data.webViewLink;
    console.log(`[GDrive] Uploaded successfully: ${destFileName} (ID: ${fileId})`);
  }

  // Ensure public reader permission
  try {
    await drive.permissions.create({
      fileId,
      supportsAllDrives: true,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
  } catch (pErr) {
    // Ignore already public errors
  }

  const publicUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;

  return { fileId, publicUrl, thumbnailUrl, webViewLink };
}

async function run() {
  console.log('--- Starting Vidhyam Screenshot Upload & MongoDB Sync ---');
  const uploadedScreenshots = [];

  for (const item of SCREENSHOTS_CONFIG) {
    const fullPath = path.join(SCREENSHOTS_BASE_DIR, item.relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }
    const uploadData = await uploadFile(fullPath, item.fileName);
    uploadedScreenshots.push({
      id: item.id,
      title: item.title,
      category: item.category,
      caption: item.caption,
      url: uploadData.publicUrl,
      thumbnailUrl: uploadData.thumbnailUrl,
      fileId: uploadData.fileId,
      isMain: Boolean(item.isMain),
    });
  }

  console.log(`\nUploaded ${uploadedScreenshots.length} screenshots to Google Drive successfully!`);

  // Connect to MongoDB Atlas
  console.log('\nConnecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB!');

  const projectsCollection = mongoose.connection.db.collection('projects');

  const mainCover = uploadedScreenshots.find((s) => s.isMain)?.url || uploadedScreenshots[0].url;

  // 1. Update Vidhyam Desktop Suite
  const res1 = await projectsCollection.updateOne(
    { slug: 'vidhyam-desktop-suite' },
    {
      $set: {
        imageUrl: mainCover,
        screenshots: uploadedScreenshots.map((s) => ({
          title: s.title,
          category: s.category,
          caption: s.caption,
          url: s.url,
          thumbnailUrl: s.thumbnailUrl,
        })),
        updatedAt: new Date(),
      },
    }
  );
  console.log('Updated vidhyam-desktop-suite in MongoDB:', res1.modifiedCount > 0 ? 'SUCCESS' : 'Already up to date');

  // 2. Update Modern School ERP Ecosystem
  const res2 = await projectsCollection.updateOne(
    { slug: 'modern-school-ecosystem' },
    {
      $set: {
        imageUrl: mainCover,
        screenshots: uploadedScreenshots.map((s) => ({
          title: s.title,
          category: s.category,
          caption: s.caption,
          url: s.url,
          thumbnailUrl: s.thumbnailUrl,
        })),
        updatedAt: new Date(),
      },
    }
  );
  console.log('Updated modern-school-ecosystem in MongoDB:', res2.modifiedCount > 0 ? 'SUCCESS' : 'Already up to date');

  // Write out a JSON file with the URLs for easy reference
  const outputPath = 'lib/vidhyam-screenshots.json';
  fs.writeFileSync(outputPath, JSON.stringify(uploadedScreenshots, null, 2), 'utf8');
  console.log(`Saved screenshot metadata to ${outputPath}`);

  await mongoose.disconnect();
  console.log('\n--- Ingestion & Database Sync Complete! ---');
}

run().catch((err) => {
  console.error('Execution failed:', err);
  process.exit(1);
});
