// Main JS moved from js/script.js
// (content copied and adjusted to new path)
const waitForComponents = (cb) => {
    if (window.__componentsLoaded) return cb();
    document.addEventListener('components:loaded', cb, { once: true });
};

document.addEventListener('DOMContentLoaded', () => {
    waitForComponents(() => {
    // Smooth scrolling for anchor links + update URL without jump
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const isMobile = window.innerWidth <= 768;
                if (isMobile && typeof window.closeMobileMenu === 'function') {
                    window.closeMobileMenu();
                    // Delay scroll to allow menu to close
                    setTimeout(() => {
                        if (href === '#top') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 350);
                } else {
                    if (href === '#top') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }

                if (history && history.pushState) {
                    history.pushState(null, '', href);
                } else {
                    location.hash = href;
                }

                try {
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                    target.removeAttribute('tabindex');
                } catch (err) {}
            }
        });
    });

    window.addEventListener('popstate', () => {
        const hash = location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Animate sections
    const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.tools-section, .stats-section, .categories-section, .features-section, .testimonial-section').forEach(el => {
        const isMobile = window.innerWidth <= 768;
        if ((el.classList.contains('categories-section') || el.classList.contains('tools-section')) && isMobile) {
            // On mobile, keep categories and tools visible but still animate transform
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'transform 0.6s ease';
            observer.observe(el);
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });

    // Mobile nav toggle (right-drawer)
    const navToggle = document.getElementById('nav-toggle');
    const navCancel = document.getElementById('nav-cancel');
    const siteNav = document.getElementById('site-nav');

    let focusTrapCleanup = null;
    let previouslyFocused = null;

    window.closeMobileMenu = () => {
        if (!siteNav) return;
        if (siteNav.classList.contains('open')) siteNav.classList.remove('open');
        const toggle = document.getElementById('nav-toggle');
        if (toggle) { toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
        const ov = document.querySelector('.nav-overlay');
        if (ov) ov.classList.remove('visible');
        if (focusTrapCleanup) { focusTrapCleanup(); focusTrapCleanup = null; }
        if (previouslyFocused) { previouslyFocused.focus(); previouslyFocused = null; }
    };

    if (navToggle && siteNav) {
        const ensureOverlay = () => {
            let ov = document.querySelector('.nav-overlay');
            if (!ov) { ov = document.createElement('div'); ov.className = 'nav-overlay'; document.body.appendChild(ov); }
            return ov;
        };

        const showOverlay = () => { const ov = ensureOverlay(); requestAnimationFrame(() => ov.classList.add('visible')); return ov; };
        const hideOverlay = () => { const ov = document.querySelector('.nav-overlay'); if (ov) ov.classList.remove('visible'); };

        const trapFocus = (container) => {
            const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
            const nodes = Array.from(container.querySelectorAll(focusableSelector)).filter(n => !n.hasAttribute('disabled'));
            if (!nodes.length) return () => {};
            const first = nodes[0], last = nodes[nodes.length - 1];
            const handler = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
                } else if (e.key === 'Escape') { closeMobileMenu(); }
            };
            document.addEventListener('keydown', handler);
            return () => document.removeEventListener('keydown', handler);
        };

        navToggle.addEventListener('click', () => {
            const open = siteNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            navToggle.classList.toggle('open', open);
            if (open) {
                const ov = showOverlay();
                ov.addEventListener('click', () => { closeMobileMenu(); }, { once: true });
                previouslyFocused = document.activeElement;
                focusTrapCleanup = trapFocus(siteNav);
                const firstFocusable = siteNav.querySelector('a, button');
                if (firstFocusable) firstFocusable.focus();
            } else {
                hideOverlay();
                if (focusTrapCleanup) { focusTrapCleanup(); focusTrapCleanup = null; }
                if (previouslyFocused) previouslyFocused.focus();
            }
        });
    }

    // Cancel button for mobile nav
    if (navCancel) {
        navCancel.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // Scroll-spy
    (function initScrollSpy() {
        const header = document.querySelector('.site-header');
        const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
        const sections = navLinks.map(l => l.getAttribute('href')).filter(h => h && h.startsWith('#') && h !== '#top').map(h => document.querySelector(h)).filter(Boolean);
        if (!sections.length) return;
        const getHeaderOffset = () => (header ? header.offsetHeight : 0);
        const makeIoOptions = () => ({ root: null, rootMargin: `-${getHeaderOffset()}px 0px -10% 0px`, threshold: [0,0.15,0.4,0.6] });
        const ioCallback = (entries) => {
            const visible = entries.filter(e => e.isIntersecting);
            navLinks.forEach(l => l.classList.remove('active'));
            if (window.scrollY < 100) {
                const homeLink = document.querySelector('.site-nav a[href="#top"]');
                if (homeLink) homeLink.classList.add('active');
                return;
            }
            if (!visible.length) {
                if (window.scrollY > document.body.scrollHeight - window.innerHeight - 100) {
                    const testimonialsLink = document.querySelector('.site-nav a[href="#testimonials"]');
                    if (testimonialsLink) testimonialsLink.classList.add('active');
                }
                return;
            }
            visible.sort((a,b) => b.intersectionRatio - a.intersectionRatio);
            const top = visible[0].target;
            const activeLink = document.querySelector(`.site-nav a[href="#${top.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        };
        let io = new IntersectionObserver(ioCallback, makeIoOptions());
        sections.forEach(s => io.observe(s));
        navLinks.forEach(link => { link.addEventListener('click', () => { if (typeof closeMobileMenu === 'function') closeMobileMenu(); }); });
        let resizeTimer; window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { io.disconnect(); io = new IntersectionObserver(ioCallback, makeIoOptions()); sections.forEach(s => io.observe(s)); }, 160); });
    })();

    // Stat counters
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.stat-number').forEach(el => {
                        const raw = el.textContent.trim();
                        const numeric = parseFloat(raw.replace(/,/g, '').replace(/[^0-9.]/g, '')) || 0;
                        const duration = 1200; const start = 0; const startTime = performance.now();
                        const step = (now) => {
                            const progress = Math.min((now - startTime) / duration, 1);
                            const value = Math.floor(progress * (numeric - start) + start);
                            const suffix = raw.match(/[a-zA-Z%]+/) ? raw.match(/[a-zA-Z%]+/)[0] : '';
                            el.textContent = value.toLocaleString() + suffix;
                            if (progress < 1) requestAnimationFrame(step);
                        };
                        requestAnimationFrame(step);
                    });
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.4 });
        statsObserver.observe(statsSection);
    }

    // Testimonials carousel
    (() => {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        const prevBtn = document.getElementById('testimonial-prev');
        const nextBtn = document.getElementById('testimonial-next');

        if (!cards.length) return;

        let current = 0;

        const showCard = (index) => {
            cards.forEach((card, i) => {
                card.classList.remove('active', 'prev');
                if (i === index) {
                    card.classList.add('active');
                } else if (i < index) {
                    card.classList.add('prev');
                }
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        const nextCard = () => {
            current = (current + 1) % cards.length;
            showCard(current);
        };

        const prevCard = () => {
            current = (current - 1 + cards.length) % cards.length;
            showCard(current);
        };

        prevBtn?.addEventListener('click', prevCard);
        nextBtn?.addEventListener('click', nextCard);

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                current = parseInt(dot.getAttribute('data-index'), 10);
                showCard(current);
            });
        });

        showCard(0);
    })();

    // Animate testimonial cards on scroll
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.testimonial-card').forEach(card => {
        testimonialObserver.observe(card);
    });

    // Share Button
    (() => {
        const shareBtn = document.getElementById('share-btn');
        if (!shareBtn) return;

        const toggleVisibility = () => {
            if (window.pageYOffset > 100) {
                shareBtn.classList.add('show');
            } else {
                shareBtn.classList.remove('show');
            }
        };

        const sharePage = async () => {
            const url = window.location.href;
            const title = document.title;
            const text = 'Check out ExamFormTools - Your Exam Application, Simplified!';

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: title,
                        text: text,
                        url: url
                    });
                } catch (err) {
                    // User cancelled share or error occurred
                    console.log('Share cancelled or failed');
                }
            } else {
                // Fallback: copy URL to clipboard
                if (navigator.clipboard) {
                    try {
                        await navigator.clipboard.writeText(url);
                        alert('Link copied to clipboard!');
                    } catch (err) {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = url;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        alert('Link copied to clipboard!');
                    }
                } else {
                    alert('Share not supported on this browser. URL: ' + url);
                }
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        shareBtn.addEventListener('click', sharePage);

        // Initial check
        toggleVisibility();
    })();

    // Move to Top Button
    (() => {
        const moveToTopBtn = document.getElementById('move-to-top-btn');
        if (!moveToTopBtn) return;

        const toggleVisibility = () => {
            if (window.pageYOffset > 100) {
                moveToTopBtn.classList.add('show');
            } else {
                moveToTopBtn.classList.remove('show');
            }
        };

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        window.addEventListener('scroll', toggleVisibility);
        moveToTopBtn.addEventListener('click', scrollToTop);

        // Initial check
        toggleVisibility();
    })();
    });
});
