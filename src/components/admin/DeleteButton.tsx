"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteButtonProps {
  action: () => Promise<void>;
  confirmMessage: string;
  label?: string;
}

export function DeleteButton({ action, confirmMessage, label = "Obriši" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    startTransition(async () => {
      await action();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={label}
      title={label}
      className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-gray-400 transition-colors hover:border-red-500/50 hover:text-red-400 disabled:opacity-50"
    >
      {isPending ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
    </button>
  );
}
