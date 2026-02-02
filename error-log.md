# Error Log - AgencyOS Prototype

## Session Feb 2, 2026 (Afternoon)

### 1. Updated Wrong Workflow Display
**What happened:** User asked for horizontal workflows. Updated the task context sidebar but missed the main workflow detail page (`/workflow/[id]`) which uses a completely different component (`WorkflowMap`).

**Impact:** Had to make a second round of edits after user showed screenshot.

**Prevention:** When asked to change a UI pattern, search for ALL instances:
```bash
# Find all workflow-related components
grep -r "workflow" --include="*.tsx" components/ app/
```

---

## Session Feb 2, 2026 (Morning)

### 1. Tried to Write Files Before Reading Them
**What happened:** Attempted to use the Write tool on `sidebar.tsx` and `main-layout.tsx` without reading them first.

**Prevention:** Always use Read tool on any existing file before attempting to Write or Edit it.

---

### 2. Didn't Check for Prop Dependencies Before Changing Component Interface
**What happened:** Changed `MainLayout` to remove the `rightRail` prop without first checking which pages used it.

**Prevention:** Before changing a component's interface:
1. Grep for all usages of the component
2. Check what props are being passed
3. Update all usages in the same edit session

---

### 3. Started Multiple Background Builds Without Monitoring
**What happened:** Launched 3+ background build processes that all ran in parallel.

**Prevention:**
- Use `npx tsc --noEmit` for quick checks (faster than full build)
- Push to git and let Vercel handle builds
- Kill stale processes before starting new ones

---

## Quick Reference

| Mistake | Fix |
|---------|-----|
| Write before Read | Always Read first |
| Change interface without checking usages | Grep for usages first |
| Multiple background builds | Use tsc check, push to Vercel |
| Updated one component but missed others | Search for ALL instances of a pattern |

---

*Keep this file updated each session.*
