import type React from 'react';
// This file will serve as our component registry

// Import components directly
import { HelloWorld } from '@/delta/new-york/hello-world/hello-world';
import { ExampleForm } from '@/delta/new-york/example-form/example-form';
import PokemonPage from '@/delta/new-york/complex-component/page';
import AdmonitionDemo from '@/delta/components/admonition-demo';
import { ModalDemo } from '@/delta/components/modal-demo';
import ScrambleInDemo from '@/delta/open-source-inspired-collection/scramble-in-demo';
import NeobrutalismCardDemo from '@/delta/open-source-inspired-collection/neobrutalism-card-demo';
import UseHQImageDemo from '@/delta/hooks/use-hq-image-demo';
import { IosScreenPreviewDemo } from '@/delta/other/ios-screen-preview-demo';
import BottomBarDemo from '@/delta/layout/bottom-bar-demo';
import FullBleedSectionDemo from '@/delta/components/full-bleed-section-demo';
import TweetDemo from '@/delta/components/tweet-demo';
import VideoPlayerDemo from '@/delta/components/video-player-demo';
import TabsDemo from '@/delta/components/tabs-demo';
import ButtonDemo from '@/delta/components/button-demo';
import TextInputDemo from '@/delta/forms/text-input-demo';
import CheckboxInputDemo from '@/delta/forms/checkbox-input-demo';
import SelectInputDemo from '@/delta/forms/select-input-demo';
import RadioInputDemo from '@/delta/forms/radio-input-demo';
import SwitchInputDemo from '@/delta/forms/switch-input-demo';
import TextareaInputDemo from '@/delta/forms/textarea-input-demo';
import FileInputDemo from '@/delta/forms/file-input-demo';
import DateInputDemo from '@/delta/forms/date-input-demo';
import SmartFormDemo from '@/delta/forms/smart-form-demo';

// Create a registry object that maps component names to their implementations
export const registry: Record<string, { component: React.ComponentType }> = {
  'hello-world': {
    component: HelloWorld,
  },
  'example-form': {
    component: ExampleForm,
  },
  'complex-component': {
    component: PokemonPage,
  },
  admonition: {
    component: AdmonitionDemo,
  },
  modal: {
    component: ModalDemo,
  },
  'scramble-in': {
    component: ScrambleInDemo,
  },
  'neobrutalism-card': {
    component: NeobrutalismCardDemo,
  },
  'use-hq-image': {
    component: UseHQImageDemo,
  },
  'ios-screen-preview': {
    component: IosScreenPreviewDemo,
  },
  'bottom-bar': {
    component: BottomBarDemo,
  },
  tweet: {
    component: TweetDemo,
  },
  'full-bleed-section': {
    component: FullBleedSectionDemo,
  },
  'video-player': {
    component: VideoPlayerDemo,
  },
  tabs: {
    component: TabsDemo,
  },
  button: {
    component: ButtonDemo,
  },
  'text-input': {
    component: TextInputDemo,
  },
  'checkbox-input': {
    component: CheckboxInputDemo,
  },
  'select-input': {
    component: SelectInputDemo,
  },
  'radio-input': {
    component: RadioInputDemo,
  },
  'switch-input': {
    component: SwitchInputDemo,
  },
  'textarea-input': {
    component: TextareaInputDemo,
  },
  'file-input': {
    component: FileInputDemo,
  },
  'date-input': {
    component: DateInputDemo,
  },
  'smart-form': {
    component: SmartFormDemo,
  },
};
