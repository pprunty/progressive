import { Admonition } from "@/astrik/components/admonition"

export default function Preview() {
  return (
    <div className="container mx-auto py-8">
       <Admonition type="note">
                <p>This is a simple note with default styling and title.</p>
              </Admonition>

              <Admonition type="tip" title="Custom Tip Title">
                <p>
                  Here&apos;s a helpful tip with a custom title. You can use this
                  component to highlight important information.
                </p>
              </Admonition>

              <Admonition type="info">
                <p>
                  This component supports markdown content, so you can add{' '}
                  <strong>bold text</strong>, <em>italic text</em>, and even code
                  snippets.
                </p>
              </Admonition>

              <Admonition type="warning">
                <p>
                  Be careful when using this feature. It might have unexpected
                  consequences if not used properly.
                </p>
              </Admonition>

              <Admonition type="danger" title="Critical Error">
                <p>
                  This operation cannot be undone. Please make sure you understand the
                  implications before proceeding.
                </p>
              </Admonition>
    </div>
  );
}
