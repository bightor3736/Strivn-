'use client';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = Dropdown.Trigger;
export function DropdownMenuContent({ className, ...props }: Dropdown.DropdownMenuContentProps) {
  return <Dropdown.Portal><Dropdown.Content className={cn('z-50 min-w-48 rounded-md border border-border bg-background p-1', className)} {...props} /></Dropdown.Portal>;
}
export function DropdownMenuItem({ className, ...props }: Dropdown.DropdownMenuItemProps) {
  return <Dropdown.Item className={cn('cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-muted', className)} {...props} />;
}
