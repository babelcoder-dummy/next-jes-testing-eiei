import Form from '@/demo/components/Form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  it('renders form correctly', async () => {
    const user = userEvent.setup();
    render(<Form></Form>);

    expect(
      screen.getByRole('heading', {
        name: /my form/i,
      }),
    ).toBeVisible();

    await user.type(screen.getByLabelText('Username'), 'Taylor Swift');
    await user.type(
      screen.getByPlaceholderText('taylor@swift.com'),
      'taylor@swift.com',
    );
    await user.selectOptions(
      screen.getAllByRole('combobox', { hidden: true })[1],
      'male',
    );
    await user.click(screen.getByText('Single'));
    await user.type(
      screen.getByRole('textbox', { name: 'Address' }),
      "1989 (Taylor's version)",
    );
  });

  it('handles validation correctly', async () => {
    const user = userEvent.setup();
    render(<Form></Form>);

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(
      screen.getByText('Username must be at least 2 characters.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Gender must be provided')).toBeInTheDocument();
    expect(
      screen.getByText('Marital status must be provided'),
    ).toBeInTheDocument();
    expect(screen.getByText('Address must be provided')).toBeInTheDocument();
  });
});
