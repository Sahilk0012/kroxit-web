/* ==========================================================================
   KroxIT Solutions — Framer Motion (vanilla "motion" API, no React)
   Loaded as a module only on pages that opt in (see the importmap + inline
   hide-before-paint snippet in <head>). Everything here degrades safely:
   prefers-reduced-motion skips straight to the final state, and if this
   module fails to load at all, the inline fallback in <head> reveals the
   hero after 1.5s so nothing gets stuck invisible.
   ========================================================================== */

import { animate, inView, hover, press, stagger } from "framer-motion/dom";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Tell the inline <head> snippet we loaded successfully — it can stop
// watching for the timeout fallback.
window.__motionReady = true;
document.documentElement.classList.remove("js-motion");

/* 1. Hero entrance: fade-in + slide-up, staggered ------------------------- */
const heroEls = ["hero-title", "hero-lead", "hero-btns"]
    .map(cls => document.querySelector("." + cls))
    .filter(Boolean);

if (heroEls.length) {
    if (reduced) {
        heroEls.forEach(el => { el.style.opacity = "1"; });
    } else {
        animate(
            heroEls,
            { opacity: [0, 1], y: [24, 0] },
            { duration: 0.6, ease: "easeOut", delay: stagger(0.12) }
        );
    }
}

/* 2. Scroll reveals: sections fade in on whileInView, card grids stagger -- */
const revealEls = Array.from(document.querySelectorAll(".mo-reveal"));

if (revealEls.length) {
    if (reduced) {
        revealEls.forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
    } else {
        // Elements sharing a `.svc-grid` parent are animated together (staggered);
        // everything else reveals on its own as it enters the viewport.
        const groups = new Map();
        revealEls.forEach(el => {
            const grid = el.closest(".svc-grid");
            const key = grid || el;
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(el);
        });

        groups.forEach((els, trigger) => {
            inView(trigger, () => {
                animate(
                    els,
                    { opacity: [0, 1], y: [24, 0] },
                    {
                        duration: 0.5,
                        ease: "easeOut",
                        delay: els.length > 1 ? stagger(0.08) : 0
                    }
                );
            }, { amount: 0.2, margin: "0px 0px -10% 0px" });
        });
    }
}

/* 3. Cards: subtle hover scale (1.02x) ------------------------------------ */
if (!reduced) {
    document.querySelectorAll(".svc-card").forEach(card => {
        hover(card, () => {
            const controls = animate(card, { scale: 1.02 }, { duration: 0.25, ease: "easeOut" });
            return () => animate(card, { scale: 1 }, { duration: 0.25, ease: "easeOut" });
        });
    });
}

/* 4. Buttons: hover scale + tap feedback ---------------------------------- */
if (!reduced) {
    document.querySelectorAll(".btn").forEach(btn => {
        hover(btn, () => {
            animate(btn, { scale: 1.02 }, { duration: 0.2, ease: "easeOut" });
            return () => animate(btn, { scale: 1 }, { duration: 0.2, ease: "easeOut" });
        });
        press(btn, () => {
            animate(btn, { scale: 0.97 }, { duration: 0.15, ease: "easeOut" });
            return () => animate(btn, { scale: 1 }, { duration: 0.15, ease: "easeOut" });
        });
    });

    /* 5. Mobile nav: smooth close (open already has a CSS keyframe) -------- */
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        window.__animateNavClose = done => {
            animate(navLinks, { opacity: [1, 0], y: [0, -8] }, { duration: 0.25, ease: "easeOut" })
                .then(done);
        };
    }
}
