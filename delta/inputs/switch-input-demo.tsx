'use client';

import { SwitchInput } from './switch-input';
import { z } from 'zod';

export default function SwitchInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <DefaultSwitchInputDemo />
      <ValidationSwitchInputDemo />
      <MutedLabelSwitchInputDemo />
      <RequiredSwitchInputDemo />
      <DisabledSwitchInputDemo />
      <HintSwitchInputDemo />
      <DescriptionSwitchInputDemo />
    </div>
  );
}

export function DefaultSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default Switch Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SwitchInput label="Dark Mode" name="dark-mode" />
        <SwitchInput
          label="Notifications"
          name="notifications"
          defaultChecked
        />
      </div>
    </div>
  );
}

export function ValidationSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Validation</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SwitchInput
          label="Accept Terms"
          name="terms-validation"
          error="You must accept the terms"
          schema={z.literal(true, {
            errorMap: () => ({ message: 'You must accept the terms' }),
          })}
        />
        <SwitchInput
          label="Data Sharing"
          name="data-sharing-validation"
          error="Data sharing is required"
          schema={z.literal(true, {
            errorMap: () => ({ message: 'Data sharing is required' }),
          })}
        />
      </div>
    </div>
  );
}

export function MutedLabelSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Muted Label Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SwitchInput label="Auto-save" name="auto-save" labelVariant="muted" />
        <SwitchInput
          label="Sound Effects"
          name="sound-effects"
          labelVariant="muted"
          defaultChecked
        />
      </div>
    </div>
  );
}

export function RequiredSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Required Fields</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SwitchInput
          label="Accept Privacy Policy"
          name="privacy-policy"
          required
        />
        <SwitchInput label="Data Processing" name="data-processing" required />
      </div>
    </div>
  );
}

export function DisabledSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Disabled State</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SwitchInput label="Premium Feature" name="premium-feature" disabled />
        <SwitchInput
          label="System Setting"
          name="system-setting"
          disabled
          defaultChecked
        />
      </div>
    </div>
  );
}

export function HintSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Hint Text</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SwitchInput
          label="Two-factor Authentication"
          name="2fa"
          hint="Adds an extra layer of security to your account"
        />
        <SwitchInput
          label="Email Notifications"
          name="email-notifications"
          hint="Receive important updates via email"
        />
      </div>
    </div>
  );
}

export function DescriptionSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Description</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SwitchInput
          label="Analytics"
          name="analytics"
          description="Allow us to collect anonymous usage data to improve our service"
        />
        <SwitchInput
          label="Marketing Communications"
          name="marketing"
          description="Receive updates about new features and promotions"
        />
      </div>
    </div>
  );
}
