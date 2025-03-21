'use client';

import { TextareaInput } from './textarea-input';
import { z } from 'zod';

export default function TextareaInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <DefaultTextareaInputDemo />
      <PillTextareaInputDemo />
      <ValidationTextareaInputDemo />
      <MutedLabelTextareaInputDemo />
      <RequiredTextareaInputDemo />
      <DisabledTextareaInputDemo />
      <HintTextareaInputDemo />
      <RowsTextareaInputDemo />
    </div>
  );
}

export function DefaultTextareaInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default Textarea Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextareaInput
          label="Message"
          name="message"
          placeholder="Enter your message"
        />
        <TextareaInput
          label="Bio"
          name="bio"
          placeholder="Tell us about yourself"
        />
      </div>
    </div>
  );
}

export function PillTextareaInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pill Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextareaInput
          label="Feedback"
          name="feedback"
          placeholder="Share your thoughts"
          variant="pill"
        />
        <TextareaInput
          label="Comments"
          name="comments"
          placeholder="Add your comments"
          variant="pill"
          coloredBorder
        />
      </div>
    </div>
  );
}

export function ValidationTextareaInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Validation</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextareaInput
          label="Review"
          name="review"
          placeholder="Write your review"
          error="Review must be at least 10 characters"
          schema={z.string().min(10, 'Review must be at least 10 characters')}
        />
        <TextareaInput
          label="Description"
          name="description"
          placeholder="Describe your product"
          error="Description must be between 20 and 500 characters"
          schema={z
            .string()
            .min(20, 'Description must be at least 20 characters')
            .max(500, 'Description cannot exceed 500 characters')}
          variant="pill"
        />
      </div>
    </div>
  );
}

export function MutedLabelTextareaInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Muted Label Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextareaInput
          label="Notes"
          name="notes"
          placeholder="Add any additional notes"
          labelVariant="muted"
        />
        <TextareaInput
          label="Instructions"
          name="instructions"
          placeholder="Provide special instructions"
          labelVariant="muted"
        />
      </div>
    </div>
  );
}

export function RequiredTextareaInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Required Fields</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextareaInput
          label="Feedback"
          name="feedback-required"
          placeholder="Share your feedback"
          required
        />
        <TextareaInput
          label="Cover Letter"
          name="cover-letter"
          placeholder="Introduce yourself"
          required
          variant="pill"
        />
      </div>
    </div>
  );
}

export function DisabledTextareaInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Disabled State</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextareaInput
          label="Previous Feedback"
          name="previous-feedback"
          placeholder="Your previous feedback"
          disabled
          defaultValue="This was great! I really enjoyed using this product."
        />
        <TextareaInput
          label="System Notes"
          name="system-notes"
          placeholder="System generated notes"
          disabled
          defaultValue="Auto-generated content not editable by users."
          variant="pill"
        />
      </div>
    </div>
  );
}

export function HintTextareaInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Hint Text</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextareaInput
          label="Review"
          name="review-hint"
          placeholder="Write your review"
          hint="Be honest and constructive in your feedback"
        />
        <TextareaInput
          label="Bio"
          name="bio-hint"
          placeholder="Tell us about yourself"
          hint="Keep it concise, around 2-3 sentences"
          variant="pill"
        />
      </div>
    </div>
  );
}

export function RowsTextareaInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Custom Rows</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextareaInput
          label="Short Answer"
          name="short-answer"
          placeholder="Brief response"
          rows={2}
        />
        <TextareaInput
          label="Detailed Response"
          name="detailed-response"
          placeholder="Provide a detailed explanation"
          rows={8}
          variant="pill"
        />
      </div>
    </div>
  );
}
