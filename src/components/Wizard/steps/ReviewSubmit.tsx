"use client";
import { useOnboarding } from "@/src/store/useOnboarding";
import { Card, CardContent, Typography, Stack } from "@mui/material";
export default function ReviewSubmit() {
  const { data } = useOnboarding();
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography>
            <strong>Name:</strong> {data.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {data.email}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {data.phone}
          </Typography>
          <Typography>
            <strong>DOB:</strong>{" "}
            {data.dob ? new Date(data.dob).toLocaleDateString() : ""}
          </Typography>
          <Typography>
            <strong>Document ID:</strong> {data.documentId}
          </Typography>
          <Typography>
            <strong>Address:</strong> {data.profile?.address}
          </Typography>
          <Typography>
            <strong>Notes:</strong> {data.profile?.notes}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
