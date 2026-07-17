# LOVII — Fact & Parameter Dependency Map

> **Purpose:** Single inventory of every key parameter (tariffs, %, shares, roles, names, domains, colors, dates) and the documents that reference it. This is the foundation for the user's planned "dynamic cross-document linking" system — when one fact changes (e.g. commission 8% → 10%), this map shows exactly which docs must be updated.
>
> **Sources analyzed:**
> - Chats (24 LOVII chats from project `515928be-c9a9-4576-9ab0-e41b11fade96`) → `lovii_summary.md`
> - `PROJECT_CONTEXT.md` v4.0, `PRD_DEMO.md` v4.0, `COMPETITOR_ANALYSIS.md` v1.0, `ARCHITECTURE.md`, `DESIGN.md`, `SCREEN_MAP.md`, `LOVII_APP_AUDIT.md`, `STORES_NEARBY_RESEARCH.md`, `UIUX_BEST_PRACTICES.md`
> - `LOVII_General.pdf` (14p), `LOVII_4Investors.pdf` (15p), `LOVII_4Suppliers.pdf` (13p) — image-based, extracted via OCR
> - `Юридическая_структура_платформы.docx` — legal structure
>
> **Legend:** 🟢 consistent · 🟡 drift/ambiguity · 🔴 contradiction

---

## 1. COMMISSION / TARIFF MODEL

| Parameter | Value | Documents referencing | Status |
|---|---|---|---|
| **Базовая комиссия с чека** | **6%** (PROJECT_CONTEXT, PRD_DEMO, COMPETITOR_ANALYSIS) | PROJECT_CONTEXT.md, PRD_DEMO.md, COMPETITOR_ANALYSIS.md | ⚠️ **УСТАРЕЛО** — см. §12.1: реально 10% (6,5% LOVII + 3,5% банк) |
| **Полная нагрузка (утверждено)** | **10%** с денежной части (0% на баллы) | LOVII_General.pdf p9, LOVII_4Investors.pdf p9, LOVII_4Suppliers.pdf p8, §12.1 | ✅ Canonical (владелец) |
| **Комиссия оператора (юр. структура)** | **6,5%** (10% − 3,5% эквайринг) | Юридическая_структура_платформы.docx §1.2, §4.3, §6.2 | ✅ Чистая доля LOVII в рамках 10% |
| **Сниженная комиссия (PRO)** | **4–7%** | LOVII_General.pdf p9, LOVII_4Investors.pdf p9, LOVII_4Suppliers.pdf p8 | ✅ Consistent across PDFs |
| **Комиссия 0% (порог)** | оборот до **30 000 ₽/мес** | LOVII_General.pdf p9, LOVII_4Investors.pdf p9 | ✅ Consistent |
| **Абонентская плата (PRO)** | **2 990 ₽/мес** (MD) / **2 999 ₽/мес** (PDFs) | PROJECT_CONTEXT.md, PRD_DEMO.md, COMPETITOR_ANALYSIS.md / LOVII_General.pdf p9, LOVII_4Investors.pdf p9, LOVII_4Suppliers.pdf p8 | 🟡 2 990 vs 2 999 |
| **Банковская комиссия (эквайринг)** | **1,5–3,3%** (MD) / **3,5%** (юр. структура + PDFs) | PROJECT_CONTEXT.md, COMPETITOR_ANALYSIS.md / Юридическая_структура.docx / LOVII PDFs | 🟡 1.5–3.3 vs 3.5 |
| **Общая нагрузка на точку** | **~10%** (MD: 6% + эквайринг + абонентка) / **9–10%** (COMPETITOR) | PROJECT_CONTEXT.md, COMPETITOR_ANALYSIS.md | ✅ Consistent internally |
| **Конкуренты (комиссия рынка)** | 15–35% официальная, ~20–45% реальная | COMPETITOR_ANALYSIS.md §4 | ✅ Reference data |

