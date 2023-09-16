"use client";

import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function IndexPage() {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            className="bg-white p-2 px-4 rounded-lg"
            onClick={() => signIn("google")}
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }
  return (
    // Your component
    <div className="bg-blue-900 w-screen h-screen">
      <Nav />
      logged in {session.user.email}
    </div>
  );
}
