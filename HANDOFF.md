# AgencyOS Prototype - Handoff Document

## Executive Summary

AgencyOS is a high-fidelity prototype for an AI-agent-powered agency workflow management platform. It demonstrates how creative agencies could leverage specialized AI agents to automate and assist with campaign development, media planning, creative review, and client management.

**Live Demo:** https://aos-prototype.vercel.app
**Repository:** https://github.com/umbic/AOS-Prototype

---

## NEXT SESSION: Implement Approved Design

### What to Build

The design has been approved. Reference file: **`/design-exploration-v4.html`**

Open this HTML file in a browser to see the exact design to implement.

### Implementation Tasks

#### 1. Create New Sidebar Component
**File:** `/components/layout/sidebar.tsx`

Structure:
- Logo: "AgencyOS" + green dot
- Today nav item (active state = green background)
- **PROJECTS** section header
- Expandable client (Google) with chevron
  - Nested projects: March Madness Campaign, Holiday Campaign, Q2 Brand Refresh
- Main nav: Workflows, Calendar, Agent Store, Team
- Bottom section: Settings, User profile (Kenny, Strategy Lead)

Styling:
- Width: 240px
- Background: white
- Border-right: 1px solid #e5e5e5
- Nav items: 14px font, 10px 12px padding, 8px border-radius
- Active state: #86BC24 background, white text
- Projects nested with left padding

#### 2. Create New Main Layout Component
**File:** `/components/layout/main-layout.tsx`

- Flexbox container (sidebar + main content)
- Sidebar on left
- Main content area with warm background (#FAF9F7)
- Dotti button fixed bottom-right (56px, green, white dot inside)

#### 3. Redesign Today Page
**File:** `/app/today/page.tsx`

Structure:
1. **Masthead** (centered)
   - Label: "Your Daily Brief" (11px uppercase, green, letter-spacing)
   - Title: "Good afternoon, Kenny" (32px, font-weight 300)
   - Subtitle: "Monday, February 2 · 5 items on your plate" (14px, gray)
   - Border-bottom: 2px solid black

2. **Lead Story** (centered, padding 40px 0)
   - Red tag: "Needs Attention" (10px uppercase, red on light red bg)
   - Headline: "March Madness timeline at risk" (28px)
   - Description paragraph (15px gray, max-width 560px)
   - Border-bottom: 1px solid #e5e5e5

3. **Columns** (4-column grid, gap 24px)
   - Each item: border-top 1px, h3 (14px 500), p (12px gray)
   - Hover: title turns green

4. **NO chat input** — Dotti handles chat

#### 4. Keep Dotti Chat Panel
The existing `/components/chat/chat-panel-slide.tsx` should work, just ensure it's triggered by the Dotti button in the new layout.

### Design Specs (from design-exploration-v4.html)

| Element | Value |
|---------|-------|
| Sidebar width | 240px |
| Sidebar bg | #FFFFFF |
| Main content bg | #FAF9F7 |
| Max content width | 800px |
| Masthead title | 32px, weight 300 |
| Lead story headline | 28px, weight 400 |
| Column item title | 14px, weight 500 |
| Green (active/accent) | #86BC24 |
| Red (attention tag) | #EF4444 |
| Tag background | #FEF2F2 |

### Files to Delete/Replace

These old components should be replaced:
- `/components/layout/sidebar-minimal.tsx` → Replace with new `sidebar.tsx`
- `/components/layout/main-layout-centered.tsx` → Replace with new `main-layout.tsx`

### Testing

After implementation:
1. Run `npm run build` to check for errors
2. Push to git (triggers Vercel deploy)
3. Test on live site: https://aos-prototype.vercel.app

---

## Previous Context

### Design Exploration Process (Feb 2, 2026)

1. User provided inspiration images (ChatGPT home, Privado Dining)
2. Created 12 initial design explorations (`design-exploration.html`)
3. User liked Magazine/Editorial style (Option L)
4. Created 6 magazine variations without sidebar (`design-exploration-v2.html`)
5. Added sidebar variations (`design-exploration-v3.html`)
6. User approved final design with project hierarchy sidebar (`design-exploration-v4.html`)

### Key Design Decisions

1. **"Dotti" is the AI assistant** — The green dot chat button
2. **No chat on home page** — Home is a briefing, click Dotti to chat
3. **Newspaper/editorial style** — Masthead, lead story, columns
4. **Project hierarchy sidebar** — Clients expand to show projects
5. **Warm background** — #FAF9F7 instead of pure white/gray

---

## Sample Data

### User
- **Kenny** - Strategy Lead

### Client
- **Google** - with contacts Lin Chen, David Park, Rachel Kim

### Projects (under Google)
1. **March Madness Campaign** - Active, 23 days to launch
2. **Holiday Campaign** - Wrapping up, in review
3. **Q2 Brand Refresh** - Early discovery phase

### Docket Items (for Today page)
1. **March Madness timeline at risk** (operational/urgent) — LEAD STORY
2. Review holiday campaign performance (review)
3. Creative concepts ready for March Madness (creative)
4. Prep for 2pm call with Lin (calendar)
5. New audience segment discovered (discovery)

---

## Technical Notes

### Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS 3.4
- Lucide React icons
- Vercel deployment

### Key Files
| File | Purpose |
|------|---------|
| `/lib/data.ts` | All mock data |
| `/lib/types.ts` | TypeScript interfaces |
| `/tailwind.config.ts` | Design tokens |
| `/design-exploration-v4.html` | **Approved design reference** |

---

## Known Limitations

1. **No Mobile Design** - Desktop only
2. **Static Data** - No persistence
3. **Simulated Chat** - Predefined responses
4. **Prototype** - Many buttons are placeholders

---

*Last updated: February 2, 2026*