**✅ РЕШЕНО (владелец, §12.1):** Полная нагрузка = **10%** (из них ~6,5% LOVII + ~3,5% банк).
MD-документы с «6%» — **устарели**, подлежат правке при синхронизации. Логика: лучше
стартовать с 10% и потом *опускать* для лидеров, чем поднимать всем при необходимости.

---

## 2. INCOME SPLIT (distribution vs legal — TWO DIFFERENT MODELS)

### 2A. Distribution model (demo / marketplace docs + chats)
```
Компания 40% | Представитель 40% | Амбассадор 20%
```
| Referenced in | PROJECT_CONTEXT.md, PRD_DEMO.md (§3.3), lovii_summary.md (chats) | ✅ Consistent |

### 2B. Legal / food-court model (Юридическая_структура.docx)
```
ТСП (точка) 70% | Арендодатель 20% | Оператор 6,5% | Банк 3,5%
```
| Referenced in | Юридическая_структура_платформы.docx §1.2, §6.2 | ✅ Internal only |

**✅ РЕШЕНО (владелец, §12.2):** 2A — **базовая** схема распределения комиссии LOVII (40/40/20).
2B — **вариация / другая система** (маршрутизация 1000₽ клиента на уровне банка, фудкорт).
Не путать: 2A = кто получает комиссию платформы, 2B = кому уходит платёж клиента.
В КБ держать раздельно: «Distribution split (базовая)» vs «Legal split (фудкорт, вариация)».

---

## 3. ROLES & LADDER

### 3A. Internal representative ladder (chats + PROJECT_CONTEXT + PRD_DEMO)
| Level | Threshold | Income | Docs |
|---|---|---|---|
| **Представитель** | до 30 точек | 40% | PROJECT_CONTEXT, PRD_DEMO §2.3, chats |
| **Мэр** | от 30 точек | 40% + бейдж | PROJECT_CONTEXT, PRD_DEMO §2.3 |
| **Губернатор** | 3+ города × 30+ точек, выручка сети ≥ 15 млн ₽/мес | 40% + все привилегии | PROJECT_CONTEXT, PRD_DEMO §2.3 |
| **Амбассадор** | (external chain) | 20% | PROJECT_CONTEXT, PRD_DEMO §2.4 |
| **Основатель** | top | — | chats (ladder mention) |

> Note: user confirmed ladder changed from `Посланник → Мэр → Губернатор → Амбассадор → Основатель` to `Представитель → Мэр → Губернатор → Амбассадор → Основатель`. The "Посланник" level was dropped.

### 3B. External distribution chain (chats + PRD_DEMO §1)
```
Компания → Амбассадор → Представитель → Партнёр (Точка) → Клиент
```
| Referenced in | PRD_DEMO.md §1, §3.1; lovii_summary.md | ✅ Consistent |

### 3C. PDFs use different terminology
- "Цифровые мэры" = regional managers (LOVII_General p8, LOVII_4Investors p4, p12, p15; LOVII_4Suppliers p12)
- "Микробизнес" = supplier/seller tier
- NO ladder (Представитель/Губернатор/Амбассадор/Основатель) appears in any PDF
- NO "Партнёр (Точка)" role name in PDFs — they say "Микробизнес" / "Поставщики"

**✅ РЕШЕНО (владелец, §12.4):** «Цифровой мэр / региональный менеджер» (PDF) = «Представитель/Мэр»
(MD). Унифицировать под лестницу: **Представитель → Мэр → Губернатор**. Это **цифровые
роли внутри Лови**, без привилегий в реальном мире — только заслуги и поощрения от компании.

---

## 4. EXAMPLE CALCULATIONS (single point)

