/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTPTransport from './HTTPTransport';
import { SinonSpy, spy } from 'sinon';

describe('HTTPTransport', () => {
  let spyHttp: SinonSpy<any>;
  let http: HTTPTransport;

  beforeEach(() => {
    spyHttp = spy(XMLHttpRequest.prototype, 'open');
    http = new HTTPTransport('');
  });

  afterEach(() => {
    spyHttp.restore();
  });

  it('правильно строить путь для метода GET', () => {
    http.get('', { data: { title: '1', page: '2' } });
    expect(spyHttp.firstCall.args[1]).toEqual('title=1&page=2');
  });

  it('правильно строить отображает метод GET', () => {
    http.get('', { data: { title: '1', page: '2' } });
    expect(spyHttp.firstCall.args[0]).toEqual('GET');
  });

  it('правильно строить отображает метод POST', () => {
    http.post('', {});
    expect(spyHttp.firstCall.args[0]).toEqual('POST');
  });

  it('не добавляет параметры в URL в методе  POST', () => {
    http.post('', { data: { title: '1', page: '2' } });
    expect(spyHttp.firstCall.args[1]).toEqual('');
  });

  it('правильно строить отображает метод PUT', () => {
    http.put('', {});
    expect(spyHttp.firstCall.args[0]).toEqual('PUT');
  });

  it('не добавляет параметры в URL в методе  PUT', () => {
    http.put('', { data: { title: '1', page: '2' } });
    expect(spyHttp.firstCall.args[1]).toEqual('');
  });

  it('правильно строить отображает метод DELETE', () => {
    http.delete('', {});
    expect(spyHttp.firstCall.args[0]).toEqual('DELETE');
  });

  it('не добавляет параметры в URL в методе  DELETE', () => {
    http.delete('', { data: { title: '1', page: '2' } });
    expect(spyHttp.firstCall.args[1]).toEqual('');
  });
});
