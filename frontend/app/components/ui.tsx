import { ButtonHTMLAttributes, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <section className={className ? `card ${className}` : "card"}>{children}</section>;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const classes = ["button", `button-${variant}`, className].filter(Boolean).join(" ");
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "ai";
  className?: string;
};

export function Badge({ children, className = "", tone = "neutral" }: BadgeProps) {
  const classes = ["badge", `badge-${tone}`, className].filter(Boolean).join(" ");
  return <span className={classes}>{children}</span>;
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="state state-loading" role="status">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="state state-empty">
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}

type ErrorStateProps = {
  title?: string;
  message: string;
};

export function ErrorState({ title = "Something needs attention", message }: ErrorStateProps) {
  return (
    <div className="state state-error" role="alert">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}
