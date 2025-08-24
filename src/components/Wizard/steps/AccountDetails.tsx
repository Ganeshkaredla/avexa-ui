"use client";
import { useOnboarding } from "@/src/store/useOnboarding";
import { accountDetailsSchema } from "@/src/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function AccountDetails() {
  const { data, update } = useOnboarding();
  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      documentId: data.documentId || "",
      dob: data.dob || "",
    },
    mode: "onChange",
  });
  watch((vals: any) =>
    update({
      ...vals,
      dob: typeof vals.dob === "string" ? vals.dob : vals.dob?.toString(),
    })
  );
  return (
    <Box component="form" aria-label="Account details form">
      <div className="row">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full name"
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
          )}
        />
      </div>
      <div className="row">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              error={!!errors.phone}
              helperText={errors.phone?.message as string}
            />
          )}
        />
        <Controller
          name="dob"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of birth"
                value={field.value ? dayjs(field.value) : null}
                onChange={(d) =>
                  field.onChange(d ? d.toDate().toISOString() : "")
                }
                slotProps={{
                  textField: {
                    error: !!errors.dob,
                    helperText: errors.dob?.message as string,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </div>
      <div className="row">
        <Controller
          name="documentId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Document ID"
              error={!!errors.documentId}
              helperText={errors.documentId?.message as string}
            />
          )}
        />
      </div>
    </Box>
  );
}
