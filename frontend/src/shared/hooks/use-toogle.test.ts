import { renderHook, act } from '@testing-library/react';
import { useToggle } from './use-toogle';
import { describe, expect, it } from 'vitest';

describe('useToggle', () => {
  it('возвращает значение по умолчанию', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it('переключает значение toggle', () => {
    const { result } = renderHook(() => useToggle());
    act(() => result.current.toggle());
    expect(result.current.value).toBe(true);
  });

  it('устанавливает true', () => {
    const { result } = renderHook(() => useToggle());
    act(() => result.current.setTrue());
    expect(result.current.value).toBe(true);
  });

  it('устанавливает false', () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => result.current.setFalse());
    expect(result.current.value).toBe(false);
  });
});