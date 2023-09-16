import { getServerSession } from "next-auth/next";

export default async function IndexPage() {
  const session = await getServerSession();
  if (!session) {
    return <div>loading...</div>;
  }
  return <div>Home</div>;
}
