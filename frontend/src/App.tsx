import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import Front from "../src/components/pages/Front";

export default function App() {
  return (
    <>
      <header className="text-white">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div>
        <Front />
      </div>
    </>
  );
}
