'use client';
import { z } from 'zod';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { SmartForm } from '@/delta/forms/smart-form';
import { addDays } from 'date-fns';

export default function SmartFormDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-16">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Contact Form</h2>
        <p className="text-muted-foreground">A simple contact form with various input types in a vertical layout.</p>
        <ContactFormExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Registration Form with Grid Layout</h2>
        <p className="text-muted-foreground">A user registration form with a responsive grid layout and validation.</p>
        <RegistrationFormExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Payment Form with Grouped Fields</h2>
        <p className="text-muted-foreground">A payment form with pill-style inputs and horizontally grouped fields.</p>
        <PaymentFormExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Conditional Fields Example</h2>
        <p className="text-muted-foreground">A form that shows or hides fields based on user selections.</p>
        <ConditionalFieldsExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
        <p className="text-muted-foreground">A two-factor authentication form with OTP input.</p>
        <TwoFactorAuthExample />
      </div>
    </div>
  )
}

// Contact Form Example
function ContactFormExample() {
  // Define the form schema
  const contactFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    priority: z.string().min(1, "Please select a priority"),
    contactDate: z.date().optional(),
    subscribe: z.boolean().optional(),
  })

  // Define the form fields
  const contactFormFields = [
    {
      name: "name",
      label: "Name",
      type: "text" as const,
      required: true,
      placeholder: "Your name",
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      required: true,
      placeholder: "your@email.com",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text" as const,
      required: true,
      placeholder: "What is this regarding?",
    },
    {
      name: "priority",
      label: "Priority",
      type: "select" as const,
      required: true,
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ],
      placeholder: "Select priority",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea" as const,
      required: true,
      placeholder: "Your message here...",
      rows: 4,
    },
    {
      name: "contactDate",
      label: "Preferred Contact Date",
      type: "date" as const,
      placeholder: "Select a date",
      hint: "When would you prefer us to contact you?",
      minDate: new Date(),
      maxDate: addDays(new Date(), 30),
    },
    {
      name: "subscribe",
      label: "Subscribe to newsletter",
      type: "checkbox" as const,
      description: "Receive updates and news from us",
    },
  ]

  const handleSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    // Mock API call
    console.log("Form data:", data)
    alert("Contact form submitted: " + JSON.stringify(data, null, 2))
    return Promise.resolve()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>Fill out the form below to get in touch with our team.</CardDescription>
      </CardHeader>
      <CardContent>
        <SmartForm
          fields={contactFormFields}
          schema={contactFormSchema}
          onSubmit={handleSubmit}
          submitText="Send Message"
          layout="vertical"
          successMessage="Your message has been sent! We'll get back to you soon."
        />
      </CardContent>
    </Card>
  )
}

// Registration Form Example
function RegistrationFormExample() {
  // Define the form schema with password confirmation
  const registrationSchema = z
    .object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
      role: z.string().min(1, "Please select a role"),
      agreeToTerms: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the terms and conditions" }),
      }),
      receiveUpdates: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })

  // Define the form fields
  const registrationFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text" as const,
      required: true,
      placeholder: "John",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text" as const,
      required: true,
      placeholder: "Doe",
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      required: true,
      placeholder: "john@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password" as const,
      required: true,
      placeholder: "••••••••",
      hint: "Must be at least 8 characters",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password" as const,
      required: true,
      placeholder: "••••••••",
    },
    {
      name: "role",
      label: "Role",
      type: "radio" as const,
      required: true,
      options: [
        { value: "developer", label: "Developer", description: "Software developer or engineer" },
        { value: "designer", label: "Designer", description: "UI/UX or graphic designer" },
        { value: "manager", label: "Manager", description: "Project or product manager" },
      ],
    },
    {
      name: "agreeToTerms",
      label: "I agree to the terms and conditions",
      type: "checkbox" as const,
      required: true,
    },
    {
      name: "receiveUpdates",
      label: "Receive product updates and news",
      type: "checkbox" as const,
      description: "We'll never spam you or sell your information",
    },
  ]

  const handleSubmit = async (data: z.infer<typeof registrationSchema>) => {
    // Mock API call
    console.log("Registration data:", data)
    alert("Registration form submitted: " + JSON.stringify(data, null, 2))
    return Promise.resolve()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Sign up to get started with our platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <SmartForm
          fields={registrationFields}
          schema={registrationSchema}
          onSubmit={handleSubmit}
          submitText="Create Account"
          layout="grid"
          columns={2}
          gap={4}
          successMessage="Account created successfully! Check your email for verification."
          resetOnSuccess={true}
        />
      </CardContent>
    </Card>
  )
}

