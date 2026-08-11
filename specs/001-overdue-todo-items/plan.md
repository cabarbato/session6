# Implementation Plan: Support for Overdue Todo Items

**Branch**: `001-overdue-todo-items` | **Date**: 2026-08-11 | **Spec**: `specs/001-overdue-todo-items/spec.md`

**Input**: Feature specification from `/specs/001-overdue-todo-items/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add an overdue-visibility capability to existing todo flows so users can quickly identify past-due,
incomplete todos. Overdue status is a derived UI concern based on UTC date comparison and existing
todo fields (`dueDate`, `completed`) with no backend schema change. The frontend will compute overdue
state deterministically, refresh it at a maximum one-minute interval while list view is open, and
recompute on all todo-changing actions. Presentation follows clarified responsive behavior: icon-only
on small screens and icon plus text label on larger screens, while remaining distinguishable without
color alone.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: JavaScript (Node.js for backend, React for frontend)

**Primary Dependencies**: React, Express, better-sqlite3, Jest, React Testing Library

**Storage**: In-memory SQLite via better-sqlite3 (existing)

**Testing**: Jest for backend and frontend, React Testing Library for UI behavior

**Target Platform**: Web app in modern desktop/mobile browsers with Node.js API server

**Project Type**: Monorepo web application (React frontend + Express backend)

**Performance Goals**: Overdue indicator updates visible within 60 seconds while list remains open;
list rendering remains responsive for current single-user todo scale

**Constraints**: UTC date boundary for overdue determination; no backend schema changes; no new
filtering/sorting/notification scope; accessibility requires non-color-only distinction

**Scale/Scope**: Single-user todo app, one list-centric UI flow, existing REST endpoints retained

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Gate 1 - Single-Responsibility Modular Design: PASS. Plan keeps overdue logic in focused utility/
  view-model behavior and UI presentation in todo components.
- Gate 2 - Contract-First API and Data Integrity: PASS. Existing todo contract remains intact;
  overdue status is derived from documented fields without API contract breakage.
- Gate 3 - Test-Driven Quality Gates: PASS. Plan includes unit and integration tests for boundary
  rules, responsive presentation, and live status refresh behavior.
- Gate 4 - UX Consistency, Accessibility, and Theming: PASS. Plan defines responsive and
  accessibility-compliant overdue indicators and preserves light/dark theming behavior.
- Gate 5 - Simplicity and Maintainability: PASS. No extra persistence layer, no additional feature
  surface beyond overdue identification.

Post-Design Constitution Re-check: PASS. Phase 0 and Phase 1 artifacts preserve all above gates and
introduce no constitution violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todo-items/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
packages/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   └── services/todoService.js
│   └── __tests__/app.test.js
└── frontend/
    └── src/
        ├── App.js
        ├── App.css
        ├── components/
        │   ├── TodoList.js
        │   ├── TodoCard.js
        │   └── __tests__/
        │       ├── TodoList.test.js
        │       └── TodoCard.test.js
        └── services/todoService.js
```

**Structure Decision**: Use existing web-application monorepo structure. Implement overdue logic in
frontend presentation/state layers while preserving existing backend endpoint contracts and adding test
coverage in both affected frontend component tests and any shared todo behavior tests.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
