"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface StepperProps {
  value: React.ReactNode;
  onDecrement: () => void;
  onIncrement: () => void;
  label: string;
  decrementDisabled?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({ value, onDecrement, onIncrement, label, decrementDisabled }) => {
  const { t } = useApp();
  return (
    <div className="flex items-center rounded-[14px] bg-page" role="group" aria-label={label}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={decrementDisabled}
        aria-label={`${label}: ${t("kamaytirish")}`}
        className="w-10 h-10 flex items-center justify-center text-ink disabled:text-muted/40 active:scale-90 transition-transform"
      >
        <Minus className="w-4 h-4 stroke-[2.5]" />
      </button>
      <span className="min-w-6 px-0.5 text-center text-sm font-bold text-ink tabular-nums">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`${label}: ${t("ko'paytirish")}`}
        className="w-10 h-10 flex items-center justify-center text-ink active:scale-90 transition-transform"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};

export const Toggle: React.FC<{ checked: boolean; onChange: () => void; label: string }> = ({
  checked,
  onChange,
  label,
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`w-12 h-7 rounded-full p-0.5 flex-shrink-0 transition-colors ${checked ? "bg-rose" : "bg-line"}`}
  >
    <span
      className={`block w-6 h-6 rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export const ScreenTitle: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({
  title,
  subtitle,
  action,
}) => (
  <header className="px-4 pt-5 pb-3 flex items-center justify-between gap-3">
    <div>
      <h1 className="text-2xl font-extrabold text-ink tracking-tight">{title}</h1>
      {subtitle && <p className="text-[13px] text-muted mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </header>
);

export const EmptyState: React.FC<{
  icon: React.ReactNode;
  title: string;
  text: string;
  actionLabel: string;
  onAction: () => void;
}> = ({ icon, title, text, actionLabel, onAction }) => (
  <div className="flex-1 flex flex-col items-center justify-center px-8 text-center min-h-[64vh]">
    <div className="text-muted/60 mb-5">{icon}</div>
    <h2 className="text-lg font-bold text-ink">{title}</h2>
    <p className="text-sm text-muted mt-1.5 mb-6 max-w-xs leading-relaxed">{text}</p>
    <button onClick={onAction} className="btn-primary w-full max-w-64">
      {actionLabel}
    </button>
  </div>
);

export const TextField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  maxLength?: number;
}> = ({ label, value, onChange, type = "text", maxLength }) => (
  <label className="block rounded-[14px] bg-page px-3.5 pt-2 pb-2.5">
    <span className="block text-xs text-muted">{label}</span>
    <input
      type={type}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-[15px] font-semibold text-ink bg-transparent focus:outline-none"
    />
  </label>
);
