class UnauthorizedError extends Error {
  constructor(message?: string | undefined) {
    super(message);
  }
}

export default UnauthorizedError;
