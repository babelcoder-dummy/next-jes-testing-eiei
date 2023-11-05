export const fetchApi = (...[info, init]: Parameters<typeof fetch>) => {
  if (typeof info !== 'string') {
    return fetch(info, init);
  }

  const target = info.startsWith('/') ? info : `/${info}`;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1${target}`, init);
};
