"use client";

import { ReactNode, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  abbreviation: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "#dashboard", abbreviation: "DA" },
  { label: "Projects", href: "#projects", abbreviation: "PR" },
  { label: "Analysis", href: "#analysis", abbreviation: "AN" },
  { label: "Reports", href: "#reports", abbreviation: "RE" },
  { label: "AI Assistant", href: "#ai-assistant", abbreviation: "AI" },
  { label: "Data Sources", href: "#data-sources", abbreviation: "DS" },
  { label: "Team", href: "#team", abbreviation: "TE" },
  { label: "Settings", href: "#settings", abbreviation: "SE" },
];

type AppLayoutProps = {
  activeItem?: string;
  children: ReactNode;
};

export function AppLayout({ activeItem = "Analysis", children }: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div
      className="app-layout"
      data-sidebar-collapsed={isSidebarCollapsed ? "true" : "false"}
      data-theme={theme}
    >
      <Sidebar
        activeItem={activeItem}
        isCollapsed={isSidebarCollapsed}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
      />
      {isMobileNavOpen ? (
        <button
          aria-label="Close navigation"
          className="sidebar-scrim"
          type="button"
          onClick={() => setIsMobileNavOpen(false)}
        />
      ) : null}
      <div className="app-main">
        <Topbar
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          theme={theme}
        />
        {children}
      </div>
    </div>
  );
}

type SidebarProps = {
  activeItem: string;
  isCollapsed: boolean;
  isOpen: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

export function Sidebar({
  activeItem,
  isCollapsed,
  isOpen,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside className={isOpen ? "sidebar is-open" : "sidebar"} aria-label="Primary navigation">
      <div className="sidebar-brand">
        <a className="brand-mark" href="#analysis" aria-label="SurveyIQ home">
          SI
        </a>
        <div className="brand-copy">
          <strong>SurveyIQ</strong>
          <span>Feedback Intelligence</span>
        </div>
        <button
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="icon-button sidebar-collapse"
          type="button"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = item.label === activeItem;
          return (
            <a
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "nav-link active" : "nav-link"}
              href={item.href}
              key={item.label}
              onClick={onClose}
              title={item.label}
            >
              <span className="nav-icon" aria-hidden="true">
                {item.abbreviation}
              </span>
              <span className="nav-label">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

type TopbarProps = {
  onOpenMobileNav: () => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
};

export function Topbar({ onOpenMobileNav, onToggleTheme, theme }: TopbarProps) {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button
          aria-label="Open navigation"
          className="icon-button mobile-menu-button"
          type="button"
          onClick={onOpenMobileNav}
        >
          Menu
        </button>
        <div className="workspace-switcher" aria-label="Current workspace">
          <span className="workspace-dot" aria-hidden="true" />
          <span>SurveyIQ Workspace</span>
        </div>
      </div>

      <label className="topbar-search">
        <span className="sr-only">Search</span>
        <input placeholder="Search projects, analyses, reports" type="search" />
      </label>

      <div className="topbar-actions" aria-label="Workspace actions">
        <button className="icon-button" type="button" aria-label="Notifications">
          Bell
        </button>
        <button className="icon-button" type="button" aria-label="Help">
          ?
        </button>
        <button
          aria-label="Toggle theme"
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
        >
          <span aria-hidden="true">{theme === "light" ? "Light" : "Dark"}</span>
        </button>
        <button className="avatar-button" type="button" aria-label="User menu">
          CS
        </button>
      </div>
    </header>
  );
}

export function ContentArea({ children }: { children: ReactNode }) {
  return <main className="content-area">{children}</main>;
}

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="page-description">{description}</p> : null}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </header>
  );
}

type SectionHeaderProps = {
  title: string;
  detail?: string;
  actions?: ReactNode;
};

export function SectionHeader({ title, detail, actions }: SectionHeaderProps) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {detail ? <span>{detail}</span> : null}
      </div>
      {actions ? <div className="section-actions">{actions}</div> : null}
    </div>
  );
}
