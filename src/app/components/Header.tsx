"use client";

import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { user } = useUserStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">RemitLend</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.name || user.email}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name || user.email} />
                <AvatarFallback>
                  {(user.name || user.email).slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Connect Wallet
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
