'use client';

import { RadioInput } from './radio-input';
import { z } from 'zod';

const planOptions = [
  {
    value: 'free',
    label: 'Free Plan',
    description: 'Basic features for personal use',
  },
  {
    value: 'pro',
    label: 'Pro Plan',
    description: 'Advanced features for professionals',
  },
  {
    value: 'enterprise',
    label: 'Enterprise Plan',
    description: 'Custom solutions for large organizations',
  },
];

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple', disabled: true },
];

export default function RadioInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <DefaultRadioInputDemo />
      <HorizontalRadioInputDemo />
      <ValidationRadioInputDemo />
      <MutedLabelRadioInputDemo />
      <RequiredRadioInputDemo />
      <DisabledRadioInputDemo />
      <HintRadioInputDemo />
      <DisabledOptionsRadioInputDemo />
    </div>
  );
}

export function DefaultRadioInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default Radio Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RadioInput
          label="Select a Plan"
          name="plan"
          options={planOptions}
          defaultValue="free"
        />
      </div>
    </div>
  );
}

export function HorizontalRadioInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Horizontal Layout</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RadioInput
          label="Select a Color"
          name="color"
          options={colorOptions}
          orientation="horizontal"
        />
      </div>
    </div>
  );
}

export function ValidationRadioInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Validation</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RadioInput
          label="Select a Plan"
          name="plan-validation"
          options={planOptions}
          error="Please select a plan"
          schema={z.string().min(1, 'Please select a plan')}
        />
      </div>
    </div>
  );
}

export function MutedLabelRadioInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Muted Label Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RadioInput
          label="Select a Plan"
          name="plan-muted"
          options={planOptions}
          labelVariant="muted"
          defaultValue="pro"
        />
      </div>
    </div>
  );
}

export function RequiredRadioInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Required Fields</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RadioInput
          label="Select a Plan"
          name="plan-required"
          options={planOptions}
          required
        />
      </div>
    </div>
  );
}

export function DisabledRadioInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Disabled State</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RadioInput
          label="Select a Plan"
          name="plan-disabled"
          options={planOptions}
          disabled
          defaultValue="free"
        />
      </div>
    </div>
  );
}

export function HintRadioInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Hint Text</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RadioInput
          label="Select a Plan"
          name="plan-hint"
          options={planOptions}
          description="Choose the plan that best fits your needs"
        />
      </div>
    </div>
  );
}

export function DisabledOptionsRadioInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Disabled Options</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RadioInput
          label="Select a Color"
          name="color-disabled-options"
          options={colorOptions}
          description="Some colors may not be available"
        />
      </div>
    </div>
  );
}
