# Data Model: Support for Overdue Todo Items

## Entity: Todo Item

- Purpose: Represents a user task rendered in list and card views.
- Existing Fields:
  - `id` (integer): Unique identifier.
  - `title` (string, required, max 255): User-visible task name.
  - `dueDate` (string date or null): Optional due date input.
  - `completed` (boolean-like 0/1): Completion status.
  - `createdAt` (timestamp string): Creation ordering field.
- Validation Rules:
  - `title` must be non-empty and <=255 characters.
  - `dueDate` may be null; when present it should be date-parseable.

## Derived Entity: Overdue Status

- Purpose: Computed presentation state used to distinguish past-due open tasks.
- Source Fields: `dueDate`, `completed`, current UTC date.
- Derivation Rule:
  - `isOverdue = (completed is false) AND (dueDate is valid) AND (dueDate < currentUTCDate)`
- Non-overdue Cases:
  - Completed todo.
  - Missing due date.
  - Invalid due date.
  - Due date equal to or later than current UTC date.

## Derived Entity: Overdue Presentation

- Purpose: Defines responsive representation contract for overdue markers.
- Fields:
  - `showOverdueIcon` (boolean)
  - `showOverdueTextLabel` (boolean)
  - `overdueLabelText` (string, e.g., "Overdue")
- Rendering Rules:
  - Small screens: icon shown, visible text label hidden.
  - Large screens: icon shown, visible text label shown.
  - All sizes: indication must not depend solely on color.

## State Transitions

- Open non-overdue -> Open overdue:
  - Triggered by UTC date boundary crossing while view is open, or by data refresh/action results.
- Open overdue -> Open non-overdue:
  - Triggered when due date is edited to today/future or becomes null/invalid.
- Open overdue -> Completed:
  - Triggered by completion toggle; overdue marker removed.
- Completed -> Open overdue/non-overdue:
  - Triggered by uncomplete action; overdue recomputed by UTC rule.

## Consistency and Update Triggers

- Recompute overdue state on:
  - Initial list load.
  - Todo create/edit/toggle/delete actions.
  - Periodic timer while list view is open (interval <= 60 seconds).
