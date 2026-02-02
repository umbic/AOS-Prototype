# AgencyOS Prototype - Claude Code Instructions

## Project Overview

AgencyOS is an agency workflow management platform prototype built with Next.js 14, TypeScript, and Tailwind CSS. It demonstrates an AI-agent-powered workflow system for creative agencies.

**Live URL:** https://aos-prototype.vercel.app
**GitHub:** https://github.com/umbic/AOS-Prototype

## Design Philosophy

**This isn't a dashboard you check. It's a workspace you inhabit.**

The system knows you, knows your projects, and meets you where you are. It's less "here's your data" and more "here's what we should do together today."

**Mental model:** A really good co-worker who already did the prep work and is ready to brief you.

### Key Principles
- **Briefing-first** — Today page reads like a newspaper, not a dashboard
- **Dotti is the AI** — Green dot in corner is the chat interface (named "Dotti")
- **Single client focus** — Prototype assumes Google as the only client
- **Flat sidebar** — Projects and Workflows are top-level sections (no nesting)
- **Workflows are horizontal** — Flow left-to-right, snake/wrap when needed
- **Decision steps are distinct** — Human decision points have amber highlighting and lock icons
- **Task pages are workspaces** — Structured briefings, not chat bubbles

## Current Architecture (Feb 2026)

### Page Types

| Page | Layout | Description |
|------|--------|-------------|
| Today | MainLayout | Newspaper-style daily brief with Decisions section |
| Task Detail | TaskLayout | Structured AI briefing |
| Decision Step | Custom layout | Full decision interface with approve/changes/consult |
| Creative Canvas | TaskLayout + custom | Full concept review workspace |
| Workflow Detail | MainLayout | Horizontal workflow map with step panels |
| Workflow Library | MainLayout | Browse and preview workflow templates |
| Project Setup | MainLayout | 3-step wizard (basics, workflows, agents) |
| Other pages | MainLayout | Standard sidebar layout |

### Layout Components

| Component | Width | Use Case |
|-----------|-------|----------|
| `Sidebar` | 240px | Flat sidebar with Projects + Workflows sections |
| `SidebarThin` | 64px | Icon-only sidebar for task pages |
| `TaskContextSidebar` | 288px | Right rail with project context |
| `MainLayout` | — | Sidebar + content + Dotti |
| `TaskLayout` | — | Thin sidebar + content + context rail + Dotti |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Deployment:** Vercel

## Brand Guidelines

| Element | Value |
|---------|-------|
| Primary Green | `#86BC24` |
| Dark Green | `#6B9A1D` |
| Black | `#000000` |
| White | `#FFFFFF` |
| Warm Background | `#FAF9F7` |

## Project Structure

```
/app
  /today                    # Home - newspaper-style daily brief
  /today/[id]               # Task detail - structured AI briefing
  /project/[id]             # Project overview
  /project/[id]/creative/[conceptId]  # Creative Canvas
  /projects/new             # Project setup wizard (3 steps)
  /workflow/[id]            # Workflow detail (horizontal map)
  /workflow/[id]/step/[stepId]  # Decision step view
  /workflow-library         # Browse workflow templates
  /agents                   # Agent store
  /calendar                 # Calendar view
  /team                     # Team management
  /settings                 # Settings

/components
  /layout
    sidebar.tsx             # Full sidebar (flat: Projects + Workflows)
    sidebar-thin.tsx        # Icon-only sidebar (64px)
    main-layout.tsx         # Standard layout with full sidebar
    task-layout.tsx         # Task page layout with context rail
    task-context-sidebar.tsx # Right rail for task pages
  /workflow
    workflow-map.tsx        # Horizontal workflow visualization
    step-summary-panel.tsx  # Panel for completed steps
    step-preview-panel.tsx  # Panel for upcoming steps
    workflow-template-preview.tsx  # Template preview in library
  /today
    decision-card.tsx       # Decision card with priority dot
    decisions-section.tsx   # "Decisions Waiting on You" section
  /cards
    workflow-template-card.tsx  # Template card for library
  /chat
    chat-panel-slide.tsx    # Slide-out chat panel (Dotti)

/lib
  data.ts                   # All mock data
  types.ts                  # TypeScript interfaces
  utils.ts                  # Utility functions

/public
  /avatars
    kenny.jpg               # Kenny's profile picture
```

## Mock Data

All sample data is in `/lib/data.ts`:
- **User:** Kenny (Strategy Lead) with profile picture
- **Client:** Google (single client, hardcoded)
- **Projects:** March Madness, Holiday Campaign, Q2 Brand Refresh
- **Agents:** 24 agents across Strategy, Creative, Media, Operations
- **Workflows:** 4 active workflows with horizontal step display
- **Workflow Templates:** 11 reusable templates (Campaign, Content, Analysis, Operations)
- **Decisions:** 2 pending decisions blocking workflows
- **Docket Items:** 5 tasks with contextual AI briefings
- **Creative Concepts:** 4 concepts for March Madness

## Commands

```bash
npm run dev          # Start development server
npx tsc --noEmit     # Fast TypeScript check (use this!)
git push             # Triggers Vercel deploy
```

## Session Workflow

1. **Read `HANDOFF.md` first** — Contains current state and recent changes
2. **Check `error-log.md`** — Learn from past mistakes
3. **Use TypeScript check** — `npx tsc --noEmit` is faster than build
4. **Push to git** — Vercel handles deployment, test on live site

## Before Editing Components

1. **Read the file first** — Write tool requires reading first
2. **Grep for usages** — Check what props are used before changing interfaces
3. **Search for ALL instances** — A pattern may appear in multiple files
4. **Update all usages together** — Don't leave TypeScript errors

## Key Design Rules

### Sidebar (Single Client)
- "Current client: Google" label below logo
- Projects listed directly (flat, not nested)
- Workflows listed directly (flat, not nested)
- No client hierarchy or accordion

### Workflows
- Always horizontal, never vertical
- Use arrow connectors between steps
- Wrap/snake to next line when needed
- Completed steps have green connectors
- Human decision steps have amber highlighting + lock icon
- Click completed → summary panel, click upcoming → preview panel
- Click current decision → navigate to decision step view

### Decision Steps
- Full-page decision interface at `/workflow/[id]/step/[stepId]`
- "What needs your decision" card from agent
- "Materials to review" list with open buttons
- Three choices: Approve, Request changes, Consult agent
- Context sidebar with workflow progress

### Task Pages
- Use `TaskLayout` (thin sidebar + context rail)
- Structured briefing, not chat bubbles
- "My Recommendation" panel with expandable options
- Action buttons at bottom

### Creative Canvas
- Toolbar at top (navigate, zoom, annotate, compare)
- Canvas area shows concept details
- Right rail has approval status and actions
- Compare mode for side-by-side review

## Notes

- This is a **prototype** — functionality is simulated with mock data
- AI responses are contextual but predefined (no real AI backend)
- Designed for desktop; mobile responsiveness is limited
- Dotti (green dot) is always present in bottom-right corner
- Single client (Google) — no multi-client UI complexity
- See `/error-log.md` for session mistakes to avoid
