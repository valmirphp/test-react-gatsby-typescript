declare module 'MyModels' {
  export type Todo = {
    id: string;
    title: string;
    isNew?: boolean;
    isDeleted?: boolean;
  };
}
