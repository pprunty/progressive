'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  title?: string;
  subtitle?: string;
  type?: 'blur' | 'overlay' | 'none';
  showCloseButton?: boolean;
  borderBottom?: boolean;
  className?: string;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '50%',
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 50 },
      opacity: { duration: 0.2, ease: 'easeInOut' },
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 50 },
      opacity: { duration: 0.4, ease: 'easeInOut' },
    },
  },
  exit: {
    opacity: 0,
    y: '50%',
    transition: {
      y: { type: 'spring', stiffness: 300, damping: 30 },
      x: { duration: 0.2, ease: 'easeInOut' },
      opacity: { duration: 0.2, ease: 'easeInOut' },
    },
  },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  title,
  subtitle,
  type = 'overlay',
  showCloseButton = true,
  borderBottom = true,
  className,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Get the current scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      // Save the current padding
      const currentPaddingRight =
        parseInt(getComputedStyle(document.body).paddingRight) || 0;

      // Apply overflow hidden and compensate for scrollbar
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
      document.body.classList.add('overflow-hidden');
    } else {
      // Remove the style and class
      document.body.style.paddingRight = '';
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.style.paddingRight = '';
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const getOverlayClasses = () => {
    switch (type) {
      case 'blur':
        return 'bg-primary-foreground/85 backdrop-blur-sm';
      case 'overlay':
        return 'bg-black/50';
      case 'none':
        return 'shadow-xl shadow-primary-foreground';
      default:
        return 'bg-black/50';
    }
  };

  const getModalClasses = () => {
    const baseClasses =
      'w-auto bg-card text-card-foreground max-w-[90%] sm:max-w-xl rounded-2xl shadow-lg m-4 relative';
    return type === 'overlay'
      ? baseClasses
      : `${baseClasses} border border-border`;
  };

  // Only render the modal content if we're in the browser
  if (!mounted) {
    return null;
  }

  // Create the modal content
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto ${getOverlayClasses()}`}
          onClick={handleOverlayClick}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(getModalClasses(), className)}
            onClick={(e) => e.stopPropagation()}
          >
            {title ? (
              // When there is a title, show the title bar with optional close button
              <div className={cn(
                "flex justify-between p-6",
                (borderBottom && "border-b border-border"),
                subtitle ? "flex-col items-start gap-1" : "items-center"
              )}>
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    className={cn(
                      "p-1 rounded-md hover:bg-muted transition-colors",
                      subtitle && "absolute top-4 right-4"
                    )}
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X size={20} weight="bold" />
                  </button>
                )}
              </div>
            ) : (
              // If no title but we want a close button, add it in the top right
              showCloseButton && (
                <div className="absolute top-4 right-4">
                  <button
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </div>
              )
            )}

            {/* Modal content */}
            <div className={`p-6 ${!title && showCloseButton ? 'pt-12' : ''}`}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body);
};

export default Modal;