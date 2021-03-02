import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import userReducer from "./user-reducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  form: formReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
