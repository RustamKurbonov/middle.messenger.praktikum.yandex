import EventBus from 'src/share/classes/EventBus';
import { Indexed, set } from 'src/share/utils';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {};

  public getState(): Indexed {
    return this.state;
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export default store;

// function connect(mapStateToProps: (state: Indexed) => Indexed) {
// 	return function(Component: typeof Block) {
// 	  return class extends Component {
// 	    constructor(props) {
// 		     // сохраняем начальное состояние
// 		     let state = mapStateToProps(store.getState());

// 	        super({...props, ...state});

// 	        // подписываемся на событие
// 		 store.on(StoreEvents.Updated, () => {
// 			// при обновлении получаем новое состояние
// 			const newState = mapStateToProps(store.getState());

// 			// если что-то из используемых данных поменялось, обновляем компонент
// 			if (!isEqual(state, newState)) {
// 		       this.setProps({...newState});
// 			}

// 			// не забываем сохранить новое состояние
// 			state = newState;
// 		     });
// 	      }
// 	  }
// 	  }
//        }

//      function mapUserToProps(state) {
//        return {
// 	name: state.user.name,
// 	avatar: state.user.avatar,
//        };
//      }

//      connect(UserProfile, mapUserToProps);