// Payment Form Example
function PaymentFormExample() {
  // Define the form schema
  const paymentFormSchema = z.object({
    cardName: z.string().min(1, "Name on card is required"),
    cardNumber: z
      .string()
      .min(1, "Card number is required")
      .regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
    expiryDate: z
      .string()
      .min(1, "Expiry date is required")
      .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format"),
    cvc: z
      .string()
      .min(1, "CVC is required")
      .regex(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits"),
    country: z.string().min(1, "Country is required"),
    saveCard: z.boolean().optional(),
  })

  // Define the form fields
  const paymentFormFields = [
    {
      name: "cardName",
      label: "Name on Card",
      type: "text" as const,
      required: true,
      placeholder: "John Doe",
      variant: "pill" as const,
    },
    {
      name: "cardNumber",
      label: "Card Number",
      type: "text" as const,
      required: true,
      placeholder: "1234567890123456",
      variant: "pill" as const,
      hint: "16-digit number without spaces",
    },
    // Group expiry date and CVC fields to display them side by side
    {
      name: "expiryDate",
      label: "Expiry Date",
      type: "text" as const,
      required: true,
      placeholder: "MM/YY",
      variant: "pill" as const,
      group: "card-details", // Group name to link related fields
    },
    {
      name: "cvc",
      label: "CVC",
      type: "text" as const,
      required: true,
      placeholder: "123",
      variant: "pill" as const,
      hint: "3 or 4 digits on the back of your card",
      group: "card-details", // Same group name to link related fields
    },
    {
      name: "country",
      label: "Country",
      type: "select" as const,
      required: true,
      options: [
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
        { value: "au", label: "Australia" },
      ],
      placeholder: "Select your country",
      variant: "pill" as const,
    },
    {
      name: "saveCard",
      label: "Save card for future payments",
      type: "checkbox" as const,
    },
  ]

  const handleSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    // Mock API call
    console.log("Payment data:", data)
    alert("Payment form submitted: " + JSON.stringify(data, null, 2))
    return Promise.resolve()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>Enter your card details to complete your purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        <SmartForm
          fields={paymentFormFields}
          schema={paymentFormSchema}
          onSubmit={handleSubmit}
          submitText="Pay $49.99"
          layout="vertical"
          successMessage="Payment successful! Thank you for your purchase."
        />
      </CardContent>
    </Card>
  )
}

