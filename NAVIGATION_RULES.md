# Правила адаптивной навигации LOVII

## Обзор брейкпоинтов

| Брейкпоинт | Диапазон | Устройство |
|------------|----------|------------|
| Desktop Large | ≥ 1440px | Десктопы, большие мониторы |
| Desktop Small / Tablet Landscape | 1024–1439px | Маленькие десктопы, планшеты в альбомной ориентации |
| Tablet Portrait | 768–1023px | Планшеты в портретной ориентации |
| Mobile | ≤ 767px | Телефоны |

---

## Компоненты навигации

| Компонент | Описание |
|-----------|----------|
| **Header** | Шапка сайта: логотип, статус-бар, действия (тема, ссылки) |
| **Burger (header-hamburger)** | Кнопка ☰ в хедере, открывает Drawer |
| **Floating Nav** | Плавающая вертикальная навигация справа (якоря страницы) |
| **Mobile Nav** | Фиксированная нижняя панель навигации (mobile-first) |
| **Drawer** | Боковое меню (slide-in справа), полное меню навигации |
| **Mobile Nav List** | Контейнер пунктов в Mobile Nav (`#mobile-nav-list`) |

---

## Правила отображения по брейкпоинтам

### 1. Header (всегда виден)
- **Все брейкпоинты**: логотип, статус-бар, theme-toggle
- **≥ 1024px**: header-link (Документация), header-badge, theme-toggle, **burger (только 1024–1439px)**
- **≤ 768px**: theme-toggle, **mobile-more-toggle** (кнопка "Ещё" в mobile nav)

### 2. Burger Menu (header-hamburger)
| Брейкпоинт | Видимость | Действие |
|------------|-----------|----------|
| ≥ 1440px | **Скрыт** (`display: none`) | — |
| 1024–1439px | **Виден** (`display: flex`) | Открывает Drawer |
| ≤ 768px | **Скрыт** | — |

**Почему:** На ≥1440px хватает места для всех элементов в хедере. На 1024–1439px заголовок "ломается" — burger спасает. На мобиле используется Mobile Nav.

### 3. Floating Nav (плавающая навигация справа)
| Брейкпоинт | Видимость |
|------------|-----------|
| ≥ 769px | **Видна** (`display: flex`) — вертикальные якоря страницы |
| ≤ 768px | **Скрыта** (`display: none !important`) |

### 4. Mobile Nav (фиксированная нижняя панель)
| Брейкпоинт | Видимость | Содержимое |
|------------|-----------|------------|
| ≥ 769px | Скрыта (`display: none !important`) | — |
| ≤ 768px | **Видна** (`display: flex`) | 3 ключевых пункта + кнопка "Ещё" |

**Правило содержимого Mobile Nav:**
- Всегда 4 элемента: **Главная**, **Стратегия**, **Презентация**, **Ещё** (кнопка `#mobile-more-toggle`)
- Кнопка "Ещё" открывает полный Drawer (11 пунктов)
- На 375px/768px всегда `display: flex`, `justify-content: space-around`

### 5. Drawer (боковое меню)
- **Открывается**: через burger (1024–1439px) или кнопку "Ещё" в Mobile Nav (≤768px) или `#drawerToggle` в Desktop Drawer
- **Закрывается**: клик по оверлею, кнопка ✕, клик по пункту меню, Escape
- **Содержимое**: 11 пунктов в 4 секции (Главное, О проекте, Документация, Связь)
- **Ширина**: 85vw, макс. 320px, высота 100vh
- **Анимация**: `transform: translateX(100%)` → `translateX(0)` за 0.35s

### 6. Desktop Drawer (drawerToggle в мобильной навигации на десктопе)
- Виден только в Mobile Nav (`#mobile-nav-list`) как последний пункт "Меню"
- Дублирует функцию burger на десктопе

---

## Правила переключения табов в презентации

| Таб | Префикс | Кол-во слайдов |
|-----|---------|----------------|
| General | `general` | 13 |
| Investor | `investor` | 15 |
| Supplier | `supplier` | 12 |

