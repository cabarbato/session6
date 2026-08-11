# Tasks: Support for Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-todo-items/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Include test tasks to satisfy constitution quality gates and spec success criteria.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- [P]: Can run in parallel (different files, no incomplete-task dependency)
- [Story]: User story label ([US1], [US2], [US3])
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared files needed by all stories.

- [X] T001 Create overdue utility module scaffold in packages/frontend/src/utils/overdueUtils.js
- [X] T002 [P] Create overdue utility test scaffold in packages/frontend/src/utils/__tests__/overdueUtils.test.js
- [X] T003 [P] Add overdue indicator base style placeholders in packages/frontend/src/App.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement core overdue derivation and refresh behavior used by all stories.

**CRITICAL**: Complete this phase before starting user stories.

- [X] T004 Implement UTC date normalization and overdue derivation helpers in packages/frontend/src/utils/overdueUtils.js
- [X] T005 [P] Add unit tests for overdue helper edge cases (completed, null due date, invalid due date, UTC boundary) in packages/frontend/src/utils/__tests__/overdueUtils.test.js
- [X] T006 Integrate overdue derivation into todo fetch/update flow in packages/frontend/src/App.js
- [X] T007 Implement periodic overdue recomputation timer (<=60 seconds) with cleanup in packages/frontend/src/App.js
- [X] T008 [P] Add App-level tests for periodic and action-triggered overdue recomputation in packages/frontend/src/__tests__/App.test.js

**Checkpoint**: Foundation complete; user stories can proceed.

---

## Phase 3: User Story 1 - Identify overdue tasks at a glance (Priority: P1) 🎯 MVP

**Goal**: Users can immediately see which incomplete todos are overdue.

**Independent Test**: Load a mix of past-due, future-due, and completed todos and verify only incomplete past-due todos show overdue state.

- [X] T009 [US1] Add overdue state mapping for todos rendered by list in packages/frontend/src/components/TodoList.js
- [X] T010 [US1] Render overdue indicator container for overdue todos in packages/frontend/src/components/TodoCard.js
- [X] T011 [P] [US1] Add TodoCard tests for overdue shown/hidden and completed exclusion in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T012 [P] [US1] Add TodoList tests for mixed-date overdue visibility in packages/frontend/src/components/__tests__/TodoList.test.js
- [X] T013 [US1] Ensure overdue state refreshes after create/edit/toggle/delete handlers in packages/frontend/src/App.js

**Checkpoint**: User Story 1 works independently and satisfies MVP overdue identification.

---

## Phase 4: User Story 2 - Understand overdue status details (Priority: P2)

**Goal**: Users understand why an item is overdue via due-date context and clear status wording.

**Independent Test**: For overdue items, verify due-date context is visible and large-screen view includes explicit overdue text label.

- [X] T014 [US2] Add explicit overdue text label rendering for large screens in packages/frontend/src/components/TodoCard.js
- [X] T015 [P] [US2] Add responsive CSS rules (small: icon-only, large: icon+label) in packages/frontend/src/App.css
- [X] T016 [US2] Keep due-date context coupled to overdue indicator presentation in packages/frontend/src/components/TodoCard.js
- [X] T017 [P] [US2] Add responsive overdue presentation assertions in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T018 [US2] Add test coverage for due-date edit removing overdue state in packages/frontend/src/__tests__/App.test.js

**Checkpoint**: User Story 2 works independently with clear overdue explanation behavior.

---

## Phase 5: User Story 3 - Prioritize work using overdue cues (Priority: P3)

**Goal**: Users can quickly prioritize overdue work through consistent non-color-only visual cues.

**Independent Test**: Verify all overdue items are distinguishable at a glance across viewport sizes without manually comparing dates.

- [X] T019 [US3] Add non-color visual emphasis styling for overdue cards in packages/frontend/src/App.css
- [X] T020 [US3] Ensure overdue icon semantics/labels remain accessible in packages/frontend/src/components/TodoCard.js
- [X] T021 [P] [US3] Add tests for non-color-only distinguishability signals in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T022 [P] [US3] Add tests for missing/invalid dueDate remaining non-overdue and visible in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T023 [US3] Add end-to-end flow assertions for prioritization scenario in packages/frontend/src/components/__tests__/TodoList.test.js

**Checkpoint**: User Story 3 works independently and supports prioritization outcomes.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation alignment across stories.

- [X] T024 [P] Update quickstart validation notes with final verification steps in specs/001-overdue-todo-items/quickstart.md
- [X] T025 [P] Reconcile UI behavior wording with implemented behavior in specs/001-overdue-todo-items/contracts/todo-overdue-ui-contract.md
- [X] T026 Run frontend and backend test suites and capture pass confirmation in specs/001-overdue-todo-items/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 -> no dependencies.
- Phase 2 -> depends on Phase 1; blocks all user stories.
- Phase 3 (US1) -> depends on Phase 2 completion.
- Phase 4 (US2) -> depends on Phase 2 completion; may build on US1 components.
- Phase 5 (US3) -> depends on Phase 2 completion; may build on US1/US2 presentation.
- Phase 6 -> depends on completion of selected user stories.

### User Story Dependencies

- US1 (P1): No dependency on other stories after foundational work.
- US2 (P2): Uses US1 display structure but remains independently testable.
- US3 (P3): Uses overdue cues from US1/US2 but remains independently testable.

### Within Each User Story

- Implement display/state wiring before finishing scenario tests.
- Complete story-specific tests before declaring story complete.

## Parallel Opportunities

- Phase 1: T002 and T003 can run in parallel after T001.
- Phase 2: T005 and T008 can run in parallel with implementation checkpoints.
- US1: T011 and T012 can run in parallel after T010.
- US2: T015 and T017 can run in parallel after T014.
- US3: T021 and T022 can run in parallel after T020.
- Polish: T024 and T025 can run in parallel before T026.

## Parallel Example: User Story 1

```bash
Task: "T011 [US1] Add TodoCard tests for overdue shown/hidden and completed exclusion in packages/frontend/src/components/__tests__/TodoCard.test.js"
Task: "T012 [US1] Add TodoList tests for mixed-date overdue visibility in packages/frontend/src/components/__tests__/TodoList.test.js"
```

## Implementation Strategy

### MVP First (US1 only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate independent test criteria for US1.
4. Demo/review before moving to US2 and US3.

### Incremental Delivery

1. Deliver US1 (core overdue identification).
2. Add US2 (status explanation and responsive label behavior).
3. Add US3 (prioritization-focused visual clarity).
4. Run polish and full validation.

### Team Parallel Strategy

1. One developer handles foundational utility and App state refresh logic.
2. One developer handles TodoCard/TodoList rendering and responsive CSS.
3. One developer handles test coverage tasks in parallel once render contracts stabilize.

## Notes

- Keep overdue derivation in shared utility to satisfy single-responsibility principle.
- Preserve existing backend API contracts (no endpoint/schema expansion).
- Ensure all overdue cues remain meaningful without relying only on color.
- Keep timer lifecycle safe (create/cleanup) to avoid memory leaks.