// Conditional Fields Example
function ConditionalFieldsExample() {
  // Define the form schema
  const shippingFormSchema = z
    .object({
      fullName: z.string().min(1, "Full name is required"),
      email: z.string().email("Please enter a valid email address"),
      shippingMethod: z.enum(["standard", "express", "pickup"]),
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      pickupLocation: z.string().optional(),
      pickupDate: z.date().optional(),
      specialInstructions: z.string().optional(),
    })
    .refine(
      (data) => {
        // If shipping method is pickup, require pickup location and date
        if (data.shippingMethod === "pickup") {
          return !!data.pickupLocation && !!data.pickupDate
        }

        // If shipping method is standard or express, require address fields
        if (data.shippingMethod === "standard" || data.shippingMethod === "express") {
          return !!data.address && !!data.city && !!data.state && !!data.zipCode
        }

        return true
      },
      {
        message: "Please fill in all required fields for your selected shipping method",
        path: ["shippingMethod"],
      },
    )

  // Define the form fields
  const shippingFormFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text" as const,
      required: true,
      placeholder: "John Doe",
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      required: true,
      placeholder: "john@example.com",
    },
    {
      name: "shippingMethod",
      label: "Shipping Method",
      type: "radio" as const,
      required: true,
      options: [
        { value: "standard", label: "Standard Shipping", description: "3-5 business days" },
        { value: "express", label: "Express Shipping", description: "1-2 business days" },
        { value: "pickup", label: "Store Pickup", description: "Pick up at your convenience" },
      ],
    },
    // Address fields - only shown for standard and express shipping
    {
      name: "address",
      label: "Street Address",
      type: "text" as const,
      required: true,
      placeholder: "123 Main St",
      hidden: (values: Record<string, any>) => values.shippingMethod === "pickup",
    },
    {
      name: "city",
      label: "City",
      type: "text" as const,
      required: true,
      placeholder: "New York",
      hidden: (values: Record<string, any>) => values.shippingMethod === "pickup",
      group: "location",
    },
    {
      name: "state",
      label: "State",
      type: "text" as const,
      required: true,
      placeholder: "NY",
      hidden: (values: Record<string, any>) => values.shippingMethod === "pickup",
      group: "location",
    },
    {
      name: "zipCode",
      label: "ZIP Code",
      type: "text" as const,
      required: true,
      placeholder: "10001",
      hidden: (values: Record<string, any>) => values.shippingMethod === "pickup",
      group: "location",
    },
    // Pickup fields - only shown for pickup
    {
      name: "pickupLocation",
      label: "Pickup Location",
      type: "select" as const,
      required: true,
      options: [
        { value: "downtown", label: "Downtown Store" },
        { value: "uptown", label: "Uptown Store" },
        { value: "midtown", label: "Midtown Store" },
      ],
      placeholder: "Select a store",
      hidden: (values: Record<string, any>) => values.shippingMethod !== "pickup",
    },
    {
      name: "pickupDate",
      label: "Pickup Date",
      type: "date" as const,
      required: true,
      placeholder: "Select a date",
      minDate: new Date(),
      maxDate: addDays(new Date(), 14),
      hidden: (values: Record<string, any>) => values.shippingMethod !== "pickup",
    },
    {
      name: "specialInstructions",
      label: "Special Instructions",
      type: "textarea" as const,
      placeholder: "Any special instructions for delivery or pickup",
      rows: 3,
    },
  ]

  const handleSubmit = async (data: z.infer<typeof shippingFormSchema>) => {
    // Mock API call
    console.log("Shipping data:", data)
    alert("Shipping form submitted: " + JSON.stringify(data, null, 2))
    return Promise.resolve()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Choose your shipping method and provide the necessary details.</CardDescription>
      </CardHeader>
      <CardContent>
        <SmartForm
          fields={shippingFormFields}
          schema={shippingFormSchema}
          onSubmit={handleSubmit}
          submitText="Continue to Payment"
          layout="vertical"
          successMessage="Shipping information saved successfully!"
        />
      </CardContent>
    </Card>
  )
}

// Two-Factor Authentication Example with native OTP support
function TwoFactorAuthExample() {
  // Define the form schema with OTP verification
  const twoFactorSchema = z.object({
    verificationCode: z.string().min(1, "Verification code is required"),
    rememberDevice: z.boolean().optional(),
  })

  // Define the form fields using the native OTP field type
  const twoFactorFields = [
    {
      name: "verificationCode",
      label: "Verification Code",
      type: "otp" as const,
      required: true,
      length: 6,
      autoFocus: false,
      separator: true,
      groupSize: 3,
      autoSubmit: true,
      hint: "Enter the 6-digit code sent to your phone. Form will submit automatically when all digits are entered.",
    },
    {
      name: "rememberDevice",
      label: "Remember this device for 30 days",
      type: "checkbox" as const,
      description: "You won't need to enter a verification code when logging in from this device",
    },
  ]

  const handleSubmit = async (data: z.infer<typeof twoFactorSchema>) => {
    // Mock API call
    console.log("Two-factor auth data:", data)
    alert("Verification successful: " + JSON.stringify(data, null, 2))
    return Promise.resolve()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          We've sent a verification code to your phone. Enter the code to continue. The form will submit automatically
          when all digits are entered.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SmartForm
          fields={twoFactorFields}
          schema={twoFactorSchema}
          onSubmit={handleSubmit}
          submitText="Verify"
          layout="vertical"
          successMessage="Verification successful! You're now logged in."
        />
      </CardContent>
    </Card>
  )
}

