import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Payment } from './payment';

describe('Payment Page', () => {
  it('рендерится без ошибок и соответствует snapshot', () => {
    const { container } = render(<Payment />);
    expect(container).toMatchSnapshot();
  });
});
