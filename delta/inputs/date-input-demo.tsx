'use client';

import { DateInput } from './date-input';
import { z } from 'zod';
import { addDays, subDays } from 'date-fns';

export default function DateInputDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <DefaultDateInputDemo />
      <PillDateInputDemo />
      <ValidationDateInputDemo />
      <MutedLabelDateInputDemo />
      <RequiredDateInputDemo />
      <DisabledDateInputDemo />
      <HintDateInputDemo />
      <DateRangeDemo />
    </div>
  );
}

export function DefaultDateInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default Date Input</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DateInput
          label="Date of Birth"
          name="dob"
          placeholder="Select your date of birth"
        />
        <DateInput
          label="Appointment Date"
          name="appointment"
          placeholder="Select an appointment date"
          defaultValue={new Date()}
        />
      </div>
    </div>
  );
}

export function PillDateInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pill Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DateInput
          label="Event Date"
          name="event-date"
          placeholder="Select event date"
          variant="pill"
        />
        <DateInput
          label="Delivery Date"
          name="delivery-date"
          placeholder="Select delivery date"
          variant="pill"
          coloredBorder
        />
      </div>
    </div>
  );
}

export function ValidationDateInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Validation</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DateInput
          label="Start Date"
          name="start-date"
          placeholder="Select start date"
          error="Start date is required"
          schema={z.date({
            required_error: 'Start date is required',
            invalid_type_error: "That's not a date!",
          })}
        />
        <DateInput
          label="End Date"
          name="end-date"
          placeholder="Select end date"
          error="End date must be in the future"
          schema={z.date().min(new Date(), 'End date must be in the future')}
          variant="pill"
        />
      </div>
    </div>
  );
}

export function MutedLabelDateInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Muted Label Variant</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DateInput
          label="Check-in Date"
          name="check-in"
          placeholder="Select check-in date"
          labelVariant="muted"
        />
        <DateInput
          label="Check-out Date"
          name="check-out"
          placeholder="Select check-out date"
          labelVariant="muted"
          variant="pill"
        />
      </div>
    </div>
  );
}

export function RequiredDateInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Required Fields</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DateInput
          label="Departure Date"
          name="departure"
          placeholder="Select departure date"
          required
        />
        <DateInput
          label="Return Date"
          name="return"
          placeholder="Select return date"
          required
          variant="pill"
        />
      </div>
    </div>
  );
}

export function DisabledDateInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Disabled State</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DateInput
          label="Registration Date"
          name="registration"
          placeholder="Registration date"
          disabled
          defaultValue={new Date()}
        />
        <DateInput
          label="Expiration Date"
          name="expiration"
          placeholder="Expiration date"
          disabled
          defaultValue={addDays(new Date(), 365)}
          variant="pill"
        />
      </div>
    </div>
  );
}

export function HintDateInputDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Hint Text</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DateInput
          label="Preferred Date"
          name="preferred-date"
          placeholder="Select your preferred date"
          hint="We'll try to accommodate your preference"
        />
        <DateInput
          label="Deadline"
          name="deadline"
          placeholder="Select a deadline"
          hint="Must be at least 7 days from today"
          variant="pill"
        />
      </div>
    </div>
  );
}

export function DateRangeDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">With Min/Max Date Constraints</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DateInput
          label="Booking Date"
          name="booking-date"
          placeholder="Select booking date"
          minDate={new Date()}
          maxDate={addDays(new Date(), 90)}
          hint="Bookings available up to 90 days in advance"
        />
        <DateInput
          label="Historical Date"
          name="historical-date"
          placeholder="Select a date"
          minDate={subDays(new Date(), 365)}
          maxDate={new Date()}
          hint="Select a date within the past year"
          variant="pill"
        />
      </div>
    </div>
  );
}
