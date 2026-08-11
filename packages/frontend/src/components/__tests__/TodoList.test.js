import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  const mockTodos = [
    {
      id: 1,
      title: 'Todo 1',
      dueDate: '2025-12-25',
      completed: 0,
      createdAt: '2025-11-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Todo 2',
      dueDate: null,
      completed: 1,
      createdAt: '2025-11-02T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when todos array is empty', () => {
    render(<TodoList todos={[]} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText(/No todos yet. Add one to get started!/)).toBeInTheDocument();
  });

  it('should render all todos when provided', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('should render correct number of todo cards', () => {
    const { container } = render(
      <TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />
    );
    
    const cards = container.querySelectorAll('.todo-card');
    expect(cards).toHaveLength(2);
  });

  it('should pass handlers to TodoCard components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    // Verify that edit buttons exist for each todo
    expect(screen.getAllByLabelText(/Edit/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Delete/)).toHaveLength(2);
  });

  describe('overdue prioritization', () => {
    it('should distinguish overdue todos from non-overdue todos in a mixed list', () => {
      const mixedTodos = [
        { id: 1, title: 'Past due task', dueDate: '2000-01-01', completed: 0, createdAt: '2025-01-01T00:00:00Z' },
        { id: 2, title: 'Future task', dueDate: '2999-01-01', completed: 0, createdAt: '2025-01-02T00:00:00Z' },
        { id: 3, title: 'Completed past due task', dueDate: '2000-01-01', completed: 1, createdAt: '2025-01-03T00:00:00Z' }
      ];

      render(<TodoList todos={mixedTodos} {...mockHandlers} isLoading={false} />);

      expect(screen.getAllByText('Overdue')).toHaveLength(1);
      expect(screen.getByText('Past due task')).toBeInTheDocument();
      expect(screen.getByText('Future task')).toBeInTheDocument();
      expect(screen.getByText('Completed past due task')).toBeInTheDocument();
    });
  });
});