| Parameter | Value | Source |
|---|---|---|
| Средний чек | **1 200 ₽** | PROJECT_CONTEXT.md, PRD_DEMO.md §3.3 |
| Заказов/день | **4** | PROJECT_CONTEXT.md, PRD_DEMO.md §3.3 |
| Дней/мес | **30** | PROJECT_CONTEXT.md, PRD_DEMO.md §3.3 |
| Выручка точки | **144 000 ₽** | PRD_DEMO.md §3.3 |
| Комиссия (6%) | **8 640 ₽** | PRD_DEMO.md §3.3 |
| Абонентка | **2 990 ₽** | PRD_DEMO.md §3.3 |
| Итого доход с точки | **11 630 ₽** | PRD_DEMO.md §3.3 |
| Компания (40%) | **4 652 ₽** | PRD_DEMO.md §3.3 |
| Представитель (40%) | **4 652 ₽** | PRD_DEMO.md §3.3 |
| Амбассадор (20%) | **2 326 ₽** | PRD_DEMO.md §3.3 |

> ⚠️ These example numbers are computed from 6% commission. If commission moves to 10%, **every derived figure (8 640 → 14 400, 11 630 → 17 390, splits) changes**. This is exactly the "Sisyphean update" the user wants to avoid — ideal candidate for computed/linked fields.

### Governor network example
| Parameter | Value | Source |
|---|---|---|
| Городов | 3 | PRD_DEMO.md §3.3 |
| Точек на город | 30 | PRD_DEMO.md §3.3 |
| Всего точек | 90 | PRD_DEMO.md §3.3 |
| Выручка сети | ~13 млн ₽/мес (≥15 млн с ростом) | PRD_DEMO.md §3.3 |
| Доход представителя (40%) | ~418 680 ₽/мес | PRD_DEMO.md §3.3 |

---

## 5. FINANCIAL TARGETS / METRICS (from PDFs)

| Metric | Value | Source |
|---|---|---|
| Целевая капитализация | **3 млрд ₽** | LOVII_General.pdf p1, LOVII_4Investors.pdf p14 |
| MVP GMV (СМУ, 6 мес) | **> 25 млн ₽** | LOVII_General.pdf p10, LOVII_4Investors.pdf p13 |
| MVP активные пользователи | **> 5 000** (or 25 000 — 🟡 OCR ambiguity) | LOVII_4Investors.pdf p13 |
| MVP точки | **> 30** | LOVII_General.pdf p10, LOVII_4Investors.pdf p13 |
| MVP Loyalty CRM рост | **> 40%** | LOVII_General.pdf p10 |
| Порог масштабирования GMV | **> 5 млн ₽/мес** | LOVII_General.pdf p12, LOVII_4Investors.pdf p12 |
| Порог масштабирования поставщики | **> 50** | LOVII_General.pdf p12, LOVII_4Investors.pdf p12 |
| Порог масштабирования Retention | **> 40%** | LOVII_General.pdf p12, LOVII_4Investors.pdf p12 |
| Зрелая локация: точки | **> 200** | LOVII_General.pdf p10, LOVII_4Investors.pdf p13 |
| Зрелая локация: EBITDA | **> 0 / > 20** (🟡 ambiguous) | LOVII_General.pdf p10 |
| Зрелая локация: доля платных тарифов | **> 30%** | LOVII_4Investors.pdf p13 |
| 30-дневный Retention | **> 40%** | LOVII_4Investors.pdf p13 |
| LTV/CAC | **> 3** | LOVII_4Investors.pdf p13 |
| Время оформления заказа | **< 3 минут** | LOVII_4Investors.pdf p13 |
| Первые заказы (ожидание) | **4–5 месяц** | LOVII_4Investors.pdf p15 |
| Онбординг бизнеса | **5 минут** (QR) | LOVII_General.pdf (implied), LOVII_4Investors.pdf p5/p11, LOVII_4Suppliers.pdf p9 |
| Ступень 1 поставщики | **10–20** | LOVII_General.pdf p11, LOVII_4Investors.pdf p12 |

---

## 6. LOYALTY / POINTS MODEL

