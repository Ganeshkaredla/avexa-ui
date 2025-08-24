"use client";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export default function SignInPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/dashboard";
  const [email, setEmail] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    document.cookie = "session=1; path=/; samesite=lax";
    router.push(next);
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{ maxWidth: 420, margin: "80px auto" }}
      aria-label="Sign in form"
    >
      <Card>
        <CardHeader title="Sign in" />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ "aria-describedby": "email-help" }}
            />
            <Typography id="email-help" variant="body2" color="text.secondary">
              Demo only: any email works.
            </Typography>
            <Button type="submit" variant="contained">
              Continue
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
