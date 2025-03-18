import type { ComponentType } from "@/lib/registry"

export function ComponentMeta({ component }: { component: ComponentType }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Description</h3>
        <p className="mt-2 text-muted-foreground">{component.description}</p>
      </div>

      {component.dependencies && component.dependencies.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">Dependencies</h3>
          <ul className="mt-2 list-disc pl-6">
            {component.dependencies.map((dep) => (
              <li key={dep} className="text-muted-foreground">
                {dep}
              </li>
            ))}
          </ul>
        </div>
      )}

      {component.registryDependencies && component.registryDependencies.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">Registry Dependencies</h3>
          <ul className="mt-2 list-disc pl-6">
            {component.registryDependencies.map((dep) => (
              <li key={dep} className="text-muted-foreground">
                {dep}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium">Installation</h3>
        <div className="mt-2 rounded-md bg-muted p-4">
          <code className="text-sm">npx shadcn@latest add {component.name}</code>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Files</h3>
        <ul className="mt-2 list-disc pl-6">
          {component.files.map((file) => (
            <li key={file.path} className="text-muted-foreground">
              <span className="font-mono text-xs">{file.path}</span>
              {file.target && <span className="ml-2 text-xs text-muted-foreground">→ {file.target}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

