# Implementation Plan: STAHIZA Official Admission Form, Fees & Printable Letter Generator

We will implement the official **Standard High School - Zzana Admission Form and Fees Structure** across all 6 classes (**S.1, S.2, S.3, S.4** for O-Level and **S.5, S.6** for A-Level) with **Day** and **Boarding** options, complete with an interactive fee calculator and an instant printable **Official Admission Offer Letter** featuring the official STAHIZA school logo.

---

## User Context & Alignment
Based on the official STAHIZA S.5 Admission Form document uploaded by the user:
- **Logo Integration**: Prominently display the official STAHIZA school badge/crest logo on the top header of both the online admission form and the printable Admission Offer Letter document.
- **Classes Supported**: S1, S2, S3, S4 (O-Level) & S5, S6 (A-Level).
- **Options**: Day Student vs Boarding Student.
- **Official Fee Structure (UGX)**:
  - Admission Fee: `50,000/=`
  - Tuition (Day): `726,000/=`
  - Tuition (Boarding): `1,316,000/=`
  - Uniform (Labelling inclusive): `287,000/=`
  - Identity Card: `10,000/=`
  - Sports Wear: `50,000/=`
  - Requirements: `50,000/=`
  - **Total Day First Term**: `UGX 1,173,000/=`
  - **Total Boarding First Term**: `UGX 1,763,000/=`
- **Uniform & Boarding Requirements**:
  - In-class & Out-of-class uniform items for boys and girls.
  - Boarding items (basin, jerrycan, mattress, bed sheets, blanket, cutlery, parent passport photo).
  - Textbook library contribution & official headteacher sign-off by **KURAHUKA OSTRICAST, HEADTEACHER**.

---

## Proposed Architecture & Changes

### 1. New Navigation Tab & State
- Add `'admissions'` tab ("Fees & Admission Form") to top `Navbar`, `Footer`, and `App.tsx` state union (`'home' | 'leadership' | 'academics' | 'sports' | 'campus' | 'admissions' | 'contact'`).

### 2. Dedicated Admission Component (`src/components/AdmissionFormSection.tsx`)
- **Logo Header**: Display the STAHIZA crest logo, school contact details, and motto ("EDUCATION IS THE WAY").
- **Class & Status Selector**: Allows selecting S1–S6, Day/Boarding, optional House assignment, and A-Level combination (PCM, BCM, PCB, PEM, HEG, MEG, HED, etc.).
- **Live Fee Breakdown Calculator**: Itemized display of tuition, admission, uniform, ID card, sports wear, and requirements fees.
- **Requirements & Uniforms**: Full list of boys/girls uniforms and boarding items as specified in the official document.
- **Official Offer Letter Generator**:
  - Live preview of the official STAHIZA Admission Form document formatted with the official school logo, motto ("EDUCATION IS THE WAY"), student details, fees table, rules, and Headteacher sign-off.
  - One-click **Print / Download PDF** button with `@media print` styling for crisp paper or PDF output.

### 3. Upgraded Application Modal (`src/components/ApplyModal.tsx`)
- Embed the STAHIZA school logo at the top of the modal header.
- Update the modal to support all 6 classes (S1 to S6).
- Dynamically toggle O-Level vs A-Level combination fields depending on chosen class.
- Generate and present the official printable Admission Offer Letter with school logo upon form submission.

### 4. Integration & Navigation Update (`src/App.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`)
- Connect the new `admissions` tab in the header navbar and footer links.
- Ensure smooth scrolling and navigation state handling.

---

## Verification Plan
1. **Compilation & Syntax**: Run `compile_applet` and `lint_applet` to ensure zero build errors.
2. **Functional Verification**:
   - Verify school logo renders clearly in both screen preview and print mode.
   - Verify S1–S6 selection and Day vs Boarding fee calculations.
   - Test generating and printing the official Admission Offer Letter.
   - Verify responsiveness on mobile, tablet, and desktop viewports.
