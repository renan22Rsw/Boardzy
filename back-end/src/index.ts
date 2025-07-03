import Fastify from "fastify";
import dotenv from "dotenv";
import { boardsRoute } from "./routes/boards-route";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

const PORT = process.env.PORT || 8000;

fastify.register(boardsRoute);

fastify
  .listen({
    port: PORT as number,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server running at port ${PORT}`);
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
