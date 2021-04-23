import thunk from "redux-thunk";
import { logger } from "./logger";
import { applyMiddleware } from "redux";

// thunk --> used to make asyn request
// logger --> is a custom middleware for debugging
// applyMiddleware --> used to combine more middleware, control them and pass store to each of them

export default applyMiddleware(thunk, logger);
