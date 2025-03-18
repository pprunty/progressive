import type React from "react"
// This file will serve as our component registry

// Import components directly
import { HelloWorld } from "@/registry/new-york/hello-world/hello-world"
import { ExampleForm } from "@/registry/new-york/example-form/example-form"
import PokemonPage from "@/registry/new-york/complex-component/page"

// Create a registry object that maps component names to their implementations
export const registry: Record<string, { component: React.ComponentType }> = {
  "hello-world": {
    component: HelloWorld,
  },
  "example-form": {
    component: ExampleForm,
  },
  "complex-component": {
    component: PokemonPage,
  },
}

