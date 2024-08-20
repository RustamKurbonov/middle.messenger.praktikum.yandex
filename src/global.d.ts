/* eslint-disable @typescript-eslint/no-explicit-any */
//TO-DO: Закрыл строкую типизацию пропсов
declare module '*.hbs' {
  const _: (props: Record<string, any>) => string;
  export default _;
}

declare module '*.scss' {
  const _: Record<string, string>;
  export default _;
}

declare module 'src';
