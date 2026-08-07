/* ==========================================================================
   KroxIT Solutions — Interactions (app.js)
   ========================================================================== */

/* 0. Page transitions ------------------------------------------------------
   Fade the current page out before navigating, so every page change reads as one
   continuous surface instead of a hard swap. The matching fade-in lives in CSS
   (body { animation: pageIn }). Opacity only — layout never moves. */
(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Coming back via the back button (bfcache) restores the DOM as-is — make sure
    // we never restore it mid-fade-out.
    window.addEventListener("pageshow", () => root.classList.remove("is-leaving"));

    if (reduced) return;

    const isInternal = a => {
        if (!a || !a.href) return false;
        if (a.target && a.target !== "_self") return false;
        if (a.hasAttribute("download")) return false;
        const url = new URL(a.href, location.href);
        if (url.protocol !== location.protocol || url.host !== location.host) return false;
        // Anything that resolves to the page we're already on (in-page anchors,
        // href="#", the active nav item): let the browser handle it, don't fade.
        if (url.pathname === location.pathname && url.search === location.search) return false;
        return true;
    };

    document.addEventListener("click", e => {
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const link = e.target.closest("a");
        if (!isInternal(link)) return;

        e.preventDefault();
        root.classList.add("is-leaving");

        let done = false;
        const go = () => {
            if (done) return;
            done = true;
            location.href = link.href;
            // Fail-safe: if the navigation never takes (blocked, offline, bad path),
            // fade the page back in rather than leaving the visitor on a blank screen.
            setTimeout(() => root.classList.remove("is-leaving"), 1200);
        };
        // Navigate when the fade finishes, with a timer as a backstop.
        document.body.addEventListener("transitionend", go, { once: true });
        setTimeout(go, 260);
    });
})();

