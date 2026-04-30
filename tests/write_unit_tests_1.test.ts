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
    expect(typeof result.current.toggle).toBe('function');
    expect(typeof result.current.addItem).toBe('function');
    expect(typeof result.current.removeItem).toBe('function');
  });

  it('should open and close the hotbox', () => {
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

  it('should toggle the hotbox state', () => {
    const { result } = renderHook(() => useHotbox());
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isOpen).toBe(false);
  });

  it('should add and remove items', () => {
    const { result } = renderHook(() => useHotbox());
    
    const item1 = { id: '1', label: 'Item 1' };
    const item2 = { id: '2', label: 'Item 2' };
    
    act(() => {
      result.current.addItem(item1);
      result.current.addItem(item2);
    });
    
    expect(result.current.items).toEqual([item1, item2]);
    
    act(() => {
      result.current.removeItem('1');
    });
    
    expect(result.current.items).toEqual([item2]);
  });
});
