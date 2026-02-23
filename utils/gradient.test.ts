import { describe, expect, it } from 'vitest';
import { getGradientStyle } from './gradient';

describe('gradient utils', () => {
  it('returns brand primary gradient for configured primary token', () => {
    expect(getGradientStyle('from-brand-primary-500 to-brand-primary-600')).toContain('rgb(99, 102, 241)');
  });

  it('keeps backward compatibility for legacy blue token', () => {
    expect(getGradientStyle('from-blue-500 to-blue-600')).toContain('rgb(99, 102, 241)');
  });

  it('falls back to brand primary gradient for unknown token', () => {
    expect(getGradientStyle('from-unknown-500 to-unknown-600')).toContain('rgb(99, 102, 241)');
  });
});
