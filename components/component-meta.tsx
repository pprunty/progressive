"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { ComponentType } from "@/lib/registry"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

export function ComponentMeta({ component }: { component: ComponentType }) {
  const [copied, setCopied] = useState(false)

  const installCommand = `npx shadcn@latest add "https://astrik.dev/r/${component.name}.json"`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        <div className="mt-2 relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-5 top-2 z-10"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy installation command</span>
          </Button>
          <SyntaxHighlighter
            language="bash"
            style={vscDarkPlus}
            customStyle={{
              borderRadius: "0.5rem",
              padding: "1.5rem",
              fontSize: "0.875rem",
              margin: 0,
            }}
          >
            {installCommand}
          </SyntaxHighlighter>
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