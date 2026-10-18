import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const dynamic = "force-dynamic";

const FAMILY_COLLECTION = "family_requests";

// High-empathy baseline seed records so the Admin Cockpit is never cold/empty
const SEED_FAMILY_REQUESTS = [
  {
    id: "fam-01",
    institutionName: "सरस्वती विद्या मंदिर इंटर कॉलेज",
    contactPerson: "श्री राजेश कुमार शर्मा (प्रधानाचार्य)",
    contactNumber: "+919876543210",
    cityState: "मेरठ, उत्तर प्रदेश",
    studentCount: 920,
    challenge: "बायोमेट्रिक टर्नस्टाइल से स्टाफ LOP और लेट-मार्क का ऑटोमैटिक वेतन कैलकुलेशन चाहिए। वर्तमान सॉफ्टवेयर में बहुत त्रुटियां होती हैं।",
    preferredLanguage: "hi",
    status: "new",
    notes: "मेरठ कैम्पस के लिए 2 लेन टर्नस्टाइल सेटअप में रुचि।",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
  {
    id: "fam-02",
    institutionName: "Greenwood Public Academy",
    contactPerson: "Mr. Vikramaditya Rathore (Managing Director)",
    contactNumber: "+919812345678",
    cityState: "Jaipur, Rajasthan",
    studentCount: 1450,
    challenge: "Need automated double-entry fee deficit tracking (+25% radar) and direct WhatsApp payment reminders to reduce parent follow-up friction.",
    preferredLanguage: "en",
    status: "in_dialogue",
    notes: "Demonstrated local-first offline desktop client. Shared Windows 64-bit installer link.",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: "fam-03",
    institutionName: "नवयुग सीनियर सेकेंडरी स्कूल",
    contactPerson: "डॉ. अनीता चौधरी (उप-प्रधानाचार्या)",
    contactNumber: "+919923456789",
    cityState: "देहरादून, उत्तराखंड",
    studentCount: 680,
    challenge: "सीबीएसई एलओसी (CBSE LOC) और यू-डाइस प्लस (U-DISE+) पर डेटा भरने में क्लर्क को 15 दिन लगते हैं। आपका क्रोम एक्सटेंशन ऑटो-फिल डेमो चाहिए।",
    preferredLanguage: "hi",
    status: "family_member",
    notes: "एक्सटेंशन सफलतापूर्वक इंस्टॉल कर दिया गया। 15 दिन का कार्य 40 मिनट में पूरा हुआ।",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

export async function GET() {
  try {
    let requests: any[] = [];
    try {
      const q = query(
        collection(db, FAMILY_COLLECTION),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        requests = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
      } else {
        // First run: save seed records
        for (const seed of SEED_FAMILY_REQUESTS) {
          const { id, ...data } = seed;
          await addDoc(collection(db, FAMILY_COLLECTION), {
            ...data,
            createdAt: serverTimestamp(),
          });
        }
        requests = SEED_FAMILY_REQUESTS;
      }
    } catch (e) {
      console.warn("Using seed family requests due to Firestore read/index:", e);
      requests = SEED_FAMILY_REQUESTS;
    }

    return NextResponse.json({
      success: true,
      data: requests,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      institutionName,
      contactPerson,
      contactNumber,
      cityState,
      challenge,
      studentCount,
      preferredLanguage,
    } = body;

    if (!institutionName || !contactNumber) {
      return NextResponse.json(
        { success: false, error: "विद्यालय का नाम और संपर्क नंबर आवश्यक है।" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, FAMILY_COLLECTION), {
      institutionName: institutionName.trim(),
      contactPerson: (contactPerson || "आदरणीय अतिथि").trim(),
      contactNumber: contactNumber.trim(),
      cityState: (cityState || "").trim(),
      challenge: (challenge || "संस्थागत परामर्श").trim(),
      studentCount: Number(studentCount) || 0,
      preferredLanguage: preferredLanguage || "hi",
      status: "new",
      notes: "वेबसाइट 'अतिथि देवो भव' टचपॉइंट से प्राप्त",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "आपका अनुरोध सम्मानपूर्वक प्राप्त हुआ। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing request id" }, { status: 400 });
    }

    const docRef = doc(db, FAMILY_COLLECTION, id);
    const updates: Record<string, any> = {
      updatedAt: serverTimestamp(),
    };
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    await updateDoc(docRef, updates);

    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
