// app.js — тема, drawer open/close, Nav Manager, калькулятор
// ЕДИНЫЙ владелец: theme toggle, drawer open/close, active nav state, calculator

(function() {
    'use strict';
    
    // ============================================================
    // THEME TOGGLE
    // ============================================================
    function initTheme() {
        const toggle = document.querySelector('[data-theme-toggle], .theme-toggle, #theme-toggle');
        if (!toggle) return;
        
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = saved || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', initial);
        
        toggle.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
    
    // ============================================================
    // DRAWER OPEN/CLOSE (ЕДИНСТВЕННОЕ МЕСТО ОТКРЫТИЯ)
    // ============================================================
    function initDrawer() {
        const toggles = document.querySelectorAll('#drawerToggle, #header-hamburger');
        const overlay = document.getElementById('drawerOverlay');
        if (!toggles.length || !overlay) return;

        // Удаляем старые обработчики клонированием (на случай если navigation.js уже повесил)
        toggles.forEach(toggle => {
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
        });

        function openDrawer() {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            document.querySelectorAll('#drawerToggle, #header-hamburger').forEach(btn => {
                btn.setAttribute('aria-expanded', 'true');
            });
        }

        function closeDrawer() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            document.querySelectorAll('#drawerToggle, #header-hamburger').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });
        }

        document.querySelectorAll('#drawerToggle, #header-hamburger').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openDrawer();
            });
        });

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeDrawer();
            }
        });
    }
    
    // ============================================================
    // NAV MANAGER — active state из URL
    // ============================================================
    function initNavManager() {
        const path = window.location.pathname;
        
        // Floating nav
        document.querySelectorAll('.floating-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('mailto:')) {
                const clean = href.replace(/\.\.\//g, '').replace(/\.\//g, '');
                if (clean && path.includes(clean)) {
                    link.classList.add('active');
                }
            }
        });
        
        // Mobile nav
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('mailto:')) {
                const clean = href.replace(/\.\.\//g, '').replace(/\.\//g, '');
                if (clean && path.includes(clean)) {
                    link.classList.add('active');
                }
            }
        });
        
        // Drawer items (уже построены navigation.js, но на всякий случай)
        document.querySelectorAll('.drawer-item').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('mailto:')) {
                const clean = href.replace(/\.\.\//g, '').replace(/\.\//g, '');
                if (clean && path.includes(clean)) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // ============================================================
    // FLOATING NAV — build from headings for dynamic pages (whitepaper)
    // ============================================================
    function initFloatingNavFromHeadings() {
        const floatingNav = document.querySelector('.floating-nav #floating-nav-content');
        const toggle = document.querySelector('.floating-nav #floating-nav-toggle');
        if (!floatingNav) return;

        const headings = document.querySelectorAll('.doc-body h2, .doc-body h3');
        if (!headings.length) return;

        floatingNav.innerHTML = '';
        headings.forEach((h, i) => {
            const id = h.id || `heading-${i}`;
            h.id = id;
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.innerHTML = `<span class="nav-label">${h.textContent}</span>`;
            a.setAttribute('data-level', h.tagName.toLowerCase());
            floatingNav.appendChild(a);
        });

        // Toggle behavior
        if (toggle) {
            toggle.addEventListener('click', () => {
                floatingNav.classList.toggle('open');
                toggle.setAttribute('aria-expanded', floatingNav.classList.contains('open'));
            });
        }

        // Smooth scroll
        floatingNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    floatingNav.classList.remove('open');
                }
            });
        });
    }
    function initCalculator() {
        const input = document.getElementById('store-count');
        if (!input) return;
        
        const gmvEl = document.getElementById('calc-gmv');
        const profitEl = document.getElementById('calc-profit');
        const valuationEl = document.getElementById('calc-valuation');
        if (!gmvEl || !profitEl || !valuationEl) return;
        
        function opexFor(stores) {
            // ступени: 500→40%, 1000→30%, 3000→20%, 5000→15%
            if (stores >= 5000) return 0.15;
            if (stores >= 3000) return 0.20;
            if (stores >= 1000) return 0.30;
            return 0.40;
        }
        
        function calcValuation() {
            const stores = parseFloat(input.value) || 0;
            // база на точку
            const oborotPerStoreYear = 144000 * 12;              // 1 728 000 ₽
            const groupPerStoreYear = 7460 * 12;                 // 89 520 ₽ (доход LOVII-группы)
            const companyShareYear = groupPerStoreYear * 0.40;   // 35 808 ₽ (40% компания+инвестор)
            const opex = opexFor(stores);
            const profitYear = companyShareYear * (1 - opex) * stores;
            const gmv = oborotPerStoreYear * stores;
            const valuation = profitYear * 10;                   // P/E 10×
            
            gmvEl.textContent = Math.round(gmv).toLocaleString('ru-RU') + ' ₽';
            profitEl.textContent = Math.round(profitYear).toLocaleString('ru-RU') + ' ₽';
            valuationEl.textContent = Math.round(valuation).toLocaleString('ru-RU') + ' ₽';
        }
        
        input.addEventListener('input', calcValuation);
        calcValuation();
    }
    
    // ============================================================
    // INIT ALL
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
        initDrawer();
        initNavManager();
        initFloatingNavFromHeadings();
        initCalculator();
    });
})();