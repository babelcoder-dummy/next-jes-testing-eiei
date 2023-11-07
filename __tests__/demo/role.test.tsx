import Role from '@/demo/components/Role';
import { prettyDOM, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Role', () => {
  it.only('debugs UI', () => {
    render(<Role></Role>);

    const title = screen.getByRole('heading', { name: 'My Header with Role' });
    console.log(prettyDOM(title));
  });

  it('renders Role correctly', async () => {
    const user = userEvent.setup();
    render(<Role></Role>);

    expect(
      screen.getByRole('heading', {
        name: /my header with role/i,
      }),
    ).toBeInTheDocument();

    const cards = screen.getAllByRole('article');
    for (const [n, card] of Object.entries(cards)) {
      expect(within(card).getByRole('img')).toHaveProperty('alt', 'No Image');
      expect(
        within(card).getByRole('heading', { name: `Title ${n}` }),
      ).toBeInTheDocument();
      expect(within(card).getByText(`Description ${n}`)).toBeInTheDocument();
      expect(within(card).getByText(`Content ${n}`)).toBeInTheDocument();

      await user.click(within(card).getByRole('button', { name: 'Details' }));
      expect(screen.getByRole('heading')).toHaveTextContent('Hey guy!');
      expect(screen.getByText(`The product ID is ${n}`)).toBeInTheDocument();
      await user.click(screen.getAllByRole('button', { name: 'Close' })[1]);
    }
  });
});
