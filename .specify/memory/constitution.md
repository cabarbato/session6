<!--
Sync Impact Report
- Version change: N/A -> 1.0.0
- Modified principles:
	- [PRINCIPLE_1_NAME] -> I. Single-Responsibility Modular Design
	- [PRINCIPLE_2_NAME] -> II. Contract-First API and Data Integrity
	- [PRINCIPLE_3_NAME] -> III. Test-Driven Quality Gates (NON-NEGOTIABLE)
	- [PRINCIPLE_4_NAME] -> IV. UX Consistency, Accessibility, and Theming
	- [PRINCIPLE_5_NAME] -> V. Simplicity, Reliability, and Maintainability
- Added sections:
	- Delivery Constraints and Scope Boundaries
	- Development Workflow and Review Gates
- Removed sections: None
- Follow-up TODOs: None
-->

# Session6 Constitution

## Core Principles

### I. Single-Responsibility Modular Design
All code units MUST have one clear responsibility and MUST be organized by purpose. Frontend logic
MUST separate reusable components, service access, and styling. Backend logic MUST separate API
configuration, routing concerns, and service/business logic. Naming conventions MUST remain
consistent: `camelCase` for functions/variables, `PascalCase` for React components and classes, and
`UPPER_SNAKE_CASE` for constants. Rationale: clear modular boundaries reduce coupling, improve
readability, and simplify safe refactoring.

### II. Contract-First API and Data Integrity
Todo behavior MUST conform to documented functional requirements before implementation details are
optimized. Core operations MUST preserve the product contract: create, list newest-first, update
status, edit title and due date, and confirmed delete with immediate persistence via the backend API.
Input and output expectations at API boundaries MUST be explicit, validated, and handled with clear
error responses. Rationale: stable contracts prevent regressions and keep frontend and backend behavior
aligned.

### III. Test-Driven Quality Gates (NON-NEGOTIABLE)
Any change to behavior MUST include tests that verify user-observable outcomes. Unit and integration
tests MUST remain independent, deterministic, and descriptive, following Arrange-Act-Assert
structure. The repository MUST maintain at least 80 percent coverage across packages, and critical
todo workflows MUST be fully covered by tests before merge. Bug fixes MUST include a failing test
case first or in the same change set. Rationale: test-first discipline provides reliable change safety
and executable documentation.

### IV. UX Consistency, Accessibility, and Theming
User interface changes MUST preserve the documented design system: spacing rhythm, component
structure, and clear interaction affordances for create, edit, toggle, and delete workflows. All
interactive controls MUST be keyboard accessible, have visible focus states, and meet WCAG AA color
contrast expectations. Dark and light theme behavior MUST be preserved, including saved preference and
system-default initialization. Rationale: consistent and accessible UX is a core product requirement,
not an optional enhancement.

### V. Simplicity, Reliability, and Maintainability
Implementations MUST prefer the simplest solution that satisfies current requirements and MUST avoid
premature abstractions or out-of-scope feature expansion. Common logic MUST be deduplicated through
shared utilities/components where reuse is real and recurring. Error handling MUST be explicit,
user-facing where appropriate, and must not silently fail. Rationale: simple and reliable systems are
easier to maintain, test, and evolve.

## Delivery Constraints and Scope Boundaries

The application remains a single-user todo system with no authentication, collaboration, advanced
filtering, search, bulk operations, categories, reminders, or undo/redo unless requirements are
formally amended. The technical stack MUST remain React frontend plus Express backend within the
existing npm workspace monorepo. Changes that alter core persistence architecture or introduce new
platform concerns require specification updates before implementation.

## Development Workflow and Review Gates

All work MUST be performed on feature branches and merged through pull request review. Commits MUST be
atomic and explain intent. Linting and test checks MUST pass locally before review submission. Code
review MUST verify compliance with this constitution, functional requirements, coding guidelines,
testing guidelines, and UI guidelines. Any intentional deviation MUST be documented in the PR with
justification and an approved follow-up plan.

## Governance

This constitution is the highest-priority engineering governance artifact for this repository. In the
event of conflict, this constitution takes precedence over informal practices. Amendments require:
documented rationale, explicit update to impacted principles or sections, and semantic version bump
selection justified in the change. Versioning policy is: MAJOR for incompatible governance changes,
MINOR for new or materially expanded principles/sections, and PATCH for clarifications that do not
change intent. Compliance is reviewed at PR time and periodically through spec and task audits.

**Version**: 1.0.0 | **Ratified**: 2026-08-11 | **Last Amended**: 2026-08-11
