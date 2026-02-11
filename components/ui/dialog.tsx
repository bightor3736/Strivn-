'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6">
        {children}
        <Dialog.Close className="absolute right-3 top-3"><X className="size-4" /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export const DialogTitle = Dialog.Title;
export const DialogClose = Dialog.Close;
