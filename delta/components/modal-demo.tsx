'use client';

import { useState } from 'react';
import Modal from './modal';
import { Button } from '@/components/ui/button';

export function ModalDemo() {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isWithTitleOpen, setIsWithTitleOpen] = useState(false);
  const [isBlurOpen, setIsBlurOpen] = useState(false);
  const [isWithoutCloseOpen, setIsWithoutCloseOpen] = useState(false);
  const [isNoOverlayCloseOpen, setIsNoOverlayCloseOpen] = useState(false);
  const [isWithSubtitleOpen, setIsWithSubtitleOpen] = useState(false);
  const [isNoBorderOpen, setIsNoBorderOpen] = useState(false);
  const [isCustomClassOpen, setIsCustomClassOpen] = useState(false);
  const [isForcedActionOpen, setIsForcedActionOpen] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  const resetAgreement = () => {
    setHasAgreed(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-3">
        <h3 className="text-lg font-medium">Modal Component</h3>
        <p className="text-muted-foreground">
          A versatile modal component with multiple style options and configurations.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">Basic Modal</h4>
            <p className="text-sm text-muted-foreground">A simple modal with overlay background.</p>
            <Button onClick={() => setIsBasicOpen(true)}>Open Basic Modal</Button>
          </div>

          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">Modal with Title</h4>
            <p className="text-sm text-muted-foreground">Shows a header with title and close button.</p>
            <Button onClick={() => setIsWithTitleOpen(true)}>Open Modal with Title</Button>
          </div>

          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">Modal with Subtitle</h4>
            <p className="text-sm text-muted-foreground">Shows a header with title, subtitle and close button.</p>
            <Button onClick={() => setIsWithSubtitleOpen(true)}>Open Modal with Subtitle</Button>
          </div>

          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">Modal without Border</h4>
            <p className="text-sm text-muted-foreground">Header without bottom border separation.</p>
            <Button onClick={() => setIsNoBorderOpen(true)}>Open Borderless Modal</Button>
          </div>

          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">Blur Background Modal</h4>
            <p className="text-sm text-muted-foreground">Uses a blur effect on the background.</p>
            <Button onClick={() => setIsBlurOpen(true)}>Open Blur Modal</Button>
          </div>

          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">Without Close Button</h4>
            <p className="text-sm text-muted-foreground">Modal without the close button.</p>
            <Button onClick={() => setIsWithoutCloseOpen(true)}>Open No-Close Modal</Button>
          </div>

          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">No Overlay Close</h4>
            <p className="text-sm text-muted-foreground">Modal won't close when clicking overlay.</p>
            <Button onClick={() => setIsNoOverlayCloseOpen(true)}>Open Modal</Button>
          </div>

          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">Custom Styled Modal</h4>
            <p className="text-sm text-muted-foreground">Using className to customize modal appearance.</p>
            <Button onClick={() => setIsCustomClassOpen(true)}>Open Custom Modal</Button>
          </div>

          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <h4 className="font-medium">Forced Action Modal</h4>
            <p className="text-sm text-muted-foreground">User must accept terms to dismiss modal.</p>
            <Button onClick={() => {
              resetAgreement();
              setIsForcedActionOpen(true);
            }}>Open Forced Action Modal</Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isBasicOpen} onClose={() => setIsBasicOpen(false)}>
        <div className="space-y-4 min-w-[300px]">
          <h3 className="text-lg font-medium">Basic Modal</h3>
          <p>This is a basic modal with default styling.</p>
          <div className="flex justify-end">
            <Button onClick={() => setIsBasicOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isWithTitleOpen}
        onClose={() => setIsWithTitleOpen(false)}
        title="Modal with Title"
      >
        <div className="space-y-4 min-w-[300px]">
          <p>This modal has a title in the header alongside a close button.</p>
          <div className="flex justify-end">
            <Button onClick={() => setIsWithTitleOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isWithSubtitleOpen}
        onClose={() => setIsWithSubtitleOpen(false)}
        title="Modal with Subtitle"
        borderBottom={false}
        subtitle="This smaller text provides additional context about the modal"
      >
        <div className="space-y-4 min-w-[350px]">
          <p>This modal displays both a title and a subtitle in the header.</p>
          <p>The subtitle can be used to provide additional context or instructions.</p>
          <div className="flex justify-end">
            <Button onClick={() => setIsWithSubtitleOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isNoBorderOpen}
        onClose={() => setIsNoBorderOpen(false)}
        title="No Border Modal"
        borderBottom={false}
      >
        <div className="space-y-4 min-w-[300px]">
          <p>This modal has no border between the header and content.</p>
          <p>This creates a more seamless appearance.</p>
          <div className="flex justify-end">
            <Button onClick={() => setIsNoBorderOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isBlurOpen}
        onClose={() => setIsBlurOpen(false)}
        type="blur"
      >
        <div className="space-y-4 min-w-[300px]">
          <h3 className="text-lg font-medium">Blur Background</h3>
          <p>This modal uses a semi-transparent backdrop with blur effect.</p>
          <div className="flex justify-end">
            <Button onClick={() => setIsBlurOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isWithoutCloseOpen}
        onClose={() => setIsWithoutCloseOpen(false)}
        showCloseButton={false}
      >
        <div className="space-y-4 min-w-[300px]">
          <h3 className="text-lg font-medium">No Close Button</h3>
          <p>This modal doesn't have a close button in the corner.</p>
          <p>Click the button below or outside to close it.</p>
          <div className="flex justify-end">
            <Button onClick={() => setIsWithoutCloseOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isNoOverlayCloseOpen}
        onClose={() => setIsNoOverlayCloseOpen(false)}
        closeOnOverlayClick={false}
      >
        <div className="space-y-4 min-w-[300px]">
          <h3 className="text-lg font-medium">No Overlay Click</h3>
          <p>This modal doesn't close when you click on the overlay.</p>
          <p>You must use the close button.</p>
          <div className="flex justify-end">
            <Button onClick={() => setIsNoOverlayCloseOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isCustomClassOpen}
        onClose={() => setIsCustomClassOpen(false)}
        className="bg-slate-900 text-white max-w-md rounded-lg"
        title="Custom Styled Modal"
      >
        <div className="space-y-4 min-w-[300px]">
          <p>This modal uses a custom className to override the default styling.</p>
          <p>You can customize colors, width, border radius, and more.</p>
          <div className="flex justify-end">
            <Button
              onClick={() => setIsCustomClassOpen(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isForcedActionOpen}
        onClose={() => hasAgreed && setIsForcedActionOpen(false)}
        closeOnOverlayClick={false}
        showCloseButton={false}
        title="Terms and Conditions"
        subtitle="You must agree to continue"
      >
        <div className="space-y-4 min-w-[350px]">
          <div className="max-h-40 overflow-y-auto border rounded p-3 text-sm">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultricies, nisl nisl ultricies nisl, eget ultricies nisl nisl eget.</p>
            <p className="mt-2">Praesent euismod, nisl eget ultricies ultricies, nisl nisl ultricies nisl, eget ultricies nisl nisl eget. Nullam auctor, nisl eget ultricies ultricies.</p>
            <p className="mt-2">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
          <p className="text-sm text-muted-foreground">
            You cannot close this modal without agreeing to the terms.
          </p>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setHasAgreed(true);
                setIsForcedActionOpen(false);
              }}
              className="w-full"
            >
              I Agree
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}