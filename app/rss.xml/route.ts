import { GET as getFeed } from "../feed.xml/route";

export const dynamic = "force-static";

export async function GET() {
  return getFeed();
}
