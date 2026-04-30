import { renderHook, act } from '@testing-library/react';
import { useHotbox } from '../src/hooks/useHotbox';

describe('useHotbox hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHotbox());
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.position).toEqual({ x: 0, y: 0 });
    expect(result.current.items).toEqual([]);
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

  it('should update position', () => {
    const { result } = renderHook(() => useHotbox());
    
    const newPosition = { x: 100, y: 200 };
    
    act(() => {
      result.current.setPosition(newPosition);
    });
    
    expect(result.current.position).toEqual(newPosition);
  });

  it('should set items', () => {
    const { result } = renderHook(() => useHotbox());
    
    const items = [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' }
    ];
    
    act(() => {
      result.current.setItems(items);
    });
    
    expect(result.current.items).toEqual(items);
  });
});
