import { renderHook, act } from '@testing-library/react';
import { useHotbox } from '../src/hooks/useHotbox';

describe('useHotbox hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHotbox());
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.items).toEqual([]);
    expect(typeof result.current.open).toBe('function');
    expect(typeof result.current.close).toBe('function');
    expect(typeof result.current.setItems).toBe('function');
  });

  it('should toggle open state', () => {
    const { result } = renderHook(() => useHotbox());
    
    act(() => {
      result.current.open();
    });
    
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.close();
    });
    
    expect(result.current.isOpen).toBe(false);
  });

  it('should set items correctly', () => {
    const { result } = renderHook(() => useHotbox());
    const mockItems = [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' }
    ];
    
    act(() => {
      result.current.setItems(mockItems);
    });
    
    expect(result.current.items).toEqual(mockItems);
  });

  it('should handle multiple state changes', () => {
    const { result } = renderHook(() => useHotbox());
    
    act(() => {
      result.current.open();
      result.current.setItems([{ id: '1', label: 'Test' }]);
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(result.current.items).toHaveLength(1);
    
    act(() => {
      result.current.close();
      result.current.setItems([]);
    });
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.items).toHaveLength(0);
  });
});
