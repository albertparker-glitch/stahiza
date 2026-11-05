# EmailJS SDK Integration for Student Admissions

Integrate `@emailjs/browser` SDK to automatically send pre-filled admission application forms directly to `hasty0joel@gmail.com` upon form submission.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following choices were confirmed by the user in Phase 1:
> - **EmailJS SDK Integration**: Use `@emailjs/browser` SDK to send application emails directly to `hasty0joel@gmail.com`.
> - **Smart Fallback**: If EmailJS API keys are unconfigured in environment variables, apply an automated fallback to guaranteed `mailto:` link protocol dispatch so no application data is lost.
> - **Automatic Sending Only**: Automatic background email dispatch upon form submission without requiring extra manual steps.
> - **Recipient Email**: `hasty0joel@gmail.com`.
> - **Confirmation Notice**: `"Application sent, pending approval in 2 business days. We will contact you on WhatsApp or Email."`

---

## 1. Overview & Core Concept

- **What It Does**: When a parent submits the student admission form (S.1–S.6, Boarding/Day), `@emailjs/browser` dispatches an email containing student details, parent contact information, academic records, and class preferences to `hasty0joel@gmail.com`.
- **Target Audience**: Prospective students and parents applying to Standard High School Zzana.
- **Key Value**: Real, automated email delivery directly into the school administration's inbox using EmailJS.

---

## 2. Technical Architecture & Email Payload

```
┌────────────────────────────────────────────────────────────────────────┐
│                      EmailJS Submission Flow                           │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                   ┌───────────────────────────────┐
                   │  Online Admission Form        │
                   └───────────────┬───────────────┘
                                   │
                                   ▼
                   ┌───────────────────────────────┐
                   │  @emailjs/browser SDK         │
                   │  emailjs.send(service, tpl)   │
                   └───────────────┬───────────────┘
                                   │
                                   ▼
                   ┌───────────────────────────────┐
                   │  Destination Inbox            │
                   │  --> hasty0joel@gmail.com     │
                   └───────────────────────────────┘
```

- **Email Payload Fields**:
  - `to_email`: `hasty0joel@gmail.com`
  - `student_name`: Student full name
  - `parent_name`: Parent/Guardian name
  - `parent_phone`: Contact phone number
  - `parent_email`: Parent email address
  - `target_class`: Class applying for (S.1 to S.6)
  - `residence_type`: Boarding or Day section
  - `previous_school`: Previous school attended
  - `grades_aggregate`: PLE/UCE aggregates
  - `ref_code`: Generated Reference Code (e.g., `STH-2026-7842`)

---

## 3. Planned Implementation Steps

1. **Install Package**:
   - Install `@emailjs/browser` package.

2. **Update `src/lib/emailService.ts`**:
   - Import `@emailjs/browser`.
   - Configure `emailjs.send()` using environment variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`) with graceful fallback to `mailto:` trigger if keys are not set.

3. **Update `AdmissionFormSection.tsx` & `ApplyModal.tsx`**:
   - Call `dispatchApplicationEmail()` on submit with active loading state.
   - Show toast and confirmation card: `"Application sent! Pending approval in 2 business days. Dispatched to hasty0joel@gmail.com via EmailJS."`
   - Include direct WhatsApp chat button for follow-up.

4. **Verification**:
   - Run `compile_applet` and `lint_applet` to ensure zero compilation errors.