| Parameter | Value | Source |
|---|---|---|
| Балл = Рубль (фикс. курс) | **1 балл = 1 ₽** | LOVII_General.pdf p5, LOVII_4Suppliers.pdf p5 |
| Начисление баллами | **5%** от покупки | LOVII_General.pdf p5 |
| Ликвидность баллов | **100%** внутри локации | LOVII_General.pdf p5 |
| Баллы не сгорают | да | LOVII_General.pdf p3, LOVII_4Suppliers.pdf p5 |
| Гибридная оплата | рубли + баллы | LOVII_General.pdf p5, LOVII_4Investors.pdf p6 |
| Вывод в рубли | через СБП | LOVII_General.pdf p5, LOVII_4Investors.pdf p6, LOVII_4Suppliers.pdf p7 |
| Внешние сертификаты (Ozon, WB) | будущие релизы | LOVII_4Investors.pdf p6 |

> Note: MD docs (PRD_DEMO) do NOT specify point accrual % or 1:1 peg — only PDFs do. The KB should treat 5% / 1:1 as canonical until contradicted.

---

## 7. DOMAINS / URLS / CONTACTS

| Item | Value | Source | Status |
|---|---|---|---|
| Demo domain | **lovii.mobiap.com** | PRD_DEMO.md, ARCHITECTURE.md, SCREEN_MAP.md | ✅ |
| Live app | **app.lovii.ru** | LOVII_APP_AUDIT.md | ✅ |
| Live API | **api.lovii.ru/api/v1** | LOVII_APP_AUDIT.md | ✅ |
| Partner site (PDF) | **lovii.ru** (General p14) / **partners.lovii.ru** (Suppliers p13 — 🟡 OCR "lovil") | LOVII PDFs | 🟡 verify exact |
| Telegram (General) | **@lovii_partner** | LOVII_General.pdf p14 | ✅ |
| Telegram (Suppliers) | **@lovii_manager** | LOVII_4Suppliers.pdf p13 | 🟡 different handle |
| Chat project_id | `515928be-c9a9-4576-9ab0-e41b11fade96` | chat-export JSON | ✅ |

---

## 8. BRAND COLORS / DESIGN TOKENS

### 8A. Demo design system (DESIGN.md — canonical for demo app)
| Token | Value |
|---|---|
| `--pink` (primary) | `#f64a8a` |
| `--pink-dark` | `#c92a6a` |
| `--tiffany` (secondary) | `#0ABAB5` |
| `--gold` (tertiary) | `#D4A854` |
| `--chiffon` | `#F5E6CC` |
| `--sand` | `#E8D5B7` |
| `--bg` | `#ffffff` |
| `--surface-secondary` | `#F8F8F8` |
| `--text-primary` | `#1a1a1a` |
| `--text-secondary` | `#888888` |
| `--text-dim` | `#bbbbbb` |
| `--success` | `#34D399` |
| Font | Inter (400–800) |
| Card radius | 12px (`--radius-lg`) |
| Bottom nav | 50px height, 4 tabs |

### 8B. Live app (LOVII_APP_AUDIT.md — COMPLETELY DIFFERENT palette)
| Token | Value |
|---|---|
| Brand 500 | `#7e90c2` (muted slate-blue) |
| Brand 600/700/990 | `#7282b0` / `#63729a` / `#0d111b` |
| Accent 500 | `#ef66ff` (magenta) |
| Accent 400/600 | `#f285ff` / `#d95de8` |
| Purple (link) | `#9924ff` |
| Page bg | `#f6f7fa` (light blue-grey) |
| Font | Inter (woff2) |
| Bottom nav | 60px height, 4 tabs |
| Icons | custom icon-font (`icon-*-regular`/`*-fill`) — NOT Tabler SVG |

**✅ РЕШЕНО (владелец, §12.3):** Базовая палитра = **белый фон + французский розовый `#f64a8a`**
(проект `lovii.mobiap.com`). 8A — базовая (canonical). 8B (живая палитра `app.lovii.ru`) —
**НЕ базовая**, отдельная ветка продукта (решение об унификации не срочное, см. §13.1).
Палитра из чатов (терракота) — **устарела**.

---

## 9. LEGAL / COMPLIANCE REFERENCES

