import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./reducers";
import middleware from "./middleware";

const store = createStore(rootReducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/*
 *** Work Flow Of Redux:-
      * create Our store and pass root reducer to it.
      * reducer is a function return new state passed on action.
      * async dispatch will return function this function return action creator
      * function in dispatch will go to throw thunk and thunk check if this is function,
        it will pass dispatch and state to it so you can use them
      * so, any dispatch will send it's content to thunk Function and check,
          if this is function, it will inject (dispatch,state) and pass returned action to next middleWare
          if this is object, it will go to reducer and return a new state
      * after dispatch action is done,
        it will check the type of comming action and switch on it and return a new state
      * after reducer return a state, it will update UI and store this date on store
      * connect function accept 2 parameter, 
        1- function that can access to the store and inject this state in current component
        2- current component will pass to it 
          ** see this source --> D:\Projects\REACT\Udacity\Explian Redux\React With Redux singleFile
*/
/*
thunks middleware function --> 
    function createThunkMiddleware(extraArgument) {
      return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }
        return next(action);
      };
    }
    const thunk = createThunkMiddleware();
    thunk.withExtraArgument = createThunkMiddleware;
    export default thunk;
*/
