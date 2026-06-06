// navigation.js — единое меню drawer для всех страниц LOVII
// Автоматически подставляет правильные относительные пути

(function() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    const prefix = depth === 0 ? '' : '../'.repeat(depth);
    
    const icons = {
        home:   '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        compass:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
        monitor:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
        grid:   '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
        users:  '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
        fileText:'<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
        star:   '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        mail:   '<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        file:   '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/><path d="M16 2v6h6"/></svg>',
    };
    
    const drawerMenu = [
        { section: 'Главное', items: [
            { label: 'Главная',       href: prefix + '', icon: 'home' },
            { label: 'Стратегия',     href: prefix + 'strategy/', icon: 'compass' },
            { label: 'Презентация',   href: prefix + 'presentation/', icon: 'monitor' },
        ]},
        { section: 'О проекте', items: [
            { label: 'Эмитент',       href: prefix + '#issuer', icon: 'shield' },
            { label: 'Условия',       href: prefix + '#targets', icon: 'target' },
            { label: 'Продукт',       href: prefix + '#product', icon: 'grid' },
            { label: 'Команда',       href: prefix + '#team', icon: 'users' },
        ]},
        { section: 'Документация', items: [
            { label: 'Решение о выпуске', href: prefix + 'docs/issue-terms/', icon: 'fileText' },
            { label: 'Whitepaper',        href: prefix + 'docs/whitepaper/', icon: 'star' },
            { label: 'Политика рисков',   href: prefix + 'docs/risk-policy/', icon: 'shield' },
        ]},
        { section: 'Связь', items: [
            { label: 'invest@lovii.ru', href: 'mailto:invest@lovii.ru', icon: 'mail' },
            { label: 'Реквизиты',       href: prefix + '#details', icon: 'file' },
        ]},
    ];
    
    // Собираем HTML
    let html = '<button class="drawer-close" id="drawerClose">✕</button>';
    drawerMenu.forEach(group => {
        html += `<div class="drawer-section"><div class="drawer-section-title">${group.section}</div><div class="drawer-items">`;
        group.items.forEach(item => {
            html += `<a href="${item.href}" class="drawer-item">${icons[item.icon]} ${item.label}</a>`;
        });
        html += '</div></div>';
    });
    
    // Обновляем drawer
    const sheet = document.querySelector('.drawer-sheet');
    if (sheet) {
        sheet.innerHTML = html;
        
        // Перепривязываем close (старая кнопка удалена, нужен новый listener)
        const drawerOverlay = document.getElementById('drawerOverlay');
        const newClose = document.getElementById('drawerClose');
        
        function closeDrawer() {
            if (drawerOverlay) drawerOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
        
        if (newClose) {
            newClose.addEventListener('click', closeDrawer);
        }
        
        // Активная ссылка
        sheet.querySelectorAll('.drawer-item').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('mailto:')) {
                const clean = href.replace(/\.\.\//g, '').replace(/\.\//g, '');
                if (clean && path.includes(clean)) {
                    link.classList.add('active');
                }
            }
            // Закрывать drawer при клике на ссылку
            link.addEventListener('click', function() {
                setTimeout(closeDrawer, 100);
            });
        });
    }
})();

    // Обработчик открытия drawer (inline JS мог перестать работать после замены HTML)
    const drawerToggle = document.getElementById('drawerToggle');
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (drawerToggle && drawerOverlay) {
        // Удаляем старые обработчики (клонированием)
        const newToggle = drawerToggle.cloneNode(true);
        drawerToggle.parentNode.replaceChild(newToggle, drawerToggle);
        
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            drawerOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
        
        drawerOverlay.addEventListener('click', function(e) {
            if (e.target === drawerOverlay) {
                drawerOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

