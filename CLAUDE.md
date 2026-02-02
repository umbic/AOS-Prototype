# AgencyOS Prototype - Claude Code Instructions

## Project Overview

AgencyOS is an agency workflow management platform prototype built with Next.js 14, TypeScript, and Tailwind CSS. It demonstrates an AI-agent-powered workflow system for creative agencies.

**Live URL:** https://aos-prototype.vercel.app
**GitHub:** https://github.com/umbic/AOS-Prototype

## Design Philosophy

**This isn't a dashboard you check. It's a workspace you inhabit.**

The system knows you, knows your clients, knows your projects, and meets you where you are. It's less "here's your data" and more "here's what we should do together today."

**Mental model:** A really good co-worker who already did the prep work and is ready to brief you, and work with you.

### Key Principles
- Conversational, not data-dump
- AI briefs you proactively with recommendations
- Centered layouts with generous whitespace
- Elegant minimal cards (icon + title + one line)
- Green dot chat always available, context-aware
- Horizontal layouts that use screen real estate

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
| Neutral Scale | `#FAFAFA` to `#0A0A0A` |

## Project Structure

```
/app
  /today               # Home - greeting + elegant task cards (grid layout)
  /today/[id]          # Task detail - conversational AI briefing
  /project/[id]        # Project view - status + attention items + progress
  /workflow/[id]       # Workflow detail view
  /client/[id]         # Client detail view
  /agents              # Agent store
  /calendar            # Calendar view
  /workflows           # All workflows list
  /team                # Team management
  /settings            # Settings

/components
  /layout
    sidebar-minimal.tsx      # Simplified sidebar (top-level nav only)
    main-layout-centered.tsx # Centered layout with chat button
  /cards
    elegant-card.tsx         # Minimal card (icon + title + subtitle)
  /chat
    chat-panel-slide.tsx     # Slide-out chat panel (context-aware)

/lib
  /data.ts             # All mock data
  /types.ts            # TypeScript interfaces
  /utils.ts            # Utility functions
```

## Key Components

### Layout
- `SidebarMinimal` - Simplified left nav (Today, Workflows, Calendar, Agents, Team, Settings)
- `MainLayoutCentered` - Centered content area with floating green chat button

### Cards
- `ElegantCard` - Minimal task card with colored icon, title, and one-line subtitle
  - Types: review (blue), creative (amber), discovery (purple), calendar (green), operational (red)

### Chat
- `ChatPanelSlide` - Slide-out panel from right, shows current page context, quick suggestions

## Page Patterns

### Today Page
- Greeting (left-aligned)
- 90-min suggestion (subtle button, expands on click)
- Task cards in 3-column grid

### Project Page
- Back link + title with status on right
- "Needs your attention" cards (2-column grid)
- Progress + Documents side by side

### Task Detail Page
- Minimal header with back link
- AI briefing message (already prepped, gives recommendations)
- Quick action buttons
- Chat input at bottom
- Full conversational experience

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

1. **Philosophy first:** Is this conversational or dashboard-y? Choose conversational.
2. **Layouts:** Use horizontal space, grid layouts, avoid narrow centered columns
3. **Colors:** Deloitte palette (`deloitte-green`, `neutral-*`, `black`)
4. **Cards:** Use `ElegantCard` pattern (icon + title + one line)
5. **Chat:** Green dot always available, context-aware
6. **AI voice:** Proactive, gives recommendations, asks what to focus on

## Common Patterns

### Elegant Card
```tsx
<ElegantCard
  href="/today/task-id"
  title="Review holiday campaign"
  subtitle="Holiday Campaign"
  type="review"
/>
```

### Page Header (left-aligned)
```tsx
<header className="mb-10">
  <h1 className="text-3xl font-semibold text-black">
    Good afternoon, Kenny<span className="text-deloitte-green">.</span>
  </h1>
  <p className="mt-2 text-neutral-400">5 items need your attention</p>
</header>
```

### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <ElegantCard ... />)}
</div>
```

### AI Briefing Message
```tsx
<div className="flex gap-4">
  <div className="w-8 h-8 rounded-full bg-deloitte-green flex items-center justify-center">
    <span className="w-2 h-2 bg-white rounded-full" />
  </div>
  <p className="text-sm text-neutral-700 leading-relaxed">
    I pulled the final numbers... Here's what I found:
  </p>
</div>
```

## Notes

- This is a **prototype** - functionality is simulated with mock data
- AI responses are contextual but predefined (no real AI backend)
- Designed for desktop; mobile responsiveness is limited
- Green dot chat is always present in bottom-right corner
