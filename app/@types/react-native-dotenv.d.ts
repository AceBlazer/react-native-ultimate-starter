declare module 'react-native-dotenv' {
  export const REACT_APP_API_URL_DEV: string;
  export const REACT_APP_API_URL_PROD: string;
  export const REACT_APP_API_URL_STAGING: string;
  export const REACT_APP_API_URL_TEST: string;
  export const REACT_APP_ENVIRONMENT:
    | 'development'
    | 'production'
    | 'staging'
    | 'testing';
}
