"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
export default function SignOutButton() {
  const router = useRouter();
  const handle = () => {
    document.cookie = "session=; Max-Age=0; path=/";
    router.push("/signin");
  };
  return (
    <Button variant="outlined" onClick={handle}>
      Sign out
    </Button>
  );
}
