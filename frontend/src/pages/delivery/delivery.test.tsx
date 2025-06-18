import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Delivery } from './delivery';

describe('Delivery Page', () => {
  it('рендерится без ошибок и соответствует snapshot', () => {
    const { container } = render(<Delivery />);
    expect(container).toMatchSnapshot();
  });
});
