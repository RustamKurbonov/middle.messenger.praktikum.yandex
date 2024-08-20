export const isSuccess = (data: XMLHttpRequest): boolean =>
  data.readyState === XMLHttpRequest.DONE && data.status === 200;

export const isNoAccess = (data: XMLHttpRequest): boolean =>
  data.readyState === XMLHttpRequest.DONE && data.status === 401;
