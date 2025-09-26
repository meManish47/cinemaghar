import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});
export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}