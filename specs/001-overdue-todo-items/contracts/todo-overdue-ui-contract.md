# Contract: Overdue Todo Presentation and Behavior

## Scope

Defines externally observable behavior for overdue todo identification in UI and interaction flows.
This contract does not add or change backend endpoint paths.

## Inputs

- Todo list payload items containing:
  - `id`
  - `title`
  - `dueDate` (nullable)
  - `completed`
  - `createdAt`
- Current UTC date at evaluation time.
- Viewport class (small or large screen).

## Overdue Determination Contract

A todo is overdue when all conditions are true:
1. `completed` is false.
2. `dueDate` exists and is valid.
3. `dueDate` is earlier than current UTC date.

## Rendering Contract

For todo items determined overdue:
1. Overdue indicator is visible in todo list/card representation.
2. Small screens: overdue icon is visible.
3. Large screens: overdue icon and visible text label are both shown.
4. Indicator remains distinguishable without relying only on color.
5. Due-date context remains visible to explain overdue status.

For non-overdue items:
1. No overdue indicator is shown.

## Refresh Contract

While list view is open:
1. Overdue status re-evaluates at interval <= 60 seconds.
2. Overdue status re-evaluates after create/edit/toggle/delete actions.

## Error and Data Robustness Contract

1. Missing `dueDate`: treat as non-overdue.
2. Invalid `dueDate`: treat as non-overdue.
3. Todo item remains visible even when due date is invalid.

## API Compatibility Contract

- Existing todo endpoints remain unchanged:
  - `GET /api/todos`
  - `GET /api/todos/:id`
  - `POST /api/todos`
  - `PUT /api/todos/:id`
  - `PATCH /api/todos/:id/toggle`
  - `DELETE /api/todos/:id`
- No new required fields are introduced for this feature.
