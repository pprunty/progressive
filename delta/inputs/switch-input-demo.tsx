'use client';

import { SwitchInput } from './switch-input';
import { z } from 'zod';

export default function SwitchInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Custom Switch Input Demo
      </h1>

      <ExtendedClickAreaDemo />
      <VariantsDemo />
      <SizeVariantsDemo />
      <CustomColorSwitch />
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

export function ExtendedClickAreaDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Extended Click Area</h2>
      <p className="text-muted-foreground mb-4">
        The extended click area creates an invisible touch target around the
        switch, making it easier to interact with, especially on mobile devices.
        The dotted border below visualizes the extended area (not visible in
        production).
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative border border-dashed border-muted-foreground/30 rounded-lg p-12 flex justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-lg"></div>
          </div>
          <SwitchInput
            label="With Extended Click Area (Default)"
            name="extended-click-area"
            extendedClickArea={true}
            containerClassName="w-full max-w-xs"
            variant="pill"
          />
        </div>
        <div className="relative border border-dashed border-muted-foreground/30 rounded-lg p-12 flex justify-center">
          <SwitchInput
            label="Without Extended Click Area"
            name="no-extended-click-area"
            extendedClickArea={false}
            containerClassName="w-full max-w-xs"
          />
        </div>
      </div>
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> The extended click area is enabled by default
          for better mobile usability. It creates a larger touch target
          (approximately 40px in each direction) without changing the visual
          appearance. Try tapping/clicking near the switch in the first example
          - it will toggle even when clicking outside the visible switch.
        </p>
      </div>
    </div>
  );
}

export function VariantsDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Shape Variants</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <SwitchInput
          label="Pill"
          name="pill-variant"
          variant="pill"
          defaultChecked
        />
        <SwitchInput
          label="Rectangular (Default)"
          name="rectangular-variant"
          variant="rectangular"
          defaultChecked
        />
        <SwitchInput
          label="Large Pill"
          name="large-pill"
          variant="pill"
          size="large"
          defaultChecked
        />
        <SwitchInput
          label="Large Rectangular"
          name="large-rectangular"
          variant="rectangular"
          size="large"
          defaultChecked
        />
      </div>
    </div>
  );
}

export function SizeVariantsDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Size Variants</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <SwitchInput label="Default Size" name="default-size" defaultChecked />
        <SwitchInput
          label="Large Size (1.2x)"
          name="large-size"
          size="large"
          defaultChecked
        />
      </div>
    </div>
  );
}

export function CustomColorSwitch() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Custom Colors</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <SwitchInput
          label="Success"
          name="success-switch"
          activeColor="#22c55e"
          defaultChecked
        />
        <SwitchInput
          label="Warning"
          name="warning-switch"
          activeColor="#f59e0b"
          defaultChecked
        />
        <SwitchInput
          label="Info"
          name="info-switch"
          activeColor="#3b82f6"
          defaultChecked
        />
        <SwitchInput
          label="Danger"
          name="danger-switch"
          activeColor="#ef4444"
          defaultChecked
        />
        <SwitchInput
          label="Rectangular Success"
          name="rect-success-switch"
          activeColor="#22c55e"
          variant="rectangular"
          defaultChecked
        />
        <SwitchInput
          label="Rectangular Danger"
          name="rect-danger-switch"
          activeColor="#ef4444"
          variant="rectangular"
          defaultChecked
        />
      </div>
    </div>
  );
}

export function DefaultSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Default Switch Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SwitchInput label="Dark Mode" name="dark-mode" variant="pill" />
        <SwitchInput
          label="Notifications"
          name="notifications"
          defaultChecked
          variant="pill"
        />
      </div>
    </div>
  );
}

export function ValidationSwitchInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">With Validation</h2>
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
      <h2 className="text-2xl font-semibold">Muted Label Variant</h2>
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
      <h2 className="text-2xl font-semibold">Required Fields</h2>
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
      <h2 className="text-2xl font-semibold">Disabled State</h2>
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
      <h2 className="text-2xl font-semibold">With Hint Text</h2>
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
      <h2 className="text-2xl font-semibold">With Description</h2>
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
