"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Chip,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
export default function CustomerView() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/customers/${id}`, { cache: "no-store" });
      if (res.ok) setItem(await res.json());
    })();
  }, [id]);
  const del = async () => {
    if (!confirm("Delete this customer?")) return;
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
    router.push("/customers");
  };
  if (!item) return <div />;
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        {item.name}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip
          label={item.status}
          color={
            item.status === "approved"
              ? "success"
              : item.status === "rejected"
              ? "error"
              : "info"
          }
        />
        <Link href={`/customers/${id}/edit`}>
          <Button variant="outlined">Edit</Button>
        </Link>
        <Button color="error" variant="outlined" onClick={del}>
          Delete
        </Button>
      </Stack>
      <Card>
        <CardContent>
          <Typography>Email: {item.email}</Typography>
          <Typography>Phone: {item.phone}</Typography>
          <Typography>
            DOB: {new Date(item.dob).toLocaleDateString()}
          </Typography>
          <Typography>Document ID: {item.documentId}</Typography>
          <Typography>Address: {item.profile?.address || "-"}</Typography>
          <Typography>Notes: {item.profile?.notes || "-"}</Typography>
          <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
            Created: {new Date(item.createdAt).toLocaleString()} · Updated:{" "}
            {new Date(item.updatedAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
