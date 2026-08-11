# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todo-items`

**Created**: 2026-08-11

**Status**: Draft

**Input**: User description: "Support for overdue todo items so users can identify and distinguish incomplete tasks that are past due and prioritize work quickly."

## Clarifications

### Session 2026-08-11

- Q: Which date boundary should define when a todo becomes overdue? -> A: Use UTC date instead of local date.
- Q: How should overdue items be visually distinguished to ensure accessibility for all users? -> A: Small screens use icon-only; large screens use icon plus text label.
- Q: When a todo crosses from not-overdue to overdue while the list is already open, when should the UI update its overdue status? -> A: Update automatically on a periodic timer and on user actions.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identify overdue tasks at a glance (Priority: P1)

As a todo user, I can immediately see which open tasks are overdue when viewing my todo list.

**Why this priority**: The primary problem is quick detection of late work, and this delivers the core value directly.

**Independent Test**: Can be fully tested by preparing open todos with past and future due dates, loading the list, and confirming overdue items are visually distinguished while non-overdue items are not.

**Acceptance Scenarios**:

1. **Given** an incomplete todo with a due date before today, **When** the user views the todo list, **Then** that todo is shown with an overdue indicator that is visually distinct from normal items.
2. **Given** an incomplete todo with a due date of today or later, **When** the user views the todo list, **Then** that todo is not shown as overdue.
3. **Given** a completed todo with a due date before today, **When** the user views the todo list, **Then** that todo is not shown as overdue.

---

### User Story 2 - Understand overdue status details (Priority: P2)

As a todo user, I can understand why a task is marked overdue and what date caused that status.

**Why this priority**: Clear labeling prevents confusion and helps users trust the prioritization signal.

**Independent Test**: Can be tested by opening a list with overdue items and verifying each overdue item exposes clear due-date context and status wording.

**Acceptance Scenarios**:

1. **Given** an overdue todo, **When** the user reads the item details, **Then** the item clearly communicates it is overdue and references its due date.
2. **Given** an overdue todo, **When** the user updates its due date to today or a future date, **Then** the overdue status is removed immediately on the refreshed view.

---

### User Story 3 - Prioritize work using overdue cues (Priority: P3)

As a todo user, I can use overdue indicators to decide which tasks to handle first.

**Why this priority**: Prioritization is the desired outcome after identification and clear status communication are in place.

**Independent Test**: Can be tested by observing a mixed list of overdue and non-overdue tasks and verifying users can separate urgent tasks quickly.

**Acceptance Scenarios**:

1. **Given** a list containing multiple overdue and non-overdue open todos, **When** the user scans the list, **Then** overdue todos can be distinguished without manually comparing every due date.

---

### Edge Cases

- What happens when a todo has no due date?
- How does the system handle a due date that becomes overdue while the list is open? The item updates to overdue automatically without requiring a page reload.
- What happens when system date or timezone changes between sessions?
- How does the system handle invalid or missing due-date values received from persisted data?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST determine overdue status for each todo using this rule: due date is earlier than the current UTC date and todo is not completed.
- **FR-002**: System MUST display a clear visual overdue indicator for every overdue todo in the main list view.
- **FR-002a**: On small screens, overdue items MUST display an overdue icon indicator.
- **FR-002b**: On large screens, overdue items MUST display an overdue icon plus a visible text label.
- **FR-003**: System MUST NOT display overdue indicators for completed todos, even if their due date is in the past.
- **FR-004**: System MUST NOT display overdue indicators for todos that have no due date.
- **FR-005**: System MUST update overdue status whenever a todo is created, edited, completed, uncompleted, or deleted and on each list refresh.
- **FR-005a**: While a todo list view is open, system MUST re-evaluate overdue status on a periodic interval of at most one minute.
- **FR-005b**: While a todo list view is open, system MUST re-evaluate overdue status after user actions that can affect overdue determination.
- **FR-006**: Users MUST be able to distinguish overdue todos from non-overdue todos without manually comparing due dates.
- **FR-007**: System MUST present due-date context alongside overdue status so users can understand why a todo is overdue.
- **FR-007a**: Overdue indicators MUST remain distinguishable without relying on color alone.
- **FR-008**: System MUST apply overdue status consistently across all views where todo items are listed.

### Key Entities *(include if feature involves data)*

- **Todo Item**: A user task with title, optional due date, completion status, and creation metadata.
- **Overdue Status**: A derived state for a Todo Item indicating the item is incomplete and its due date is before the current date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In validation testing, 100% of todos that are incomplete and past due are displayed as overdue.
- **SC-002**: In validation testing, 0% of completed todos are displayed as overdue.
- **SC-003**: In usability checks with representative users, at least 90% correctly identify overdue tasks within 10 seconds on first view.
- **SC-004**: In regression testing, overdue status updates correctly after create, edit, and completion-state changes in 100% of tested cases.

## Assumptions

- Current date is evaluated using a UTC date boundary across all sessions.
- Existing todo persistence already stores due date and completion status needed for overdue evaluation.
- Overdue identification is limited to visual distinction and does not introduce sorting, filtering, or notifications in this feature.
- The feature applies to existing single-user todo workflows and does not change authentication or user model scope.