- Активный таб: `.tab-btn.active`
- Слайды загружаются лениво: `../pdf_images/{prefix}-{01..NN}.png`
- Модалка: клик по слайду → открытие, навигация ‹/›, ←/→, Escape

---

## CSS-переменные (site.css)

```css
:root {
  --overlay-bg: rgba(0, 0, 0, 0.3);
  --drawer-bg: rgba(255, 255, 255, 0.95);
  --drawer-border: rgba(13, 148, 136, 0.12);
  --drawer-shadow: -8px 0 40px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --overlay-bg: rgba(0, 0, 0, 0.5);
  --drawer-bg: rgba(30, 41, 59, 0.95);
  --drawer-border: rgba(255, 255, 255, 0.06);
  --drawer-shadow: -8px 0 40px rgba(0, 0, 0, 0.3);
}
```

---

## JavaScript (app.js / navigation.js)

### app.js — initDrawer()
- Тогглеры: `#drawerToggle`, `#header-hamburger`, `#mobile-more-toggle`
- Workaround для CSS cascade bug: `overlay.style.setProperty('display', 'block', 'important')`

### navigation.js — buildDrawer() + buildMobileNav()
- Единый источник `drawerMenu` для Drawer и Mobile Nav
- Автоматические относительные пути через `depth` / `prefix`
- Active state на основе `window.location.pathname`

---

## Чек-лист проверки (Definition of Done)

### Desktop (≥1440px)
- [ ] Burger скрыт
- [ ] Floating nav видна
- [ ] Mobile nav скрыта
- [ ] Drawer не доступен (нет триггера)

### Desktop Small (1024px)
- [ ] Burger видна
- [ ] Floating nav видна
- [ ] Mobile nav скрыта
- [ ] Клик по burger → Drawer открывается (320px, slide-in)
- [ ] Drawer закрывается: оверлей, ✕, пункт меню, Escape

### Tablet (768px)
- [ ] Burger скрыта
- [ ] Floating nav скрыта
- [ ] Mobile nav: `display: flex`, 4 элемента (3 пункта + "Ещё")
- [ ] Клик "Ещё" → Drawer открывается
- [ ] Mobile nav items кликабельны

### Mobile (375px)
- [ ] Burger скрыта
- [ ] Floating nav скрыта
- [ ] Mobile nav: 4 элемента, `justify-content: space-around`
- [ ] "Ещё" открывает Drawer
- [ ] Нет горизонтального скролла

### Презентация
- [ ] 3 таба: General (13), Investor (15), Supplier (12)
- [ ] Слайды загружаются из `pdf_images/{prefix}-{01..NN}.png`
- [ ] Клик по слайду → модалка
- [ ] Навигация: ‹/›, ←/→, Escape
- [ ] Табы переключаются, слайды перестраиваются

---

## Известные проблемы / Workarounds

1. **CSS Cascade Bug**: `.drawer-overlay.open { display: block }` не применяется из-за специфичности. Workaround в `app.js`:
   ```js
   overlay.style.setProperty('display', 'block', 'important');
   ```

2. **CSS Syntax**: лишний `}` в `site.css` ломал парсинг — удалён.

3. **DOMContentLoaded**: скрипт презентации имел лишний `}` — исправлен.

---

## Файлы конфигурации

| Файл | Назначение |
|------|------------|
| `css/site.css` | Глобальные стили, переменные, брейкпоинты, drawer, mobile-nav |
| `css/docs.css` | Whitepaper стили (CSS vars, dark theme) |
| `css/home.css` | Home-specific (калькулятор, карусель) |
| `css/presentation.css` | Презентация (слайды, модалка, табы) |
| `css/strategy.css` | Strategy-specific |
| `js/app.js` | Theme, Drawer, Calculator, NavManager |
| `js/navigation.js` | Drawer HTML, Mobile Nav HTML, active state |
| `js/presentation.js` | (не используется, логика в HTML) |

---

## Тестирование

Запуск автотестов:
```bash
cd /Users/best/Projects/lovii_docs/lovii_presentation_clone
python3 test_navigation.py  # (встроенные тесты выше)
```

Ожидаемый результат: **🎉 ALL TESTS PASSED!**
