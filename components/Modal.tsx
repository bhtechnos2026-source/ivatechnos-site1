"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, size = "md", children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const widths: Record<string, string> = {
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-lift",
          "animate-fade-up",
          widths[size],
          size === "full" ? "h-[90vh]" : "max-h-[88vh]"
        )}
      >
        {title && (
          <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4">
            <h2 className="text-base font-semibold text-ink">{title}</h2>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-ink-muted shadow-card backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
