// applyMiddleWare function will pass store to this function
/* next will called , 
  ** if this function is the last function in applyMiddleWare 
     it will pass the action to dispatch and run the action in the reducer
  ** if this function isn't the last function, so it will pass the action to next middleware function
  */

export const logger = store => next => action => {
  console.group(action.type);
  console.log("The Action is :", action);
  const resultValue = next(action);
  console.log("The New State Is :", store.getState());
  console.groupEnd();
  return resultValue;
};
