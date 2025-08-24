"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useOnboarding } from "@/src/store/useOnboarding";
import AccountDetails from "./steps/AccountDetails";
import CustomerProfile from "./steps/CustomerProfile";
import ReviewSubmit from "./steps/ReviewSubmit";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
export default function Wizard({ mode }: { mode: "create" | "edit" }) {
  const { step, next, prev, data, update, reset } = useOnboarding();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (mode === "edit" && id) {
        const res = await fetch(`/api/customers/${id}`, { cache: "no-store" });
        if (res.ok) {
          const item = await res.json();
          update(item);
        }
      }
    })();
  }, [mode, id, update]);
  const saveDraft = async () => {
    setLoading(true);
    const res = await fetch(`/api/drafts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    setLoading(false);
    setToast({
      open: true,
      message: res.ok ? "Draft saved" : "Failed to save draft",
      severity: res.ok ? "success" : "error",
    });
  };
  const submit = async () => {
    setLoading(true);
    const payload = { ...data, status: "submitted" };
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      setToast({ open: true, message: "Submitted", severity: "success" });
      reset();
      router.push("/customers");
    } else {
      setToast({ open: true, message: "Submit failed", severity: "error" });
    }
  };
  return (
    <Box>
      <Card>
        <CardContent>
          <Stepper
            activeStep={step}
            alternativeLabel
            aria-label="Onboarding steps"
          >
            {["Account Details", "Customer Profile", "Review & Submit"].map(
              (label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            )}
          </Stepper>
        </CardContent>
      </Card>
      <Box sx={{ mt: 2 }}>
        {step === 0 && <AccountDetails />}
        {step === 1 && <CustomerProfile />}
        {step === 2 && <ReviewSubmit />}
      </Box>
      <Box
        sx={{ display: "flex", gap: 1, mt: 2 }}
        role="toolbar"
        aria-label="Wizard actions"
      >
        <Button disabled={step === 0} onClick={prev}>
          Back
        </Button>
        {step < 2 ? (
          <Button variant="contained" onClick={next}>
            Next
          </Button>
        ) : (
          <Button variant="contained" disabled={loading} onClick={submit}>
            Submit
          </Button>
        )}
        <Button variant="outlined" disabled={loading} onClick={saveDraft}>
          Save draft
        </Button>
      </Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
