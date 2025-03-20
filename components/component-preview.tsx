import type { ComponentType } from '@/lib/registry';
import { PreviewContainer } from './preview-container';
import { registry } from '@/lib/registry-components';

export function ComponentPreview({ component }: { component: ComponentType }) {
  // Generate a URL for the OpenInV0Button that points to your API
  const openInV0Url = encodeURIComponent(
    `https://deltacomponents.dev/r/${component.name}.json`,
  );

  console.log(
    encodeURIComponent(`https://deltacomponents.dev/r/${component.name}.json`),
  );
  // Get the component from the registry
  const Component = registry[component.name]?.component;

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-[320px] text-muted-foreground">
        Component <code className="bg-muted rounded">{component.name}</code> not
        found in registry.
        <br />
        Make sure it&lsquo;s properly registered in lib/registry-components.tsx
      </div>
    );
  }

  return (
    <PreviewContainer openInV0Url={openInV0Url}>
      <Component />
    </PreviewContainer>
  );
}
