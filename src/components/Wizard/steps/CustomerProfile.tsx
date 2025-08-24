"use client";
import { useOnboarding } from "@/src/store/useOnboarding";
import { TextField } from "@mui/material";
export default function CustomerProfile() {
  const { data, update } = useOnboarding();
  return (
    <form aria-label="Customer profile form">
      <div className="row">
        <TextField
          label="Address"
          multiline
          minRows={4}
          value={data.profile?.address || ""}
          onChange={(e) =>
            update({ profile: { ...data.profile, address: e.target.value } })
          }
          placeholder="Street, City, Country"
        />
        <TextField
          label="Notes"
          multiline
          minRows={4}
          value={data.profile?.notes || ""}
          onChange={(e) =>
            update({ profile: { ...data.profile, notes: e.target.value } })
          }
          inputProps={{ maxLength: 500 }}
          helperText={`${(data.profile?.notes || "").length}/500`}
          placeholder="Additional information"
        />
      </div>
    </form>
  );
}
