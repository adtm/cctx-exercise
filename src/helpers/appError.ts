interface IError extends Error {
  status?: number;
}

class AppError {
  constructor(status: number, message: string) {
    const err: IError = new Error(message);
    err.status = status;

    throw err;
  }
}

export default AppError;
