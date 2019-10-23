import {} from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type ServiceContext = typeof import('./index').default;
}
