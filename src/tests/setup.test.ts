import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock example test
describe('App Setup', () => {
  it('has TypeScript support', () => {
    const greeting: string = 'Hello, Healthcare App!';
    expect(greeting).toBe('Hello, Healthcare App!');
  });

  it('has testing infrastructure', () => {
    const isTestable = true;
    expect(isTestable).toBe(true);
  });
});
