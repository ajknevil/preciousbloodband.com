import React, { useState, useEffect, useMemo } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function ResponsiveNavbar() {
  const navLinks = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#albums", label: "Albums" },
      { href: "#shows", label: "Shows" },
      { href: "#videos", label: "Videos" },
      { href: "#bio", label: "Bio" },
    ],
    []
  );
  const [active, setActive] = useState(window.location.hash || "#home");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onHashChange = () => setActive(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);

    // Scroll spy: update active nav based on scroll position
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const onScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      let found = false;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = rect.top + window.scrollY;
          if (scrollPos + 80 >= offset) {
            // 80px buffer for navbar height
            setActive(`#${sectionIds[i]}`);
            found = true;
            break;
          }
        }
      }
      if (!found) setActive("#home");
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, [navLinks]);

  const handleNavClick = (href: string) => {
    setActive(href);
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = href;
    }
    // Only close if menu is open (mobile)
    if (expanded) setExpanded(false);
  };
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="pb-navbar"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Navbar.Brand
        href="#home"
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        <img
          src="/img/core-img/precious-blood-logo.png"
          alt="Precious Blood Logo"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#fff",
          }}
        />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded((exp) => !exp)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" style={{ alignItems: "center", gap: 32 }}>
          {navLinks.map((link) => (
            <Nav.Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={active === link.href ? { color: "#1976f6" } : undefined}
              className={active === link.href ? "active-link" : ""}
            >
              {link.label}
              {active === link.href && (
                <span
                  style={{
                    display: "block",
                    height: 4,
                    borderRadius: 2,
                    background: "#1976f6",
                    width: "70%",
                    margin: "0.2rem auto 0 auto",
                  }}
                />
              )}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
