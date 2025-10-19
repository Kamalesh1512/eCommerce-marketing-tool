// src/app/(protected)/layout.tsx
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar user={session.user} />
      <main className="flex-1 overflow-y-auto bg-background/80">
        {children}
      </main>
    </div>
  );
}