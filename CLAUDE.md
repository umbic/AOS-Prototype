# AgencyOS Prototype - Claude Code Instructions

## Project Overview

AgencyOS is an agency workflow management platform prototype built with Next.js 14, TypeScript, and Tailwind CSS. It demonstrates an AI-agent-powered workflow system for creative agencies.

**Live URL:** https://aos-prototype.vercel.app
**GitHub:** https://github.com/umbic/AOS-Prototype

## Design Philosophy

**This isn't a dashboard you check. It's a workspace you inhabit.**

The system knows you, knows your clients, knows your projects, and meets you where you are. It's less "here's your data" and more "here's what we should do together today."

**Mental model:** A really good co-worker who already did the prep work and is ready to brief you.

### Key Principles
- **Briefing-first** — Today page reads like a newspaper, not a dashboard
- **Dotti is the AI** — Green dot in corner is the chat interface (named "Dotti")
- **Project hierarchy in sidebar** — Clients expand to show their projects
- **Editorial typography** — Large headlines, clean columns, newspaper feel
- **No chat input on home** — Click Dotti to chat, home is for briefing

## Approved Design Direction (Feb 2026)

### Today Page = "Your Daily Brief"
- **Masthead**: "Your Daily Brief" label, "Good afternoon, Kenny" title, date + item count
- **Lead Story**: Priority item gets a centered hero treatment with red "Needs Attention" tag
- **4-Column Grid**: Other items shown in newspaper-style columns below
- **No chat input** — This is a briefing page, not a chat interface

### Sidebar = Project Hierarchy
Structure (top to bottom):
1. **Logo**: "AgencyOS" + green dot
2. **Today** (nav item, active when on /today)
3. **Projects Section**:
   - Section header: "PROJECTS"
   - Expandable clients (e.g., "Google" with chevron)
   - Nested projects under each client
4. **Main Nav**: Workflows, Calendar, Agent Store, Team
5. **Bottom**: Settings, User profile (avatar + name + role)

### Dotti (Chat)
- Green dot button fixed in bottom-right corner
- Click to open slide-out chat panel
- Context-aware — knows what page you're on
- This is where conversation happens, not on the Today page

## Reference Design

The approved design is in: `/design-exploration-v4.html`

Open this file in a browser to see the exact layout, spacing, and styling to implement.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Deployment:** Vercel

## Brand Guidelines

This prototype follows **Deloitte Digital** brand guidelines:

| Element | Value |
|---------|-------|
| Primary Green | `#86BC24` |
| Dark Green | `#6B9A1D` |
| Black | `#000000` |
| White | `#FFFFFF` |
| Warm Background | `#FAF9F7` |
| Neutral Scale | `#FAFAFA` to `#0A0A0A` |

## Project Structure

```
/app
  /today               # Home - newspaper-style daily brief
  /today/[id]          # Task detail - conversational AI briefing
  /project/[id]        # Project view
  /workflow/[id]       # Workflow detail view
  /client/[id]         # Client detail view
  /agents              # Agent store
  /calendar            # Calendar view
  /workflows           # All workflows list
  /team                # Team management
  /settings            # Settings

/components
  /layout
    sidebar.tsx              # NEW: Project hierarchy sidebar
    main-layout.tsx          # NEW: Layout with sidebar + Dotti
  /cards
    elegant-card.tsx         # Minimal card (icon + title + subtitle)
  /chat
    chat-panel-slide.tsx     # Slide-out chat panel (Dotti)

/lib
  /data.ts             # All mock data
  /types.ts            # TypeScript interfaces
  /utils.ts            # Utility functions

/design-exploration-v4.html  # Reference design (open in browser)
```

## Mock Data

All sample data is in `/lib/data.ts`:
- **User:** Kenny (Strategy Lead)
- **Client:** Google (with 3 contacts)
- **Projects:** March Madness Campaign, Holiday Campaign, Q2 Brand Refresh
- **Agents:** 20+ agents across Strategy, Creative, Media, Operations, Custom
- **Docket Items:** 5 sample tasks with contextual AI briefings
- **Workflows:** 4 sample workflows with steps

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Auto-deploys to Vercel on push to `main`.

## When Making Changes

1. **Reference the design file** — Open `/design-exploration-v4.html` in browser
2. **Briefing, not dashboard** — Today page should feel like a newspaper
3. **Sidebar has project hierarchy** — Clients expand to show projects
4. **Dotti is for chat** — No chat input on home page
5. **Colors:** Deloitte palette, warm background (`#FAF9F7`)
6. **Typography:** Editorial feel, generous spacing

## Session Workflow

1. **Read `handoff.md` first** — Contains current state and next steps
2. **Check `error-log.md`** — Learn from past mistakes
3. **Use TypeScript check before build** — `npx tsc --noEmit` is faster
4. **Push to git for testing** — Vercel handles deployment, test on live site
5. **Don't run multiple builds** — Kill stale processes first

## Before Editing Components

1. **Read the file first** — Write tool requires reading first
2. **Grep for usages** — Check what props are used before changing interfaces
3. **Update all usages together** — Don't leave TypeScript errors

## Notes

- This is a **prototype** - functionality is simulated with mock data
- AI responses are contextual but predefined (no real AI backend)
- Designed for desktop; mobile responsiveness is limited
- Dotti (green dot) is always present in bottom-right corner
- See `/error-log.md` for session mistakes to avoid
