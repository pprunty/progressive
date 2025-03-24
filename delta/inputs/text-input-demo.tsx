'use client';

import { TextInput } from './text-input';
import { z } from 'zod';

export default function TextInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <DefaultTextInputDemo />
      <PillTextInputDemo />
      <ValidationTextInputDemo />
      <MutedLabelTextInputDemo />
      <RequiredTextInputDemo />
      <DisabledTextInputDemo />
      <HintTextInputDemo />
    </div>
  );
}

export function DefaultTextInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default Text Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Name" name="name" placeholder="Enter your name" />
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>
    </div>
  );
}

export function PillTextInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pill Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Username"
          name="username"
          placeholder="Enter your username"
          variant="pill"
        />
        <TextInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          variant="pill"
          coloredBorder
        />
      </div>
    </div>
  );
}

export function ValidationTextInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Validation</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          error="Password must be at least 8 characters"
          schema={z.string().min(8, 'Password must be at least 8 characters')}
        />
        <TextInput
          label="Email"
          name="email-validation"
          type="email"
          placeholder="Enter your email"
          error="Please enter a valid email address"
          schema={z.string().email('Please enter a valid email address')}
        />
      </div>
    </div>
  );
}

export function MutedLabelTextInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Muted Label Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="First Name"
          name="first-name"
          placeholder="Enter your first name"
          labelVariant="muted"
        />
        <TextInput
          label="Last Name"
          name="last-name"
          placeholder="Enter your last name"
          labelVariant="muted"
        />
      </div>
    </div>
  );
}

export function RequiredTextInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Required Fields</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Full Name"
          name="full-name"
          placeholder="Enter your full name"
          required
        />
        <TextInput
          label="Email Address"
          name="email-required"
          type="email"
          placeholder="Enter your email address"
          required
          variant="pill"
        />
      </div>
    </div>
  );
}

export function DisabledTextInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Disabled State</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Username"
          name="username-disabled"
          placeholder="Enter your username"
          disabled
          defaultValue="johndoe"
        />
        <TextInput
          label="Email"
          name="email-disabled"
          type="email"
          placeholder="Enter your email"
          disabled
          defaultValue="john@example.com"
          variant="pill"
        />
      </div>
    </div>
  );
}

export function HintTextInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Hint Text</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Password"
          name="password-hint"
          type="password"
          placeholder="Enter your password"
          hint="Password must be at least 8 characters and include a number"
        />
        <TextInput
          label="Username"
          name="username-hint"
          placeholder="Choose a username"
          hint="Username can only contain letters, numbers, and underscores"
          variant="pill"
        />
      </div>
    </div>
  );
}
