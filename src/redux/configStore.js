import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import User from "./user";

const rootReducer = combineReducers({
  user: User,
});

const middlewares = [thunk];

const env = process.env.NODE_ENV;

// 개발환경에서 logger 사용
if (env === "development") {
  const { createLogger } = require("redux-logger");
  const logger = createLogger();
  middlewares.push(logger);
}

// devTools 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 미들웨어 통합
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 루트 리듀서와 미들웨어를 엮어 스토어 생성
const store = createStore(rootReducer, enhancer);

export default store;