export class NetworkError extends Error {
  constructor() {
    super('Network error');
  }
}

export class SessionExpiredError extends Error {
  constructor() {
    super('Session expired error');
  }
}
