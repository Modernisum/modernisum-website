import { connectToDatabase } from "@/lib/db";
import { AppRelease, IAppRelease } from "@/lib/models/AppRelease";
import { AuditLog } from "@/lib/models/AuditLog";
import { ReleaseItem, SEED_RELEASES } from "./release-types";

export { type ReleaseItem, SEED_RELEASES };

let inMemoryReleases: ReleaseItem[] = [...SEED_RELEASES];

export async function getAppReleases(): Promise<ReleaseItem[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      let dbReleases = await AppRelease.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
      if (!dbReleases || dbReleases.length === 0) {
        // Seed initial releases
        for (const r of SEED_RELEASES) {
          await AppRelease.create({
            version: r.version,
            title: r.title,
            releaseDate: r.releaseDate,
            overview: r.overview,
            improvements: r.improvements,
            fixes: r.fixes,
            patches: r.patches,
            downloadUrl: r.downloadUrl,
            fileSize: r.fileSize,
            sha256: r.sha256,
            isPublished: true,
            isLatest: r.isLatest,
          });
        }
        dbReleases = await AppRelease.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
      }

      if (dbReleases && dbReleases.length > 0) {
        const mapped = JSON.parse(JSON.stringify(dbReleases)).map((r: any) => ({
          id: String(r._id || r.id),
          version: r.version,
          title: r.title,
          releaseDate: r.releaseDate,
          overview: r.overview,
          improvements: r.improvements || [],
          fixes: r.fixes || [],
          patches: r.patches || [],
          downloadUrl: r.downloadUrl,
          gdriveFileId: r.gdriveFileId,
          fileSize: r.fileSize || "68.4 MB",
          sha256: r.sha256,
          isLatest: Boolean(r.isLatest),
        }));

        return mapped.sort((a: any, b: any) => {
          if (a.isLatest && !b.isLatest) return -1;
          if (!a.isLatest && b.isLatest) return 1;
          return b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: "base" });
        });
      }
    }
  } catch (err) {
    console.warn("MongoDB offline, serving releases from resilient memory store:", err);
  }

  return inMemoryReleases;
}

export async function createAppRelease(releaseData: Omit<ReleaseItem, "id">, actorEmail = "admin@modernisum.com"): Promise<ReleaseItem> {
  const newRelease: ReleaseItem = {
    ...releaseData,
    id: `rel_${Date.now()}`,
  };

  try {
    const conn = await connectToDatabase();
    if (conn) {
      if (newRelease.isLatest) {
        await AppRelease.updateMany({}, { isLatest: false });
      }

      const created = await AppRelease.create({
        version: releaseData.version,
        title: releaseData.title,
        releaseDate: releaseData.releaseDate,
        overview: releaseData.overview,
        improvements: releaseData.improvements,
        fixes: releaseData.fixes,
        patches: releaseData.patches,
        downloadUrl: releaseData.downloadUrl,
        gdriveFileId: releaseData.gdriveFileId,
        fileSize: releaseData.fileSize,
        sha256: releaseData.sha256,
        isPublished: true,
        isLatest: releaseData.isLatest,
      });

      await AuditLog.create({
        action: "APP_RELEASE_PUBLISHED",
        category: "System",
        actor: actorEmail,
        target: releaseData.version,
        details: `Published Vidhyam Desktop OS version ${releaseData.version}: "${releaseData.title}".`,
      });

      newRelease.id = String(created._id);
      return newRelease;
    }
  } catch (err) {
    console.warn("MongoDB write failed, updating in-memory release store:", err);
  }

  inMemoryReleases = [newRelease, ...inMemoryReleases];
  return newRelease;
}

export async function deleteAppRelease(version: string, actorEmail = "admin@modernisum.com"): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await AppRelease.deleteOne({ version });
      await AuditLog.create({
        action: "APP_RELEASE_DELETED",
        category: "System",
        actor: actorEmail,
        target: version,
        details: `Deleted Vidhyam Desktop OS version ${version}.`,
      });
      return true;
    }
  } catch (err) {
    console.warn("MongoDB delete failed, removing from memory store:", err);
  }

  inMemoryReleases = inMemoryReleases.filter((r) => r.version !== version);
  return true;
}
