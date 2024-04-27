import { configureStore, Middleware } from "@reduxjs/toolkit";
import {
 Api,
 formApi,
 fillFormsApi,
} from "../service/APIs";

const store = configureStore({
 reducer: {
    api: Api.reducer,
    formApi: formApi.reducer,
    fillFormsApi: fillFormsApi.reducer,
 },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      Api.middleware as Middleware,
      formApi.middleware as Middleware,
      fillFormsApi.middleware as Middleware
    ),
});

export default store;
