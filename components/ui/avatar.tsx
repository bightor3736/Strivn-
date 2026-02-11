'use client';
import * as Avatar from '@radix-ui/react-avatar';

export function UserAvatar({ name }: { name: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <Avatar.Root className="inline-flex size-8 items-center justify-center rounded-full bg-muted">
      <Avatar.Fallback>{initials}</Avatar.Fallback>
    </Avatar.Root>
  );
}
