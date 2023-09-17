
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// const adminEmails = ['jeffphan8816@gmail.com'];

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


// export async function isAdminRequest(req: Request,res:Response) {
//   const session = await getServerSession(req,res,authOptions);
//   if (!adminEmails.includes(session?.user?.email)) {
//     res.status(401);
//     res.end();
//     throw 'not an admin';
//   }
// }