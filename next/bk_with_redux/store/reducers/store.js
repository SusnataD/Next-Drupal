import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import commonReducer from "./commonReducer";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

const combinedReducer = combineReducers({
  common: commonReducer,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(
    masterReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

export const wrapper = createWrapper(initStore);
