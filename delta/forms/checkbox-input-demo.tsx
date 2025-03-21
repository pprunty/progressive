'use client';

import { CheckboxInput } from './checkbox-input';
import { z } from 'zod';

export default function CheckboxInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <DefaultCheckboxInputDemo />
      <ValidationCheckboxInputDemo />
      <MutedLabelCheckboxInputDemo />
      <RequiredCheckboxInputDemo />
      <DisabledCheckboxInputDemo />
      <HintCheckboxInputDemo />
      <DescriptionCheckboxInputDemo />
    </div>
  );
}

export function DefaultCheckboxInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default Checkbox Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckboxInput label="Accept terms and conditions" name="terms" />
        <CheckboxInput
          label="Subscribe to newsletter"
          name="newsletter"
          defaultChecked
        />
      </div>
    </div>
  );
}

export function ValidationCheckboxInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Validation</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckboxInput
          label="I agree to the terms and conditions"
          name="terms-validation"
          error="You must agree to the terms and conditions"
          schema={z.literal(true, {
            errorMap: () => ({
              message: 'You must agree to the terms and conditions',
            }),
          })}
        />
        <CheckboxInput
          label="I confirm I am over 18 years old"
          name="age-validation"
          error="You must confirm you are over 18"
          schema={z.literal(true, {
            errorMap: () => ({ message: 'You must confirm you are over 18' }),
          })}
        />
      </div>
    </div>
  );
}

export function MutedLabelCheckboxInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Muted Label Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckboxInput
          label="Remember me"
          name="remember"
          labelVariant="muted"
        />
        <CheckboxInput
          label="Save payment information"
          name="save-payment"
          labelVariant="muted"
        />
      </div>
    </div>
  );
}

export function RequiredCheckboxInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Required Fields</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckboxInput
          label="I agree to the privacy policy"
          name="privacy"
          required
        />
        <CheckboxInput
          label="I consent to data processing"
          name="data-consent"
          required
        />
      </div>
    </div>
  );
}

export function DisabledCheckboxInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Disabled State</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckboxInput
          label="Premium features (upgrade required)"
          name="premium"
          disabled
        />
        <CheckboxInput
          label="Admin access (not available)"
          name="admin"
          disabled
          defaultChecked
        />
      </div>
    </div>
  );
}

export function HintCheckboxInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Hint Text</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckboxInput
          label="Receive promotional emails"
          name="promo-emails"
          hint="We'll send occasional offers and updates"
        />
        <CheckboxInput
          label="Enable two-factor authentication"
          name="2fa"
          hint="Adds an extra layer of security to your account"
        />
      </div>
    </div>
  );
}

export function DescriptionCheckboxInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Description</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckboxInput
          label="Share usage data"
          name="usage-data"
          description="Help us improve our product by sharing anonymous usage statistics"
        />
        <CheckboxInput
          label="Enable notifications"
          name="notifications"
          description="Receive alerts about account activity and updates"
          defaultChecked
        />
      </div>
    </div>
  );
}
