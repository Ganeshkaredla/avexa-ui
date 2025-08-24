import { z } from "zod";
import { differenceInYears } from "date-fns";
export const accountDetailsSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d+$/, "Digits only").min(10).max(15),
  documentId: z.string().regex(/^[A-Z0-9]{6,14}$/i, "6-14 alphanumeric"),
  dob: z.string().refine((v) => {
    const d = new Date(v);
    return !isNaN(d.getTime()) && differenceInYears(new Date(), d) >= 18;
  }, "You must be at least 18 years old"),
});
export const profileSchema = z.object({
  address: z.string().optional(),
  notes: z.string().max(500).optional(),
});
export const onboardingSchema = accountDetailsSchema.extend({
  profile: profileSchema.optional(),
});
export type AccountDetails = z.infer<typeof accountDetailsSchema>;
