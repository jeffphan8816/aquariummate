import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function IndexPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>loading...</div>;
  }
  return <div>Home</div>;
}
