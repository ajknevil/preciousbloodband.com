import React, { useEffect, useState, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function ResponsiveNavbar() {
  const [activeId, setActiveId] = useState("hero");
  const currentActiveRef = useRef(activeId);

  useEffect(() => {
    // We'll use a scroll/resize handler that inspects section bounding rects.
    // This is deterministic for a fixed-top navbar and works for late-mounted sections.
    const ids = [
      "hero",
      "albums",
      "shows",
      "videos",
      "bio",
      "buy",
      "featured",
      "contact",
    ];

    let ticking = false;

    const computeActive = () => {
      const nav = document.querySelector(".fixed-top");
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;

      // get sections that exist
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }));

      if (sections.length === 0) return;

      // Choose the section whose top is closest to (navHeight + 10) but not below it
      const offset = navHeight + 10; // small buffer
      let chosen = sections[0];
      for (const s of sections) {
        // prefer sections whose top is <= offset (already under nav), otherwise nearest below
        if (s.top <= offset) {
          if (!chosen || s.top > chosen.top) chosen = s;
        } else if (!chosen || chosen.top > offset) {
          // if no section is above offset yet, take nearest below
          if (Math.abs(s.top - offset) < Math.abs(chosen.top - offset))
            chosen = s;
        }
      }

      if (chosen && chosen.id && chosen.id !== currentActiveRef.current) {
        currentActiveRef.current = chosen.id;
        setActiveId(chosen.id);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          computeActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    // initial compute (also handles hash)
    computeActive();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Also re-run when DOM mutates (e.g. Bio content loaded)
    const mo = new MutationObserver(() => computeActive());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, []);

  return (
    <Navbar variant="dark" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="img/core-img/precious-blood-logo.png"
            alt="Precious Blood"
            style={{
              height: 32,
              width: 32,
              objectFit: "cover",
              borderRadius: "50%",
            }}
            className="img-fluid rounded-circle"
            loading="lazy"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#hero" active={activeId === "hero"}>
              Home
            </Nav.Link>
            <Nav.Link href="#albums" active={activeId === "albums"}>
              Albums
            </Nav.Link>
            <Nav.Link href="#shows" active={activeId === "shows"}>
              Shows
            </Nav.Link>
            <Nav.Link href="#videos" active={activeId === "videos"}>
              Videos
            </Nav.Link>
            <Nav.Link href="#bio" active={activeId === "bio"}>
              Bio
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
