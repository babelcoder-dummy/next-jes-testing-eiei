import '@testing-library/jest-dom';
import 'isomorphic-unfetch';
import { useRouter } from 'next-router-mock';

jest.mock('next/navigation', () => ({
  useRouter,
  notFound: jest.fn(),
  redirect: jest.fn().mockImplementation((url) => {
    useRouter().memoryRouter.setCurrentUrl(url);
  }),
  usePathname: () => {
    const router = useRouter();
    return router.asPath;
  },
  useSearchParams: () => {
    const router = useRouter();
    const path = router.query;
    return new URLSearchParams(path);
  },
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
