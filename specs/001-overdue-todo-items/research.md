# Research: Support for Overdue Todo Items

## Decision 1: Overdue evaluation uses UTC calendar-date comparison

- Decision: Treat a todo as overdue when `dueDate` is earlier than the current UTC date and the todo is incomplete.
- Rationale: The clarified spec explicitly selected UTC boundary behavior, which avoids locale drift and keeps deterministic results across sessions and clients.
- Alternatives considered:
  - Local-device date comparison: rejected because behavior differs by timezone and device settings.
  - Exact timestamp comparison: rejected because current domain model stores date-style due values and does not require time-of-day semantics.

## Decision 2: Overdue status remains a derived frontend concern

- Decision: Compute overdue state in frontend runtime from existing API fields (`dueDate`, `completed`) without adding new backend fields.
- Rationale: The feature scope is visual identification, existing API already provides required inputs, and constitution favors simple changes without schema expansion.
- Alternatives considered:
  - Persist `isOverdue` in backend: rejected because it duplicates derivable state and creates synchronization risk.
  - Add separate overdue endpoint: rejected because current list endpoint already supplies all necessary data.

## Decision 3: Live overdue refresh runs on bounded interval plus user actions

- Decision: Recompute overdue state at least every 60 seconds while list view is open and after todo-changing actions.
- Rationale: This satisfies clarified requirement for in-session status transitions without expensive constant polling.
- Alternatives considered:
  - Recompute only on reload: rejected because overdue transitions would be stale in long-lived sessions.
  - Recompute only on actions: rejected because time-driven boundary crossings would be missed.
  - Per-second timer: rejected as unnecessary overhead for date-level granularity.

## Decision 4: Responsive and accessible overdue indicator contract

- Decision: Use icon-only overdue marker on small screens, icon plus visible text label on large screens, and ensure distinction does not rely on color alone.
- Rationale: Matches clarification outcomes and aligns with accessibility principle in constitution.
- Alternatives considered:
  - Color-only styling: rejected due to accessibility risk.
  - Text-only marker: rejected due to mobile density constraints.

## Decision 5: Invalid or missing due-date handling

- Decision: Missing or invalid `dueDate` values do not qualify as overdue and should render as non-overdue while preserving normal todo visibility.
- Rationale: Prevents false-positive overdue signaling and supports resilience for legacy or malformed data.
- Alternatives considered:
  - Treat invalid dates as overdue: rejected because this would create noisy urgency signals.
  - Hide invalid-date todos: rejected because it obscures user data and complicates trust.
