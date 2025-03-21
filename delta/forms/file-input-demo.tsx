'use client';

import { FileInput } from './file-input';
import { z } from 'zod';

// Define a schema for file validation
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const imageSchema = z.instanceof(File).superRefine((file, ctx) => {
  if (file.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File size must be less than 5MB`,
    });
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Only JPEG, PNG and WebP images are accepted`,
    });
  }
});

export default function FileInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <DefaultFileInputDemo />
      <PillFileInputDemo />
      <ValidationFileInputDemo />
      <MutedLabelFileInputDemo />
      <RequiredFileInputDemo />
      <DisabledFileInputDemo />
      <HintFileInputDemo />
      <MultipleFilesDemo />
    </div>
  );
}

export function DefaultFileInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default File Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput label="Profile Picture" name="profile" accept="image/*" />
        <FileInput label="Resume" name="resume" accept=".pdf,.doc,.docx" />
      </div>
    </div>
  );
}

export function PillFileInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pill Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput
          label="Avatar"
          name="avatar"
          accept="image/*"
          variant="pill"
        />
        <FileInput
          label="Document"
          name="document"
          accept=".pdf,.doc,.docx"
          variant="pill"
          coloredBorder
        />
      </div>
    </div>
  );
}

export function ValidationFileInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Validation</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput
          label="Profile Image"
          name="profile-validation"
          accept="image/jpeg,image/png,image/webp"
          maxSize={MAX_FILE_SIZE}
          error="Please upload a valid image file (JPEG, PNG, WebP) under 5MB"
          schema={imageSchema}
        />
        <FileInput
          label="Document"
          name="document-validation"
          accept=".pdf"
          maxSize={2 * 1024 * 1024}
          error="Please upload a PDF file under 2MB"
          variant="pill"
        />
      </div>
    </div>
  );
}

export function MutedLabelFileInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Muted Label Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput
          label="Upload Image"
          name="image-muted"
          accept="image/*"
          labelVariant="muted"
        />
        <FileInput
          label="Upload Document"
          name="document-muted"
          accept=".pdf,.doc,.docx"
          labelVariant="muted"
          variant="pill"
        />
      </div>
    </div>
  );
}

export function RequiredFileInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Required Fields</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput
          label="ID Document"
          name="id-document"
          accept=".pdf,.jpg,.jpeg,.png"
          required
        />
        <FileInput
          label="Proof of Address"
          name="proof-address"
          accept=".pdf,.jpg,.jpeg,.png"
          required
          variant="pill"
        />
      </div>
    </div>
  );
}

export function DisabledFileInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Disabled State</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput
          label="Verification Document"
          name="verification"
          accept=".pdf,.jpg,.jpeg,.png"
          disabled
        />
        <FileInput
          label="Additional Documents"
          name="additional-docs"
          accept=".pdf,.doc,.docx"
          disabled
          variant="pill"
        />
      </div>
    </div>
  );
}

export function HintFileInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Hint Text</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput
          label="Profile Picture"
          name="profile-hint"
          accept="image/*"
          hint="Upload a clear photo of your face. Max 5MB."
        />
        <FileInput
          label="Resume"
          name="resume-hint"
          accept=".pdf,.doc,.docx"
          hint="PDF or Word documents only. Max 10MB."
          variant="pill"
        />
      </div>
    </div>
  );
}

export function MultipleFilesDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Multiple Files Upload</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput
          label="Photo Gallery"
          name="gallery"
          accept="image/*"
          multiple
          maxFiles={5}
          hint="Upload up to 5 images"
        />
        <FileInput
          label="Supporting Documents"
          name="supporting-docs"
          accept=".pdf,.doc,.docx"
          multiple
          maxFiles={3}
          hint="Upload up to 3 documents"
          variant="pill"
        />
      </div>
    </div>
  );
}
