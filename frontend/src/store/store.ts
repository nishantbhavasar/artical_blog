import { createStore } from "redux";
import RootReducer from './Reducer/index'
const store = createStore(RootReducer);

export default store