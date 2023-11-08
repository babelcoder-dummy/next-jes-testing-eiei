export const getUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}/v1${path}`;
};
