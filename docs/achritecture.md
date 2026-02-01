# Persistent — Architecture Overview

## Philosophy
Persistence over intensity.
The system rewards consistency, not punishment.

---

## Frontend Architecture

### Stack
- React
- React Router
- Context API (Auth, Stats)
- Minimal animation hooks
- Zero business logic in UI

### Structure
src/
├── components/      # UI units (Pomodoro, Forms)
├── pages/           # Route-level pages
├── context/         # Global state
├── hooks/           # Reusable logic
├── ui/              # Visual primitives (Dock, Background)
├── styles/
└── services/        # API wrappers

### Key Principles
- Components are dumb
- Pages orchestrate
- Context holds shared truth

---

## Backend Architecture

### Stack
- Node.js
- Express
- Cookie-based auth
- File / DB persistence layer

### Core Rules
- Server decides the day
- Grace window respected
- Overtime never penalized
- Stats are immutable snapshots

---

## Pomodoro Logic
- Pomodoros can exceed daily target
- Only required count advances streak
- Overtime is celebrated separately

---

## Streak Rules
- Daily reset at server midnight
- Sunday allows reduced requirement
- Grace window: 10–15 minutes
- Midnight crossover handled via user choice

---

## Data Safety
- Auth via HTTP-only cookies
- Server timestamps authoritative
- No trust in client clocks

---

## Future Scope
- Avatar rewards
- Shareable stat cards
- Milestone animations