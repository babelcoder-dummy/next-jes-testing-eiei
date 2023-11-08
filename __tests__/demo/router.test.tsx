import Router from '@/demo/components/Router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

describe('Router', () => {
  it('navigates to target route correctly', async () => {
    const user = userEvent.setup();
    render(<Router></Router>, { wrapper: MemoryRouterProvider });

    await user.click(screen.getByRole('link', { name: 'Go to form' }));
    expect(mockRouter).toMatchObject({
      pathname: '/demo/form',
    });

    await user.click(screen.getByRole('link', { name: 'Go to with query' }));
    expect(mockRouter).toMatchObject({
      pathname: '/demo/form',
      query: { type: 'edit' },
      asPath: '/demo/form?type=edit',
    });

    await user.click(screen.getByRole('button', { name: 'Navigate' }));
    expect(mockRouter).toMatchObject({
      pathname: '/demo/form',
    });
  });
});
