import { messagePath } from 'src/api/constants';
import store from '../store/Store';

export interface Message {
  chat_id: number;
  time: string;
  type: 'pong' | 'message';
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

class MessageSocket {
  socket: WebSocket;

  createWebSocket(userId: string, chatId: string, token: string): void {
    this.socket = new WebSocket(`${messagePath}/${userId}/${chatId}/${token}`);

    this._listenerOpen();
    this._listenerMessages();
    this._listenerWebSocket();
    this._listenerError();
  }

  closeWebSocket(): void {
    if (this.socket) {
      this.socket.close();

      store.set('messages', undefined);
    }
  }

  getMessages(): void {
    this.socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    );
  }

  sendMessage(content: string): void {
    this.socket.send(
      JSON.stringify({
        content,
        type: 'message',
      })
    );
    this.getMessages();
  }

  _listenerError(): void {
    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as Event & { message: string }).message);
    });
  }

  _listenerOpen(): void {
    this.socket.addEventListener('open', () => {
      this.getMessages();

      const heartbeat = (): void => {
        this.socket.send(
          JSON.stringify({
            type: 'ping',
          })
        );

        setTimeout(heartbeat, 10000);
      };

      heartbeat();
    });
  }

  _listenerMessages(): void {
    this.socket.addEventListener('message', (event) => {
      try {
        const response: Message | Message[] = JSON.parse(event.data);

        if (Array.isArray(response)) {
          store.set('messages', response);
        } else if (response.type === 'message') {
          const oldMessages: Message[] = store.getState()?.messages || [];
          store.set('messages', oldMessages.push(response));
        }
      } catch (error) {}
    });
  }

  _listenerWebSocket(): void {
    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }
}

const messageSocket = new MessageSocket();

export default messageSocket;
