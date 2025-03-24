'use client';

import { SelectInput } from './select-input';
import { z } from 'zod';

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

const roleOptions = [
  { value: 'user', label: 'User' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Administrator' },
  { value: 'owner', label: 'Owner', disabled: true },
];

export default function SelectInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <DefaultSelectInputDemo />
      <PillSelectInputDemo />
      <ValidationSelectInputDemo />
      <MutedLabelSelectInputDemo />
      <RequiredSelectInputDemo />
      <DisabledSelectInputDemo />
      <HintSelectInputDemo />
      <DisabledOptionsSelectInputDemo />
    </div>
  );
}

export function DefaultSelectInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default Select Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Country"
          name="country"
          options={countryOptions}
          placeholder="Select your country"
        />
        <SelectInput
          label="Role"
          name="role"
          options={roleOptions}
          placeholder="Select your role"
          defaultValue="user"
        />
      </div>
    </div>
  );
}

export function PillSelectInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pill Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Country"
          name="country-pill"
          options={countryOptions}
          placeholder="Select your country"
          variant="pill"
        />
        <SelectInput
          label="Role"
          name="role-pill"
          options={roleOptions}
          placeholder="Select your role"
          variant="pill"
          coloredBorder
        />
      </div>
    </div>
  );
}

export function ValidationSelectInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Validation</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Country"
          name="country-validation"
          options={countryOptions}
          placeholder="Select your country"
          error="Please select a country"
          schema={z.string().min(1, 'Please select a country')}
        />
        <SelectInput
          label="Role"
          name="role-validation"
          options={roleOptions}
          placeholder="Select your role"
          error="Please select a valid role"
          schema={z.string().min(1, 'Please select a valid role')}
          variant="pill"
        />
      </div>
    </div>
  );
}

export function MutedLabelSelectInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Muted Label Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Country"
          name="country-muted"
          options={countryOptions}
          placeholder="Select your country"
          labelVariant="muted"
        />
        <SelectInput
          label="Role"
          name="role-muted"
          options={roleOptions}
          placeholder="Select your role"
          labelVariant="muted"
          variant="pill"
        />
      </div>
    </div>
  );
}

export function RequiredSelectInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Required Fields</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Country"
          name="country-required"
          options={countryOptions}
          placeholder="Select your country"
          required
        />
        <SelectInput
          label="Role"
          name="role-required"
          options={roleOptions}
          placeholder="Select your role"
          required
          variant="pill"
        />
      </div>
    </div>
  );
}

export function DisabledSelectInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Disabled State</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Country"
          name="country-disabled"
          options={countryOptions}
          placeholder="Select your country"
          disabled
        />
        <SelectInput
          label="Role"
          name="role-disabled"
          options={roleOptions}
          placeholder="Select your role"
          disabled
          variant="pill"
        />
      </div>
    </div>
  );
}

export function HintSelectInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Hint Text</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Country"
          name="country-hint"
          options={countryOptions}
          placeholder="Select your country"
          hint="This will determine your default currency"
        />
        <SelectInput
          label="Role"
          name="role-hint"
          options={roleOptions}
          placeholder="Select your role"
          hint="Your role determines your permissions"
          variant="pill"
        />
      </div>
    </div>
  );
}

export function DisabledOptionsSelectInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Disabled Options</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectInput
          label="Role"
          name="role-disabled-options"
          options={roleOptions}
          placeholder="Select your role"
          description="Some roles may not be available"
        />
        <SelectInput
          label="Role"
          name="role-disabled-options-pill"
          options={roleOptions}
          placeholder="Select your role"
          description="Some roles may not be available"
          variant="pill"
        />
      </div>
    </div>
  );
}
