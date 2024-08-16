export const isSuccess = (data: XMLHttpRequest): boolean =>
  data.readyState === XMLHttpRequest.DONE && data.status === 200;
