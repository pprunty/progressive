'use client';

import * as React from 'react';
import { z } from 'zod';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OTPInput } from '@/delta/inputs/otp-input';

export default function OTPInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-16">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Verification Example</h2>
        <p className="text-muted-foreground">
          A complete verification form with OTP input.
        </p>
        <VerificationExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">OTP Input Variants</h2>
        <p className="text-muted-foreground">
          Different styles and configurations for OTP inputs.
        </p>
        <OTPVariantsExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Auto-Submit Example</h2>
        <p className="text-muted-foreground">
          OTP input that automatically submits the form when completed.
        </p>
        <AutoSubmitExample />
      </div>
    </div>
  );
}

function VerificationExample() {
  const [pending, setPending] = React.useState(false);
  const [formData, setFormData] = React.useState({
    verificationCode: '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setSuccess(false);

    const result = z
      .object({
        verificationCode: z
          .string()
          .length(6, 'Verification code must be 6 digits'),
      })
      .safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        verificationCode: formattedErrors.verificationCode?._errors[0] || '',
      });
      setPending(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setPending(false);
      setErrors({});
      setSuccess(true);
      // Reset form data
      setFormData({
        verificationCode: '',
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          We've sent a 6-digit verification code to your email. Enter the code
          below to confirm your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-6">
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              Verification successful! Your account has been verified.
            </div>
          )}

          <OTPInput
            label="Verification Code"
            name="verificationCode"
            length={6}
            required
            separator
            autoFocus
            groupSize={3}
            autoSubmit
            pending={pending}
            error={errors.verificationCode}
            value={formData.verificationCode}
            onChange={(value) =>
              setFormData({ ...formData, verificationCode: value })
            }
            hint="Enter the 6-digit code sent to your email. This otp is autofocused"
            schema={z.string().length(6, 'Verification code must be 6 digits')}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Verifying...' : 'Verify Account'}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            disabled={pending}
          >
            Didn't receive a code? Resend
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function AutoSubmitExample() {
  const [pending, setPending] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [code, setCode] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setPending(false);
      setSuccess(true);
      setCode('');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Auto-Submit OTP</CardTitle>
        <CardDescription>
          Enter the complete code to automatically submit the form.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-6">
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              Code verified successfully!
            </div>
          )}

          <OTPInput
            label="Auto-Submit Code"
            name="autoSubmitCode"
            length={4}
            required
            autoSubmit
            variant="pill"
            coloredBorder
            pending={pending}
            value={code}
            onChange={setCode}
            hint="Form will submit automatically when all 4 digits are entered"
          />
        </CardContent>
      </form>
    </Card>
  );
}

export function OTPVariantsExample() {
  return (
    <Card className="w-full mx-auto max-w-md">
      <CardHeader>
        <CardTitle>OTP Input Variants</CardTitle>
        <CardDescription>
          Different styles and configurations for OTP inputs
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Default Style</h3>
          <OTPInput
            label="Default OTP"
            name="default-otp"
            length={6}
            variant="default"
            hint="Standard 6-digit OTP input"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Pill Style</h3>
          <OTPInput
            label="Pill OTP"
            name="pill-otp"
            length={6}
            variant="pill"
            hint="Rounded pill-style OTP input"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">With Separator</h3>
          <OTPInput
            label="Grouped OTP"
            name="grouped-otp"
            length={6}
            variant="default"
            separator
            groupSize={3}
            hint="OTP with visual grouping and default styling"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            Default Style with Colored Border
          </h3>
          <OTPInput
            label="Colored Border OTP"
            name="colored-border-otp"
            length={6}
            variant="default"
            coloredBorder
            hint="Default style with colored border"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Masked Input (Default Style)</h3>
          <OTPInput
            label="Masked OTP"
            name="masked-otp"
            length={6}
            variant="default"
            mask
            maskChar="•"
            hint="Masked for security (like a password)"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            Different Length (Default Style)
          </h3>
          <OTPInput
            label="4-Digit OTP"
            name="short-otp"
            length={4}
            variant="default"
            hint="Shorter 4-digit OTP input with default styling"
          />
        </div>
      </CardContent>
    </Card>
  );
}
