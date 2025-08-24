import Link from "next/link";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
export default function Dashboard() {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Dashboard
      </Typography>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            Welcome! Start by onboarding a new customer or manage existing
            records.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="/customers/new">
              <Button variant="contained">New Onboarding</Button>
            </Link>
            <Link href="/customers">
              <Button variant="outlined">View Customers</Button>
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
