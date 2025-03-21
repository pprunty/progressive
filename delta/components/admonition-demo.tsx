import { Admonition } from './admonition';

export default function AdmonitionDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <WarningDemo />
      <NoteDemo />
      <TipDemo />
      <InfoDemo />
      <DangerDemo />
    </div>
  );
}

export function WarningDemo() {
  return (
    <Admonition type="warning" title="Browser Compatibility">
      <p>
        This feature is not supported in Internet Explorer. Please use a modern
        browser for the best experience.
      </p>
    </Admonition>
  );
}

export function NoteDemo() {
  return (
    <Admonition type="note" title="Documentation Update">
      <p>
        This documentation was last updated on March 21, 2025. Some information
        may have changed since then.
      </p>
    </Admonition>
  );
}

export function TipDemo() {
  return (
    <Admonition type="tip" title="Performance Tip">
      <p>
        Use React.memo() to prevent unnecessary re-renders of expensive
        components when their props haven't changed.
      </p>
    </Admonition>
  );
}

export function InfoDemo() {
  return (
    <Admonition type="info" title="Server Components">
      <p>
        React Server Components allow you to render components on the server,
        reducing the JavaScript sent to the client.
      </p>
    </Admonition>
  );
}

export function DangerDemo() {
  return (
    <Admonition type="danger" title="Destructive Action">
      <p>
        This action will permanently delete all your data and cannot be undone.
        Make sure you have a backup before proceeding.
      </p>
    </Admonition>
  );
}