| Item | Detail | Source |
|---|---|---|
| ФЗ-54 | онлайн-кассы / фискальные чеки | Юридическая_структура.docx §9, LOVII PDFs |
| ФЗ-161 | НПС / платёжные агенты | Юридическая_структура.docx §6, LOVII PDFs |
| ФЗ-152 | персональные данные | LOVII_4Investors.pdf p8 |
| ФЗ-103 | деятельность платёжных агентов | Юридическая_структура.docx §9.2 |
| Ст. 145 НК РФ | освобождение от НДС до 60 млн ₽/год (с 01.01.2025) | Юридическая_структура.docx §1.1 |
| Ст. 860.1–860.6 ГК РФ | номинальный счёт | Юридическая_структура.docx §7 |
| СБП | вывод баллов / прямые выплаты | LOVII PDFs, Юридическая_структура.docx |
| Рекомендуемые банки | Т-Банк, CloudPayments, ЮKassa, Точка | Юридическая_структура.docx §6.3 |

---

## 10. TECH STACK

| Component | Demo (PRD_DEMO/ARCHITECTURE) | Live app (LOVII_APP_AUDIT) |
|---|---|---|
| Framework | Vanilla HTML/CSS/JS, GitHub Pages | Vue 3 + Vite PWA |
| Routing | Hash-router | Vue Router |
| State | localStorage / mock | Pinia |
| Font | Inter | Inter (woff2) |
| Icons | Tabler SVG `<symbol>` sprites | Custom icon-font |
| Roles in app | Клиент/Партнёр/Представитель/Амбассадор (demo) | **Only Клиент** (no B2B dashboards exist) |
| Auth | mock | Phone + OTP (SMS/WhatsApp/Telegram) |
| Geolocation | — | Gated (Yandex Maps) |

**🔴 GAP:** Live app has NO partner/rep/ambassador dashboards. Demo designs them from scratch. The KB should flag this as "not yet built".

---

## 11. CROSS-DOCUMENT DEPENDENCY EDGES (for dynamic linking)

When **X** changes, these docs must update:

1. **Commission % (6% ↔ 10%)**
   → PROJECT_CONTEXT.md, PRD_DEMO.md (§2.2, §3.2, §3.3 example), COMPETITOR_ANALYSIS.md (§4.3), LOVII PDFs, Юридическая_структура.docx (§1.2, §4.3, §6.2)
   → Derived: all example calculations in PRD_DEMO §3.3

2. **Subscription (2 990 ↔ 2 999 ₽)**
   → PROJECT_CONTEXT.md, PRD_DEMO.md, COMPETITOR_ANALYSIS.md, LOVII PDFs

3. **Split % (40/40/20 vs 70/20/6.5/3.5)**
   → PROJECT_CONTEXT.md, PRD_DEMO.md (distribution) vs Юридическая_структура.docx (legal) — different models, link separately

4. **Brand colors**
   → DESIGN.md (demo) vs LOVII_APP_AUDIT.md (live) — two systems, decide canonical

5. **Roles/ladder terminology**
   → PROJECT_CONTEXT.md, PRD_DEMO.md, lovii_summary.md (chats) vs LOVII PDFs ("Цифровые мэры")

6. **Domains**
   → PRD_DEMO/ARCHITECTURE (lovii.mobiap.com) vs LOVII_APP_AUDIT (app.lovii.ru) vs PDFs (lovii.ru / partners.lovii.ru)

---

## 12. РЕШЕНИЯ ВЛАДЕЛЬЦА (Source of Truth — утверждено 2026-07-17)

> Этот раздел — единственный авторитетный источник. Все остальные секции выше
> показывают, что написано в документах (включая ошибки). При расхождении —
> побеждает то, что ниже.

### 12.1. Комиссия и тариф
| Параметр | Утверждённое значение |
|---|---|
| **Полная нагрузка на точку** | **10%** от суммы заказа (клиент платит, точка несёт) |
| Из них — LOVII (оператор) | **~6,5%** (чистая комиссия платформы) |
| Из них — банк-эквайер | **~3,5%** |
| Абонентская плата (PRO) | **2 990 ₽/мес** |
| Сниженная комиссия (льготы) | **4–7%** — только для лидеров / спец-партнёров, **потом опускаем**, не поднимаем |
| Комиссия 0% | для оборота до **30 000 ₽/мес** |
| Общая нагрузка с подпиской | **~10% + 2 990 ₽/мес** |

