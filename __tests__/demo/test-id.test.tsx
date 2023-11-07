import TestID from '@/demo/components/TestId';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { range } from 'lodash';

describe('Test ID', () => {
  it('renders TestId unchanged', () => {
    const { container } = render(<TestID></TestID>);

    expect(container).toMatchSnapshot();
  });

  it('renders TestId correctly', async () => {
    const user = userEvent.setup();
    render(<TestID></TestID>);

    expect(screen.getByTestId('title')).toHaveTextContent(
      'My Header with Test ID',
    );

    for (const n of range(6)) {
      const card = screen.getByTestId(`card-${n}`);

      expect(within(card).getByTestId(`product-image-${n}`)).toHaveProperty(
        'alt',
        'No Image',
      );
      expect(within(card).getByTestId(`product-title-${n}`)).toHaveTextContent(
        `Title ${n}`,
      );
      expect(within(card).getByTestId(`product-desc-${n}`)).toHaveTextContent(
        `Description ${n}`,
      );
      expect(
        within(card).getByTestId(`product-content-${n}`),
      ).toHaveTextContent(`Content ${n}`);

      await user.click(within(card).getByTestId(`product-details-${n}`));
      expect(screen.getByTestId(`dialog-title-${n}`)).toHaveTextContent(
        'Hey guy!',
      );
      expect(screen.getByTestId(`dialog-desc-${n}`)).toHaveTextContent(
        `The product ID is ${n}`,
      );
      await user.click(screen.getByTestId(`dialog-close-${n}`));
    }
  });
});
