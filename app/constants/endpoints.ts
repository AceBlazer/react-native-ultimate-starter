/**
 *
 * examples with params
 *
 * getToBuy: (page: number) => `/shop-modules/to-buy?page=${page}`,
 * getModule: (moduleId: number) => `/shop-modules/purchased/${moduleId}`,
 * getLockedCards: (page: number, searchKey?: string) =>
 *   `/live-sessions/locked?page=${page}${
 *     searchKey ? '&cardTitleSearchKey=' + searchKey : ''
 *   }`,
 */

const authAPI = {
  baseEndpoint: '/auth',
  login: '/auth/login',
  refreshToken: '/auth/refresh-token',
};

export const API = {
  auth: authAPI,
};
