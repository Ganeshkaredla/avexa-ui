"use client";

import { useEffect, useState } from "react";
import SignOutButton from "./SignOutButton";
import ThemeToggle from "./ThemeToggle";

export default function SessionControls() {
  const [isAuthed, setIsAuthed] = useState(false);

  // Simple cookie check
  const checkSession = () => {
    return document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("session=1"));
  };

  useEffect(() => {
    setIsAuthed(checkSession());

    // Optional: re-check when cookies change
    const interval = setInterval(() => {
      setIsAuthed(checkSession());
    }, 1000); // poll every second (lightweight for demo)

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <ThemeToggle />
      {isAuthed && <SignOutButton />}
    </div>
  );
}
