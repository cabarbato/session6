# Quickstart: Validate Overdue Todo Items

## Prerequisites

- Node.js and npm installed
- Dependencies installed at repository root
- Feature branch checked out: `001-overdue-todo-items`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start frontend and backend together:

```bash
npm run start
```

## Validation Scenarios

### Scenario 1: Overdue detection uses UTC date boundary

1. Create one incomplete todo with due date set to a day before current UTC date.
2. Create one incomplete todo with due date equal to or after current UTC date.
3. Verify only the past-due incomplete todo shows overdue indicator.

Expected outcome:
- Past-due incomplete todo is overdue.
- Today/future-due incomplete todo is not overdue.

### Scenario 2: Completed todos do not show overdue

1. Toggle an overdue todo to completed.
2. Verify overdue marker disappears.
3. Toggle back to incomplete and verify overdue is recomputed.

Expected outcome:
- Completed items never display overdue state.

### Scenario 3: Responsive indicator behavior

1. View the todo list on a small-screen viewport.
2. Confirm overdue items show icon-only indicator.
3. View the same list on a large-screen viewport.
4. Confirm overdue items show icon plus visible text label.

Expected outcome:
- Small screens: icon-only marker.
- Large screens: icon + text label marker.
- Indicator is not distinguishable by color alone.

### Scenario 4: Live status refresh while view is open

1. Keep list open with a todo near UTC day boundary.
2. Wait for timer interval or perform any todo-changing action.
3. Verify overdue status updates without manual page reload.

Expected outcome:
- Status refresh occurs at interval <= 60 seconds.
- Status refresh also occurs after create/edit/toggle/delete actions.

### Scenario 5: Robust handling of missing/invalid due date

1. Ensure a todo with null due date is present.
2. Include or simulate a todo with invalid due date value.
3. Verify both remain visible and are not marked overdue.

Expected outcome:
- Missing/invalid due dates are treated as non-overdue.

## Test Commands

Run all tests:

```bash
npm test
```

Run frontend tests only:

```bash
npm test --workspace=frontend
```

Run backend tests only:

```bash
npm test --workspace=backend
```

## References

- Spec: `specs/001-overdue-todo-items/spec.md`
- Plan: `specs/001-overdue-todo-items/plan.md`
- Research: `specs/001-overdue-todo-items/research.md`
- Data model: `specs/001-overdue-todo-items/data-model.md`
- Contracts: `specs/001-overdue-todo-items/contracts/`

## Automated Test Coverage

- Overdue derivation logic: `packages/frontend/src/utils/__tests__/overdueUtils.test.js`
- Overdue rendering and accessibility: `packages/frontend/src/components/__tests__/TodoCard.test.js`
- Mixed-list prioritization: `packages/frontend/src/components/__tests__/TodoList.test.js`
- Periodic refresh wiring and action-triggered recomputation: `packages/frontend/src/__tests__/App.test.js`

Last verified: frontend 75/75 tests passing, backend 27/27 tests passing.
