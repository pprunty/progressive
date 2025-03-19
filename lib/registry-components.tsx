import type React from "react"
// This file will serve as our component registry

// Import components directly
import { HelloWorld } from "@/delta/new-york/hello-world/hello-world"
import { ExampleForm } from "@/delta/new-york/example-form/example-form"
import PokemonPage from "@/delta/new-york/complex-component/page"
import { Tabs } from "@/delta/components/tabs/tabs"
import AdmonitionDemo from "@/delta/components/admonition-demo"
import { ModalDemo } from "@/delta/components/modal-demo"
import ScrambleInDemo from "@/delta/open-source-inspired-collection/scramble-in-demo"
import NeobrutalismCardDemo from "@/delta/open-source-inspired-collection/neobrutalism-card-demo"
import UseHQImageDemo from "@/delta/hooks/use-hq-image-demo";
import { IosScreenPreviewDemo } from "@/delta/other/ios-screen-preview-demo"
import BottomBarDemo from "@/delta/layout/bottom-bar-demo"
import { TweetDemo } from "@/delta/components/tweet-demo"
import FullBleedSectionDemo from "@/delta/components/full-bleed-section-demo"

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
    component: ModalDemo
  },
  "scramble-in": {
    component: ScrambleInDemo
  },
  "neobrutalism-card": {
    component: NeobrutalismCardDemo
  },
  "use-hq-image": {
    component: UseHQImageDemo
  }
  ,
  "ios-screen-preview": {
    component: IosScreenPreviewDemo
  },
  "bottom-bar": {
    component: BottomBarDemo
  },
  "tweet": {
    component: TweetDemo
  },
  "full-bleed-section": {
    component: FullBleedSectionDemo,
  },}

