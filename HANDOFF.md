# AgencyOS Prototype - Handoff Document

## Executive Summary

AgencyOS is a high-fidelity prototype for an AI-agent-powered agency workflow management platform. It demonstrates how creative agencies could leverage specialized AI agents to automate and assist with campaign development, media planning, creative review, and client management.

**Live Demo:** https://aos-prototype.vercel.app
**Repository:** https://github.com/umbic/AOS-Prototype

---

## February 2026 Redesign

### Design Philosophy Shift

**Before:** Dashboard-style UI ("here's your data organized in sections")
**After:** Conversational workspace ("here's what we should do together today")

**Mental model:** A really good co-worker who already did the prep work and is ready to brief you, and work with you.

### What Changed

#### New Components Created

| Component | Path | Purpose |
|-----------|------|---------|
| `SidebarMinimal` | `/components/layout/sidebar-minimal.tsx` | Simplified sidebar (top-level nav only, no project tree) |
| `MainLayoutCentered` | `/components/layout/main-layout-centered.tsx` | Centered layout with floating green chat button |
| `ElegantCard` | `/components/cards/elegant-card.tsx` | Minimal card (icon + title + one line) |
| `ChatPanelSlide` | `/components/chat/chat-panel-slide.tsx` | Slide-out chat panel from right, context-aware |

#### Pages Redesigned

| Page | Changes |
|------|---------|
| `/today` | Grid layout for cards, left-aligned greeting, subtle 90-min suggestion button |
| `/today/[id]` | Full conversational AI briefing with quick actions, chat input at bottom |
| `/project/[id]` | Horizontal layout, attention cards grid, progress + docs side by side |

#### Key Design Decisions

1. **Green dot = contextual chat** — Always available, knows where you are in the app
2. **Cards are minimal** — Icon + title + one line (no tags, time estimates, agent pills)
3. **AI briefs you first** — Opens with recommendations, not raw data
4. **Horizontal layouts** — Use screen real estate, 2-3 column grids
5. **90-min suggestion tucked away** — Subtle button, expands on click

### Pages Still Using Old Layout

These need updating to match the new design:
- `/app/agents/page.tsx`
- `/app/calendar/page.tsx`
- `/app/workflows/page.tsx`
- `/app/workflow/[id]/page.tsx`
- `/app/team/page.tsx`
- `/app/settings/page.tsx`
- `/app/client/[id]/page.tsx`

### AI Briefing Content

Each task has contextual briefings in `getBriefingMessage()`:

| Task | Briefing Summary |
|------|------------------|
| holiday-metrics-review | ROAS results, TikTok win, recommendation for client narrative |
| march-madness-concepts | 4 concepts overview, which to present |
| audience-discovery | New segment found, why interesting, test recommendation |
| lin-call-prep | What she'll ask, watch-outs, documents ready |
| timeline-risk | The issue, what's at risk, 3 options |

---

## Original Build (Pre-Redesign)

### Core Screens

| Screen | URL | Description |
|--------|-----|-------------|
| **Today View** | `/today` | Daily dashboard with prioritized task docket |
| **Expanded Card** | `/today/[id]` | Task detail with canvas, agent attribution, chat |
| **Workflow View** | `/workflow/[id]` | Visual workflow map with step details |
| **Project View** | `/project/[id]` | Project hub with workflows, documents, team |
| **Client View** | `/client/[id]` | Client profile with projects and contacts |
| **Agent Store** | `/agents` | Browse and configure AI agents |
| **Calendar** | `/calendar` | Weekly calendar with meeting prep |
| **Workflows** | `/workflows` | All workflows across projects |
| **Team** | `/team` | Team member management |
| **Settings** | `/settings` | User preferences |

### Key Features Demonstrated

1. **AI Agent System**
   - 20+ specialized agents across Strategy, Creative, Media, Operations
   - Custom agent creation capability
   - Agent attribution on tasks
   - Conversational chat with contextual responses

2. **Workflow Management**
   - Visual node-based workflow maps
   - Step-by-step progress tracking
   - Agent and human task assignments

3. **Canvas System**
   - **Data Canvas:** Metrics visualization, KPI cards
   - **Creative Canvas:** Concept review, compare mode

4. **Time-Aware Intelligence**
   - Proactive suggestions based on available time
   - Meeting prep with talking points
   - Timeline risk detection

---

## Technical Implementation

### Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS 3.4** for styling
- **Lucide React** for icons
- **Vercel** for deployment

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      App Router                          │
│  /today  /workflow/[id]  /project/[id]  /agents  etc.   │
├─────────────────────────────────────────────────────────┤
│                     Components                           │
│  Layout │ Cards │ Canvas │ Chat │ Workflow              │
├─────────────────────────────────────────────────────────┤
│                    Data Layer                            │
│  /lib/data.ts (mock data)  │  /lib/types.ts             │
├─────────────────────────────────────────────────────────┤
│                   Design System                          │
│  Tailwind Config  │  Deloitte Brand  │  Custom Classes  │
└─────────────────────────────────────────────────────────┘
```

---

## Brand Implementation

The prototype implements **Deloitte Digital** brand guidelines:

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Deloitte Green | `#86BC24` | Primary accent, CTAs, chat button |
| Black | `#000000` | Text, user messages |
| White | `#FFFFFF` | Backgrounds, cards |
| Neutral 50-950 | Various | UI elements, borders |

### Card Type Colors (New)
| Type | Color |
|------|-------|
| Review | `bg-blue-50 text-blue-500` |
| Creative | `bg-amber-50 text-amber-500` |
| Discovery | `bg-purple-50 text-purple-500` |
| Calendar | `bg-green-50 text-green-600` |
| Operational | `bg-red-50 text-red-500` |

---

## Sample Data

### User
- **Kenny** - Strategy Lead

### Client
- **Google** - with contacts Lin Chen, David Park, Rachel Kim

### Projects
1. **March Madness Campaign** - Active, 23 days to launch
2. **Holiday Campaign** - Wrapping up, in review
3. **Q2 Brand Refresh** - Early discovery phase

### Docket Items
1. Review holiday campaign performance (urgent)
2. Creative concepts ready for March Madness (attention)
3. New audience segment discovered (discovery)
4. Prep for 2pm call with Lin (attention)
5. March Madness timeline at risk (urgent)

---

## File Reference

| File | Purpose |
|------|---------|
| `/lib/data.ts` | All mock data |
| `/lib/types.ts` | TypeScript interfaces |
| `/tailwind.config.ts` | Design tokens, colors |
| `/components/layout/sidebar-minimal.tsx` | New simplified sidebar |
| `/components/layout/main-layout-centered.tsx` | New centered layout with chat |
| `/components/cards/elegant-card.tsx` | New minimal card |
| `/components/chat/chat-panel-slide.tsx` | New slide-out chat |

---

## Known Limitations

1. **No Mobile Design** - Optimized for desktop only
2. **Static Data** - No persistence between sessions
3. **Simulated Chat** - Responses are predefined, not real AI
4. **Partial Redesign** - Some pages still use old layout
5. **Limited Interactivity** - Many buttons are placeholder

---

## Next Steps

1. Update remaining pages to new design (Agents, Calendar, Workflows, Team, Settings)
2. Refine AI briefing content based on feedback
3. Consider mobile responsiveness
4. Add more contextual chat behaviors

---

*Last updated: February 2026*
