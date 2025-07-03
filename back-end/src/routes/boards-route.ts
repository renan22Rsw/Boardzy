import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const boardsRoute = async (fastify: FastifyInstance) => {
  fastify.get("/boards", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("The boards route is working!");
  });
};
