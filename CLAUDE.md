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
- **Client hierarchy in sidebar** — Clients expand to show Projects and Workflows
- **Workflows are horizontal** — Flow left-to-right, snake/wrap when needed
- **Task pages are workspaces** — Structured briefings, not chat bubbles
- **No chat input on home** — Click Dotti to chat, home is for briefing

## Current Architecture (Feb 2026)

### Page Types

| Page | Layout | Description |
|------|--------|-------------|
| Today | MainLayout (full sidebar) | Newspaper-style daily brief |
| Task Detail | TaskLayout (thin sidebar + context rail) | Structured AI briefing |
| Creative Canvas | TaskLayout + custom | Full concept review workspace |
| Workflow Detail | MainLayout | Horizontal workflow map |
| Other pages | MainLayout | Standard sidebar layout |

### Layout Components

| Component | Width | Use Case |
|-----------|-------|----------|
| `Sidebar` | 240px | Full sidebar with client/project/workflow hierarchy |
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
  /workflow/[id]            # Workflow detail (horizontal map)
  /agents                   # Agent store
  /calendar                 # Calendar view
  /team                     # Team management
  /settings                 # Settings

/components
  /layout
    sidebar.tsx             # Full sidebar (clients → projects + workflows)
    sidebar-thin.tsx        # Icon-only sidebar (64px)
    main-layout.tsx         # Standard layout with full sidebar
    task-layout.tsx         # Task page layout with context rail
    task-context-sidebar.tsx # Right rail for task pages
  /workflow
    workflow-map.tsx        # Horizontal workflow visualization
  /chat
    chat-panel-slide.tsx    # Slide-out chat panel (Dotti)

/lib
  data.ts                   # All mock data
  types.ts                  # TypeScript interfaces
  utils.ts                  # Utility functions

# Design references (HTML)
/design-exploration-v4.html      # Today page reference
/task-page-exploration-4.html    # Task detail reference (approved)
```

## Mock Data

All sample data is in `/lib/data.ts`:
- **User:** Kenny (Strategy Lead)
- **Client:** Google (with 3 contacts)
- **Projects:** March Madness, Holiday Campaign, Q2 Brand Refresh
- **Agents:** 20+ agents across Strategy, Creative, Media, Operations
- **Docket Items:** 5 tasks with contextual AI briefings
- **Workflows:** 4 workflows with horizontal step display
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

### Sidebar
- Clients section contains both Projects AND Workflows
- Each subsection is collapsible
- No standalone "Workflows" top-level nav

### Workflows
- Always horizontal, never vertical
- Use arrow connectors between steps
- Wrap/snake to next line when needed
- Completed steps have green connectors

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
- See `/error-log.md` for session mistakes to avoid
