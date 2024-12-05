import dotenv from "dotenv";

import InputError from "../exceptions/InputError.js";
import Hapi from "@hapi/hapi";
import routes from "../server/routes.js";
import loadModel from "../services/loadModel.js";

dotenv.config();

(async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT || 8080,
    host: process.env.APP_HOST || "0.0.0.0", 
    routes: {
      cors: {
        origin: ["*"],
      },
      payload: {
        maxBytes: 1 * 1024 * 1024,
      },
    },
  });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);

  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response.isBoom && response.output.statusCode === 413) {
      const newResponse = h.response({
        status: "fail",
        message: "The size of the payload content exceeds the maximum limit of 1000000",
      });
      newResponse.code(413);
      return newResponse;
    }

    if (response instanceof InputError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();
