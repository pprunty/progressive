import type React from "react"
// This file will serve as our component registry

// Import components directly
import { HelloWorld } from "@/astrik/new-york/hello-world/hello-world"
import { ExampleForm } from "@/astrik/new-york/example-form/example-form"
import PokemonPage from "@/astrik/new-york/complex-component/page"
import { Tabs } from "@/astrik/components/tabs/tabs"
import AdmonitionDemo from "@/astrik/components/admonition-demo"
import { ModalDemo } from "@/astrik/components/modal-demo"
import ScrambleInDemo from "@/astrik/open-sourced-inspired-collection/scramble-in-demo"
import NeobrutalismCardDemo from "@/astrik/open-sourced-inspired-collection/neobrutalism-card-demo"

// Create a registry object that maps component names to their implementations
export const registry: Record<string, { component: React.ComponentType }> = {
  "hello-world": {
    component: HelloWorld
  },
  "example-form": {
    component: ExampleForm
  },
  "complex-component": {
    component: PokemonPage
  }
,
  "tabs": {
    component: Tabs
  },
  "admonition": {
    component: AdmonitionDemo
  },
  "modal": {
    component: ModalDemo,
  },
  "scramble-in": {
    component: ScrambleInDemo,
  },
  "neobrutalism-card": {
    component: NeobrutalismCardDemo,
  },}

