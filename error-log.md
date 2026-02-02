# Error Log - Session Feb 2, 2026

## Mistakes Made

### 1. Tried to Write Files Before Reading Them
**What happened:** Attempted to use the Write tool on `sidebar.tsx` and `main-layout.tsx` without reading them first. The tool requires reading a file before writing to it.

**Impact:** Wasted 2 round trips.

**Prevention:** Always use Read tool on any existing file before attempting to Write or Edit it.

---

### 2. Didn't Check for Prop Dependencies Before Changing Component Interface
**What happened:** Changed `MainLayout` to remove the `rightRail` prop without first checking which pages used it. Three pages (agents, calendar, workflow) had TypeScript errors.

**Impact:** Had to track down and fix errors after the fact.

**Prevention:** Before changing a component's interface:
1. Grep for all usages of the component
2. Check what props are being passed
3. Update all usages in the same edit session

---

### 3. Started Multiple Background Builds Without Monitoring
**What happened:** Launched 3+ background build processes that all ran in parallel, consuming resources and making subsequent builds slow.

**Impact:** Builds hung for several minutes; had to manually kill processes.

**Prevention:**
- Use `block: true` for builds to wait for completion
- If running in background, check and kill stale processes before starting new ones
- Monitor with `ps aux | grep "next build"` before launching new builds

---

### 4. Excessive Waiting/Polling on Slow Tasks
**What happened:** Kept polling the build output with `sleep 30` commands multiple times instead of letting it run and moving on.

**Impact:** Wasted time on repeated checks; made the session feel slow.

**Prevention:**
- For builds: Just push to git and let Vercel handle it (per user's workflow)
- If local verification needed, run TypeScript check (`npx tsc --noEmit`) which is faster
- Don't poll more than once; trust the background task notification

---

## Summary

| Mistake | Root Cause | Fix |
|---------|-----------|-----|
| Write before Read | Didn't know tool requirement | Always Read first |
| Prop interface change | Didn't check usages | Grep for usages before changing |
| Multiple builds | No process management | Kill stale processes, use blocking |
| Excessive polling | Impatience | Use faster checks or trust Vercel |

---

*Next session: Apply these learnings. Be faster, check dependencies upfront.*
