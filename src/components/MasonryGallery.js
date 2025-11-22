import React, { useEffect, useRef, useState, useMemo } from "react";
import Masonry from "react-masonry-css";
import imagesLoaded from "imagesloaded";
import { ButtonGroup, Button } from "react-bootstrap";

// Simple categories derivation helper
function deriveCategories(items = []) {
  const set = new Set();
  items.forEach((it) => {
    if (it.category) set.add(it.category);
  });
  return Array.from(set);
}

export default function MasonryGallery({ items = [] }) {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const categories = useMemo(() => deriveCategories(items), [items]);
  const [animating, setAnimating] = useState(false);
  // FLIP helpers
  const nodeRefs = useRef(new Map());
  const firstRects = useRef(null);

  // filtered items based on activeFilter
  const filtered = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((it) => it.category === activeFilter);
  }, [items, activeFilter]);

  // handle filter change with animations
  function changeFilter(next) {
    if (next === activeFilter) return;
    // record first positions
    firstRects.current = {};
    nodeRefs.current.forEach((el, key) => {
      if (el && el.getBoundingClientRect)
        firstRects.current[key] = el.getBoundingClientRect();
    });
    setAnimating(true);
    // swap filter shortly after to allow recording
    setTimeout(() => setActiveFilter(next), 20);
  }

  // re-layout masonry after images load
  useEffect(() => {
    if (!containerRef.current) return;
    const imgLoad = imagesLoaded(containerRef.current);
    // Force a reflow when all images are done
    imgLoad.on("always", () => {
      // no-op; react-masonry-css responds to children changes
    });
    return () => imgLoad.off();
  }, [filtered]);

  // FLIP effect: run when filtered changes
  useEffect(() => {
    // read CSS variables for timings (fallbacks in ms)
    const cs = getComputedStyle(document.documentElement);
    const moveDur =
      parseInt(
        (cs.getPropertyValue("--flip-move-duration") || "420ms").trim()
      ) || 420;
    const moveStagger =
      parseInt((cs.getPropertyValue("--flip-move-stagger") || "25ms").trim()) ||
      25;
    const enterDur =
      parseInt(
        (cs.getPropertyValue("--flip-enter-duration") || "360ms").trim()
      ) || 360;
    const enterStagger =
      parseInt(
        (cs.getPropertyValue("--flip-enter-stagger") || "40ms").trim()
      ) || 40;
    if (!firstRects.current) {
      // nothing recorded; end animating after a tick
      const t = setTimeout(() => setAnimating(false), 250);
      return () => clearTimeout(t);
    }

    // measure last positions
    const lastRects = {};
    nodeRefs.current.forEach((el, key) => {
      if (el && el.getBoundingClientRect)
        lastRects[key] = el.getBoundingClientRect();
    });

    const animated = [];

    // move animations for elements present before and after (staggered)
    const keys = Object.keys(lastRects);
    keys.forEach((key, i) => {
      const first = firstRects.current[key];
      const last = lastRects[key];
      const el = nodeRefs.current.get(key);
      if (!first || !last || !el) return;
      const dx = Math.round(first.left - last.left);
      const dy = Math.round(first.top - last.top);
      if (dx === 0 && dy === 0) return;
      const delay = Math.min(120, i * moveStagger);
      // set CSS variables for FLIP values
      el.style.setProperty("--flip-x", dx + "px");
      el.style.setProperty("--flip-y", dy + "px");
      el.classList.add("flip-from");
      // force reflow then add move class to animate to identity
      requestAnimationFrame(() => {
        el.classList.add("flip-move");
        // remove flip-from so CSS transition moves it
        el.classList.remove("flip-from");
      });
      // set a staggered timeout to cleanup this element later
      setTimeout(() => {
        el.classList.remove("flip-move");
        el.style.removeProperty("--flip-x");
        el.style.removeProperty("--flip-y");
        el.classList.add("flip-cleanup");
        // remove cleanup class a tick later
        setTimeout(() => el.classList.remove("flip-cleanup"), 50);
      }, moveDur + delay);
      animated.push(el);
    });

    // fade in newly inserted elements (staggered)
    keys.forEach((key, i) => {
      if (!firstRects.current[key]) {
        const el = nodeRefs.current.get(key);
        if (!el) return;
        const delay = Math.min(180, i * enterStagger);
        el.classList.add("flip-enter");
        // staggered enter
        setTimeout(() => el.classList.add("flip-enter-to"), delay);
        // cleanup
        setTimeout(() => {
          el.classList.remove("flip-enter");
          el.classList.remove("flip-enter-to");
        }, delay + enterDur);
        animated.push(el);
      }
    });

    const cleanup = setTimeout(() => {
      animated.forEach((el) => {
        if (!el) return;
        el.style.transition = "";
        el.style.transform = "";
        el.style.opacity = "";
      });
      firstRects.current = null;
      setAnimating(false);
    }, Math.max(moveDur, enterDur) + 200);

    return () => clearTimeout(cleanup);
  }, [filtered]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    480: 1,
  };

  return (
    <div className="masonry-wrapper">
      <div className="masonry-filters text-center mb-3">
        <ButtonGroup aria-label="filters">
          <Button
            variant={activeFilter === "all" ? "primary" : "outline-primary"}
            onClick={() => changeFilter("all")}
          >
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c}
              variant={activeFilter === c ? "primary" : "outline-primary"}
              onClick={() => changeFilter(c)}
            >
              {c}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div
        ref={containerRef}
        className={`masonry-gallery ${animating ? "animating" : ""}`}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filtered.map((it, idx) => {
            const key = `${it.img}::${it.title}::${it.subtitle || ""}::${idx}`;
            return (
              <figure
                key={key}
                ref={(el) => {
                  if (el) nodeRefs.current.set(key, el);
                  else nodeRefs.current.delete(key);
                }}
                className={`masonry-item card ${animating ? "leaving" : ""}`}
              >
                <img
                  src={it.img}
                  alt={it.title || `item-${idx}`}
                  loading="lazy"
                  className="card-img-top"
                />
                <figcaption className="card-body">
                  <h5 className="card-title mb-1">{it.title}</h5>
                  {it.subtitle ? (
                    <p className="card-text small">{it.subtitle}</p>
                  ) : null}
                  {it.price ? (
                    <div className="mt-2">
                      <strong>{it.price}</strong>
                    </div>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </Masonry>
      </div>
    </div>
  );
}
