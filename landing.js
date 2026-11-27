/* ==========================================================================
   SKYLENSE STUDIO — LANDING INTERACTIONS (ESSENTIEL & FLUIDE)
   ========================================================================== */

(() => {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* 1. Subtle parallax on hero photo + alpha contour layers */
    const heroPhotoBg = document.getElementById("hero-photo-bg");
    const heroAlphaBg = document.getElementById("hero-alpha-bg");
    if ((heroPhotoBg || heroAlphaBg) && !prefersReducedMotion) {
        window.addEventListener("scroll", () => {
            const y = Math.min(window.scrollY, 900);
            if (heroPhotoBg) {
                heroPhotoBg.style.transform = `scale(1.03) translate3d(0, ${(y * 0.1).toFixed(1)}px, 0)`;
            }
            if (heroAlphaBg) {
                heroAlphaBg.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`;
            }
        }, { passive: true });
    }

    /* 2. Mobile drawer */
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    if (mobileBtn && mobileDrawer) {
        mobileBtn.addEventListener("click", () => {
            const open = mobileDrawer.classList.toggle("is-open");
            mobileBtn.setAttribute("aria-expanded", String(open));
        });
        mobileDrawer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileDrawer.classList.remove("is-open");
                mobileBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* 3. Scroll reveal */
    const revealEls = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach((el) => obs.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* 4. Hero preview cycling (4 real posters) */
    const slides = Array.from(document.querySelectorAll(".hero-preview-slide"));
    const dots = Array.from(document.querySelectorAll(".preview-dot"));
    const previewTitle = document.getElementById("preview-meta-title");
    const previewCoords = document.getElementById("preview-meta-coords");
    let activeIdx = 0;
    let cycleTimer = null;

    function showSlide(index) {
        if (!slides.length) return;
        activeIdx = (index + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle("is-active", i === activeIdx));
        dots.forEach((d, i) => d.classList.toggle("is-active", i === activeIdx));

        const activeSlide = slides[activeIdx];
        if (previewTitle && previewCoords && activeSlide) {
            previewTitle.textContent = activeSlide.dataset.title || "";
            previewCoords.textContent = activeSlide.dataset.coords || "";
        }
    }

    function startCycle() {
        if (prefersReducedMotion || slides.length < 2) return;
        stopCycle();
        cycleTimer = window.setInterval(() => showSlide(activeIdx + 1), 4500);
    }

    function stopCycle() {
        if (cycleTimer) {
            window.clearInterval(cycleTimer);
            cycleTimer = null;
        }
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            showSlide(idx);
            startCycle();
        });
    });

    const previewFrame = document.getElementById("hero-preview-frame");
    if (previewFrame) {
        previewFrame.addEventListener("mouseenter", stopCycle);
        previewFrame.addEventListener("mouseleave", startCycle);
    }
    startCycle();

    /* 5. Minimal Lightbox */
    const POSTERS = {
        ville: {
            src: "images/ville.png",
            mode: "Routes & Fleuves",
            title: "Grenoble",
            coords: "45.188° N, 5.736° E · 2480 × 3508 px",
            desc: "Plan urbain vectoriel avec l'Isère, le Drac, les grands axes routiers et les communes de l'agglomération.",
            url: "studio.html?ville=Grenoble"
        },
        topo1: {
            src: "images/topo1.png",
            mode: "Courbes Topo · Minimal",
            title: "La Dent de Crolles",
            coords: "45.308° N, 5.856° E · 3500 × 4950 px",
            desc: "Isocontours haute définition en Chartreuse avec sommets réels annotés et échelle 500 m.",
            url: "studio.html?ville=Dent%20de%20Crolles"
        },
        topo2: {
            src: "images/topo2.png",
            mode: "Courbes Topo · Or & Blanc",
            title: "La Pinéa",
            coords: "45.288° N, 5.738° E · 2480 × 3508 px",
            desc: "Lignes de niveau bronze doré sur papier chaud ivoire autour du sommet de La Pinéa (1 771 m).",
            url: "studio.html?ville=La%20Pin%C3%A9a"
        },
        topo3: {
            src: "images/topo3.png",
            mode: "Courbes Topo · Bleu Nuit",
            title: "L'Alpe d'Huez",
            coords: "45.092° N, 6.070° E · 5950 × 8420 px (50 Mpx)",
            desc: "Tirage grand format du massif des Grandes Rousses et du Pic Blanc (3 382 m) sur fond bleu nuit.",
            url: "studio.html?ville=Alpe%20d%27Huez"
        }
    };

    const lightbox = document.getElementById("lightbox");
    const lbMedia = document.getElementById("lightbox-media");
    const lbImg = document.getElementById("lightbox-img");
    const lbMode = document.getElementById("lightbox-mode");
    const lbTitle = document.getElementById("lightbox-title");
    const lbCoords = document.getElementById("lightbox-coords");
    const lbDesc = document.getElementById("lightbox-desc");
    const lbLink = document.getElementById("lightbox-studio-link");
    const lbClose = document.getElementById("lightbox-close");

    function openLightbox(key) {
        const item = POSTERS[key];
        if (!item || !lightbox) return;
        lbMedia.classList.remove("is-zoomed");
        lbImg.src = item.src;
        lbImg.alt = `${item.title} — ${item.mode}`;
        lbMode.textContent = item.mode;
        lbTitle.textContent = item.title;
        lbCoords.textContent = item.coords;
        lbDesc.textContent = item.desc;
        lbLink.href = item.url;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-open-lightbox]").forEach((el) => {
        el.addEventListener("click", () => openLightbox(el.dataset.openLightbox));
        if (el.getAttribute("tabindex") === "0") {
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(el.dataset.openLightbox);
                }
            });
        }
    });

    if (lbImg && lbMedia) {
        lbImg.addEventListener("click", () => lbMedia.classList.toggle("is-zoomed"));
    }
    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
})();
