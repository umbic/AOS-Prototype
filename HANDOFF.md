# AgencyOS Prototype - Handoff Document

## Executive Summary

AgencyOS is a high-fidelity prototype for an AI-agent-powered agency workflow management platform. It demonstrates how creative agencies could leverage specialized AI agents to automate and assist with campaign development, media planning, creative review, and client management.

**Live Demo:** https://aos-prototype.vercel.app
**Repository:** https://github.com/umbic/AOS-Prototype

---

## What Was Built

### Core Screens

| Screen | URL | Description |
|--------|-----|-------------|
| **Today View** | `/today` | Daily dashboard with prioritized task docket, time-aware suggestions, and recent projects |
| **Expanded Card** | `/today/[id]` | Task detail with data/creative canvas, agent attribution, workflow progress, and chat |
| **Workflow View** | `/workflow/[id]` | Visual node-based workflow map with step details and agent assignments |
| **Project View** | `/project/[id]` | Project hub with workflows, documents, team, and activity feed |
| **Client View** | `/client/[id]` | Client profile with projects, contacts, and institutional knowledge |
| **Agent Store** | `/agents` | Browse, configure, and assign AI agents by category |
| **Calendar** | `/calendar` | Weekly calendar with meeting prep integration |
| **Workflows** | `/workflows` | All workflows across projects |
| **Team** | `/team` | Team member management |
| **Settings** | `/settings` | User preferences |

### Key Features Demonstrated

1. **AI Agent System**
   - 20+ specialized agents across Strategy, Creative, Media, Operations
   - Custom agent creation capability
   - Agent attribution on tasks (who worked on what)
   - Conversational chat with contextual responses

2. **Workflow Management**
   - Visual node-based workflow maps
   - Step-by-step progress tracking
   - Agent and human task assignments
   - Status indicators (complete, current, upcoming)

3. **Canvas System**
   - **Data Canvas:** Metrics visualization, KPI cards, channel performance, insights markers
   - **Creative Canvas:** Concept review, compare mode, approve/reject workflow

4. **Time-Aware Intelligence**
   - Proactive suggestions based on available time
   - Meeting prep with talking points
   - Timeline risk detection

5. **Client/Project Organization**
   - Hierarchical structure (Client → Projects → Workflows)
   - Document management
   - Activity feeds
   - Team assignments

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

### Data Model

```typescript
User → has access to → Clients
Client → has many → Projects
Project → has many → Workflows, Documents, Team Members
Workflow → has many → Steps
Step → assigned to → User or Agent(s)
DocketItem → links to → Project, Workflow, Agents
```

---

## Brand Implementation

The prototype implements **Deloitte Digital** brand guidelines:

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Deloitte Green | `#86BC24` | Primary accent, success, CTAs |
| Black | `#000000` | Text, secondary buttons, icons |
| White | `#FFFFFF` | Backgrounds |
| Neutral 100-900 | Various | UI elements, borders, text hierarchy |

### Typography
- Strong hierarchy with defined scales
- Uppercase tracking for labels and buttons
- Inter font family

### UI Patterns
- Square/rectangular elements (minimal border radius)
- Clean borders with subtle shadows on hover
- Generous white space
- Green dot accent for brand signature

---

## Sample Data Included

### User
- **Kenny** - Strategy Lead

### Client
- **Google** - with contacts Lin Chen, David Park, Rachel Kim

### Projects
1. **March Madness Campaign** - Active, 23 days to launch
2. **Holiday Campaign** - Wrapping up, in review
3. **Q2 Brand Refresh** - Early discovery phase

### Agents (20+)
- **Strategy:** Audience Insights, Competitive Intel, Brief Writer, Trend Spotter, Messaging Strategist
- **Creative:** Concept Generator, Copywriter, Visual Director, Asset Reviewer, Localization
- **Media:** Media Planner, Budget Optimizer, Analytics, Placement Scout, Attribution
- **Operations:** Timeline Manager, Resource Allocator, Meeting Prepper, Status Reporter, QA, Dashboard, Insights, Knowledge, Presentation
- **Custom:** Google Brand Voice Agent

### Docket Items
1. Review holiday campaign performance (urgent)
2. Creative concepts ready for March Madness (attention)
3. New audience segment discovered (discovery)
4. Prep for 2pm call with Lin (attention)
5. March Madness timeline at risk (urgent)

---

## What's Simulated vs. Real

### Simulated (Mock Data)
- All data is static in `/lib/data.ts`
- Agent chat responses are randomly selected from arrays
- No actual AI/LLM integration
- No database or backend
- No authentication

### Would Need for Production
- Real database (PostgreSQL, MongoDB, etc.)
- Authentication system
- LLM integration for agent responses
- Real-time updates (WebSockets)
- File upload/storage
- Calendar integration (Google, Outlook)
- Notification system
- Mobile responsive design
- Accessibility improvements

---

## How to Continue Development

### Local Setup
```bash
git clone https://github.com/umbic/AOS-Prototype.git
cd AOS-Prototype
npm install
npm run dev
```

### Adding New Features

1. **New Agent Type**
   - Add to `agents` array in `/lib/data.ts`
   - Add response patterns to `ChatPanel` component

2. **New Canvas Type**
   - Create component in `/components/canvas/`
   - Add case to `renderCanvas()` in expanded card view

3. **New Page**
   - Create folder in `/app/[route]/`
   - Add `page.tsx` with component
   - Update sidebar navigation

4. **Styling Changes**
   - Update `tailwind.config.ts` for new design tokens
   - Update `globals.css` for component classes

### Deployment
```bash
git add -A
git commit -m "Description of changes"
git push origin main
# Auto-deploys to Vercel
```

---

## File Reference

| File | Purpose |
|------|---------|
| `/lib/data.ts` | All mock data - modify to change content |
| `/lib/types.ts` | TypeScript interfaces - extend for new features |
| `/tailwind.config.ts` | Design tokens, colors, fonts |
| `/app/globals.css` | Global styles, component classes |
| `/components/layout/sidebar.tsx` | Navigation structure |
| `/components/cards/*.tsx` | Card components |
| `/components/canvas/*.tsx` | Canvas components |
| `/components/chat/chat-panel.tsx` | Agent chat with responses |

---

## Known Limitations

1. **No Mobile Design** - Optimized for desktop only
2. **Static Data** - No persistence between sessions
3. **Simulated Chat** - Responses are random, not contextual
4. **No Real Workflows** - Cannot actually complete tasks
5. **Limited Interactivity** - Many buttons are placeholder

---

## Contact & Resources

- **Vercel Dashboard:** Check deployment logs and analytics
- **GitHub Issues:** Track bugs and feature requests
- **Deloitte Brand:** Reference for any styling questions

---

*Document created: February 2026*