document.addEventListener("DOMContentLoaded", () => {

    /* 0b. Icons ------------------------------------------------------------- */
    if (window.lucide) lucide.createIcons();

    /* 1. Navbar scroll state ------------------------------------------------ */
    const navbar = document.getElementById("navbar");
    if (navbar) {
        const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        onScroll();
    }

    /* 2. Mobile menu -------------------------------------------------------- */
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    if (menuToggle && navLinks) {
        const closeNav = () => {
            navLinks.classList.toggle("open", false);
            menuToggle.classList.toggle("is-open", false);
            document.body.classList.toggle("nav-open", false);
        };
        const setNav = open => {
            // If motion.js is loaded on this page, let it play a fade-out first —
            // display:none can't be transitioned, so this is the only way to make
            // closing feel as smooth as the CSS-driven open. Falls back to the
            // instant toggle everywhere else.
            if (!open && window.__animateNavClose) {
                window.__animateNavClose(closeNav);
                return;
            }
            navLinks.classList.toggle("open", open);
            menuToggle.classList.toggle("is-open", open);
            document.body.classList.toggle("nav-open", open);
        };
        menuToggle.addEventListener("click", () => setNav(!navLinks.classList.contains("open")));
        navLinks.querySelectorAll("a").forEach(a =>
            a.addEventListener("click", () => setNav(false)));
    }

    /* 2b. Hero dot-globe ---------------------------------------------------- */
    const sphere = document.getElementById("asciiSphere");
    if (sphere && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const ctx = sphere.getContext("2d");
        const N = 900;                   // ponytail: fixed point count, plenty at this size
        // evenly-spread points on a unit sphere (Fibonacci lattice)
        const pts = [];
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
            const y = 1 - (i / (N - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const t = golden * i;
            pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
        }
        let d = 0, rot = 0;
        const size = () => { d = Math.round(sphere.clientWidth * devicePixelRatio); sphere.width = sphere.height = d; };
        size();
        addEventListener("resize", size);

        const TILT = 0.42, ct = Math.cos(TILT), st = Math.sin(TILT);
        const draw = () => {
            ctx.clearRect(0, 0, d, d);
            const R = d * 0.46, cx = d / 2, cy = d / 2;
            const cr = Math.cos(rot), sr = Math.sin(rot);
            for (const [px, py, pz] of pts) {
                // spin around Y, then tilt around X
                const x = px * cr + pz * sr;
                let z = -px * sr + pz * cr;
                const yy = py * ct - z * st;
                z = py * st + z * ct;
                const depth = (z + 1) / 2;                 // 0 back .. 1 front
                const sx = cx + x * R, sy = cy + yy * R;
                const rad = (0.5 + depth * 1.7) * devicePixelRatio;
                if (depth > 0.55) {                        // front hemisphere: brand blue accents
                    ctx.fillStyle = `rgba(61,106,179,${0.15 + (depth - 0.55) * 1.4})`;
                } else {
                    ctx.fillStyle = `rgba(210,222,240,${0.10 + depth * 0.55})`;
                }
                ctx.beginPath();
                ctx.arc(sx, sy, rad, 0, 6.283);
                ctx.fill();
            }
            rot += 0.0035;
            requestAnimationFrame(draw);
        };
        draw();
    }

    /* 3. Scroll reveal ------------------------------------------------------ */
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    if (reveals.length) {
        // Reveal anything already within (or near) the viewport.
        const revealInView = () => {
            const vh = window.innerHeight || document.documentElement.clientHeight;
            reveals.forEach(el => {
                if (el.classList.contains("in")) return;
                if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add("in");
            });
        };

        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver((entries, obs) => {
                entries.forEach(e => {
                    if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
            reveals.forEach(el => io.observe(el));
        } else {
            // No IO support: fall back to scroll math.
            window.addEventListener("scroll", revealInView, { passive: true });
        }

        // First paint + safety: show whatever is on screen, keep the rest for scroll.
        requestAnimationFrame(revealInView);
        window.addEventListener("load", revealInView);
        window.addEventListener("scroll", revealInView, { passive: true });
    }

    /* 4. Stat count-up ------------------------------------------------------ */
    const statNumbers = document.querySelectorAll(".stat-number");
    if (statNumbers.length) {
        const suffixFor = t => (t === 99 ? "%" : t === 24 ? "/7" : t === 18 ? "K+" : "+");
        const statObs = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.getAttribute("data-target"), 10);
                if (isNaN(target)) { obs.unobserve(el); return; }   // no data-target → keep static text
                const suffix = suffixFor(target);
                let count = 0;
                const step = target / (1600 / 16);
                const tick = () => {
                    count += step;
                    if (count < target) { el.innerText = Math.ceil(count); requestAnimationFrame(tick); }
                    else el.innerText = target + suffix;
                };
                tick();
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(n => statObs.observe(n));
    }

    /* 5. Booking wizard (book.html) ---------------------------------------- */
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        const step1 = document.getElementById("step1");
        const step2 = document.getElementById("step2");
        const step3 = document.getElementById("step3");
        const btnNext1 = document.getElementById("btnNext1");
        const btnBack2 = document.getElementById("btnBack2");
        const btnSubmit = document.getElementById("btnSubmit");
        const progressBar = document.getElementById("progressBar");
        const stepLabel = document.getElementById("wizStepLabel");
        const choices = document.querySelectorAll(".choice");

        let selectedService = "repair";

        const serviceLabels = {
            repair: "Home Device Repair Service",
            networking: "Whole-Building Network Setup",
            cctv: "CCTV Surveillance Grid",
            biometrics: "Biometric Access Systems",
            firewall: "Gateway Firewall Configuration",
            amc: "Annual Maintenance Contract (AMC)",
            server: "Server, Data Center & Cloud Services"
        };

        // Preselect from ?service=
        const q = new URLSearchParams(location.search).get("service");
        if (q && serviceLabels[q]) {
            choices.forEach(c => c.classList.remove("selected"));
            const match = document.querySelector(`.choice[data-value="${q}"]`);
            if (match) { match.classList.add("selected"); selectedService = q; }
        }

        choices.forEach(card => card.addEventListener("click", () => {
            choices.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedService = card.getAttribute("data-value");
        }));

        const steps = [step1, step2, step3];
        const goTo = n => {
            steps.forEach(s => s.classList.remove("active"));
            steps[n - 1].classList.add("active");
            progressBar.style.width = (n / 3 * 100) + "%";
            if (stepLabel) stepLabel.innerText = "Step " + n + " / 3";
            btnBack2.hidden = n !== 2;
        };

        btnNext1.addEventListener("click", () => goTo(2));
        btnBack2.addEventListener("click", () => goTo(1));

        btnSubmit.addEventListener("click", () => {
            const name = document.getElementById("clientName");
            const phone = document.getElementById("clientPhone");
            const email = document.getElementById("clientEmail");
            const issue = document.getElementById("issueDesc");
            if (![name, phone, email, issue].every(f => f.checkValidity())) {
                bookingForm.reportValidity();
                return;
            }
            const rid = "KROX-" + Math.floor(1000 + Math.random() * 9000) + "-" +
                String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                String.fromCharCode(65 + Math.floor(Math.random() * 26));
            document.getElementById("ticketIdDisplay").innerText = rid;
            document.getElementById("summaryName").innerText = name.value;
            document.getElementById("summaryService").innerText = serviceLabels[selectedService] || selectedService;
            goTo(3);
        });
    }

    /* 6. Contact form (contact.html) --------------------------------------- */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const status = document.getElementById("contactStatus");
            contactForm.reset();
            status.innerText = "✓ Message sent. We'll get back to you within a few business hours.";
            status.style.color = "var(--ink)";
        });
    }

    /* 8. FAQ accordion (contact.html) -------------------------------------- */
    document.querySelectorAll(".faq-question").forEach(q => {
        q.addEventListener("click", () => {
            const item = q.parentElement;
            const open = item.classList.contains("active");
            document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
            if (!open) item.classList.add("active");
        });
    });
});