> ⚠️ Старые MD-документы (PROJECT_CONTEXT, PRD_DEMO) пишут «6% с чека» — это
> **устарело**. Реальная цифра для клиента = **10%** (с учётом банка). Чистая
> доля LOVII = 6,5%. Нужно поправить MD-документы при синхронизации.

### 12.2. Базовая схема распределения дохода
| Получатель | Доля от комиссии LOVII |
|---|---|
| **Компания (LOVII)** | **40%** |
| **Представитель** | **40%** |
| **Амбассадор** | **20%** |

- Это **базовая** схема. Все прочие (с банком, арендодателем, ТСП 70/20/6,5/3,5 и т.д.)
  — **вариации / другие системы** для отдельных кейсов, НЕ базовая.
- Юридическая схема `ТСП 70% / Арендодатель 20% / Оператор 6,5% / Банк 3,5%`
  (из DOCX) описывает **маршрутизацию 1000₽ клиента на уровне банка**, а НЕ
  распределение комиссии LOVII. Не путать с 40/40/20.

### 12.3. Бренд-палитра (базовая)
| Токен | Значение | Назначение |
|---|---|---|
| Фон | **белый (#ffffff)** | страницы и карточки |
| Акцент | **французский розовый (#f64a8a)** | primary brand accent |
| Доп. акценты | бирюзовый `#0ABAB5`, золото `#D4A854` | вторичные (демо `lovii.mobiap.com`) |

- Базовая палитра = проект **`lovii.mobiap.com`** (демо/актуальный бренд).
- Живая палитра приложения `app.lovii.ru` (сине-серая `#7e90c2` / маджента `#ef66ff`)
  — **НЕ базовая**, это отдельная ветка продукта. Требует решения: унифицировать
  под розовую или оставить как есть.
- Палитра из чатов (терракота `#C97C5D`) — **устарела**, не использовать.

### 12.4. Роли и лестница
- **Цифровой представитель → Мэр → Губернатор** — цифровые роли внутри Лови.
- **Не имеют привилегий в реальном мире.** Значимы и поощряются **только в рамках
  платформы Лови** (заслуги, бейджи, выплаты от компании).
- Внешняя цепочка распространения: `Компания → Амбассадор → Представитель → Партнёр (Точка) → Клиент`.
- Термин «Цифровой мэр / региональный менеджер» из PDF = то же, что «Представитель/Мэр»
  в MD. Унифицировать под: **Представитель (до 30 точек) → Мэр (от 30) → Губернатор
  (3+ города × 30+ точек, выручка сети ≥ 15 млн ₽/мес)**.
- Лестница: `Представитель → Мэр → Губернатор → Амбассадор → Основатель`
  (уровень «Посланник» удалён по решению владельца).

### 12.5. Прочее (подтверждено)
- Баллы: **1 балл = 1 ₽**, не сгорают, вывод через СБП.
- Целевая капитализация: **3 млрд ₽**.
- Онбординг бизнеса: **5 минут** (QR).

---

## 13. OPEN QUESTIONS (остаток — не блокирует построение связей)

1. **Живая палитра `app.lovii.ru`** (сине-серая/маджента) — унифицировать под розовую
   базу или оставить отдельной веткой? (решение не срочное, не влияет на MD-документы)
2. **Точка начисления баллов 5%** прописана только в PDF, в MD отсутствует — добавить
   в PROJECT_CONTEXT при синхронизации.
3. **Активные пользователи MVP**: PDF даёт «>5 000» (OCR-неоднозначно, возможно 25 000) —
   уточнить визуально при необходимости.

---

*Generated by Sisyphus from full document corpus analysis. Решения владельца (§12) —
  единственный source of truth. Next step: проектируем структуру динамической связи
  документов на базе §12.*
