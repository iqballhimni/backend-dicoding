import { postPredictHandler, historiesPredictHandler } from "./handler.js";

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: historiesPredictHandler,
    options: {},
  },
];

export default routes;