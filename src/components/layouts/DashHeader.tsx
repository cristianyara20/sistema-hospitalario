"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface DashHeaderProps {
  userEmail?: string;
}

export function DashHeader({ userEmail }: DashHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold">
          {userEmail?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-gray-600">{userEmail}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 font-medium ml-2"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}