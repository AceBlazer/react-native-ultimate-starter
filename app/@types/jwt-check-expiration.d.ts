declare module 'jwt-check-expiration' {
  export const isJwtExpired: (token: string | null) => boolean;
}
