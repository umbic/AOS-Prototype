# AgencyOS Prototype - Claude Code Instructions

## Project Overview

AgencyOS is an agency workflow management platform prototype built with Next.js 14, TypeScript, and Tailwind CSS. It demonstrates an AI-agent-powered workflow system for creative agencies.

**Live URL:** https://aos-prototype.vercel.app
**GitHub:** https://github.com/umbic/AOS-Prototype

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

### Design Principles
- Clean, minimal, lots of white space
- Typography-forward (system communicates through words)
- Professional but contemporary
- Square/rectangular UI elements (minimal border radius)
- Uppercase tracking for labels and buttons
- Strong typography hierarchy

## Project Structure

```
/app                    # Next.js App Router pages
  /today               # Home/Today view
  /today/[id]          # Expanded card view
  /workflow/[id]       # Workflow detail view
  /project/[id]        # Project detail view
  /client/[id]         # Client detail view
  /agents              # Agent store
  /calendar            # Calendar view
  /workflows           # All workflows list
  /team                # Team management
  /settings            # Settings

/components
  /layout              # Sidebar, MainLayout
  /cards               # DocketCard, ProjectCard, AgentCard, etc.
  /canvas              # DataCanvas, CreativeCanvas
  /chat                # ChatPanel
  /workflow            # WorkflowMap, StepDetailPanel

/lib
  /data.ts             # All mock data (users, clients, projects, agents, etc.)
  /types.ts            # TypeScript interfaces
  /utils.ts            # Utility functions (cn, formatDate, etc.)
```

## Key Components

### Layout
- `Sidebar` - Left navigation with collapsible project tree
- `MainLayout` - Main layout wrapper with optional right rail

### Cards
- `DocketCard` - Task items on Today view
- `ProjectCard` - Project display (default/compact variants)
- `AgentCard` - Agent display (grid/inline/detail variants)
- `WorkflowCard` - Workflow with progress indicator
- `SuggestionCard` - Time-aware suggestion (dark style)

### Canvas
- `DataCanvas` - Metrics visualization with insights
- `CreativeCanvas` - Creative concept review with compare mode

### Chat
- `ChatPanel` - Agent conversation with simulated responses

## Mock Data

All sample data is in `/lib/data.ts`:
- **User:** Kenny (Strategy Lead)
- **Client:** Google (with 3 contacts)
- **Projects:** March Madness Campaign, Holiday Campaign, Q2 Brand Refresh
- **Agents:** 20+ agents across Strategy, Creative, Media, Operations, Custom
- **Docket Items:** 5 sample tasks
- **Workflows:** 4 sample workflows with steps

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

The project auto-deploys to Vercel on push to `main`. Manual deploy:

```bash
vercel --prod --yes
```

## When Making Changes

1. **Styling:** Use Tailwind classes. Reference `tailwind.config.ts` for custom values.
2. **Colors:** Always use the Deloitte palette (`deloitte-green`, `neutral-*`, `black`).
3. **Typography:** Use defined font sizes (`text-display-1`, `text-heading-1`, `text-body`, etc.).
4. **Buttons:** Use `btn-primary`, `btn-secondary`, or `btn-outline` classes.
5. **Cards:** Maintain square edges, use `border border-neutral-200` pattern.
6. **Icons:** Import from `lucide-react`.

## Common Patterns

### Section Headers
```tsx
<h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">
  Section Title
</h2>
```

### Status Badges
```tsx
<span className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-deloitte-green text-white">
  Active
</span>
```

### Card Hover
```tsx
className="bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-card-hover transition-all duration-200"
```

### Green Dot Accent
```tsx
<span className="w-2 h-2 bg-deloitte-green rounded-full"></span>
```

## Notes

- This is a **prototype** - functionality is simulated with mock data
- Agent chat responses are randomly selected from predefined arrays
- No backend/database - all data is static
- Designed for desktop; mobile responsiveness is limited
