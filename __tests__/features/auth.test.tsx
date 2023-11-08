import SignInPage from '@/app/(app)/auth/sign-in/page';
import SignUpPage from '@/app/(app)/auth/sign-up/page';
import { type ProfileWithTokens } from '@/models/auth';
import { useAppStore } from '@/store/store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { signin, signup } from '../api/handlers/auth';
import { setupMockServer } from '../api/server';
import { createCredentials } from '../models/auth';

function itBehavesLikeAuthForm(Component: () => JSX.Element) {
  it('validates form correctly', async () => {
    const user = userEvent.setup();
    render(<Component></Component>);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Invalid email')).toBeVisible();
    expect(
      screen.getByText('String must contain at least 8 character(s)'),
    ).toBeVisible();
  });
}

describe('Auth', () => {
  describe('Sign Up', () => {
    itBehavesLikeAuthForm(SignUpPage);

    it('handles sign up process correctly', async () => {
      const spyOnRequest = jest.fn();
      const credentials = createCredentials();
      const server = setupMockServer(signup({ request: spyOnRequest }));
      const user = userEvent.setup();

      server.listen();
      render(<SignUpPage></SignUpPage>);

      expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeVisible();

      await user.type(screen.getByLabelText('Email'), credentials.email);
      await user.type(screen.getByLabelText('Password'), credentials.password);
      await user.click(screen.getByRole('button', { name: 'Submit' }));

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith(credentials);
      expect(useAppStore.getState().shell.toast).toEqual({
        type: 'Success',
        message: 'Your account has already been created',
      });

      server.close();
    });
  });

  describe('Sign In', () => {
    itBehavesLikeAuthForm(SignInPage);

    it('handles sign in process correctly', async () => {
      const spyOnRequest = jest.fn();
      const spyOnResponse = jest.fn<void, [ProfileWithTokens]>();
      const credentials = createCredentials();
      const server = setupMockServer(
        signin({ request: spyOnRequest, response: spyOnResponse }),
      );
      const user = userEvent.setup();

      server.listen();
      render(<SignInPage></SignInPage>, { wrapper: MemoryRouterProvider });

      expect(screen.getByRole('heading', { name: 'Sign In' })).toBeVisible();

      await user.type(screen.getByLabelText('Email'), credentials.email);
      await user.type(screen.getByLabelText('Password'), credentials.password);
      await user.click(screen.getByRole('button', { name: 'Submit' }));

      expect(mockRouter).toMatchObject({
        pathname: '/products',
      });
      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith(credentials);
      expect(spyOnResponse).toHaveBeenCalledTimes(1);
      expect(useAppStore.getState().auth).toMatchObject({
        isAuthenticated: true,
        token: spyOnResponse.mock.calls[0][0].accessToken,
      });

      server.close();
    });
  });
});
