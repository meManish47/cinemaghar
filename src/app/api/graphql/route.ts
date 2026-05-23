import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";
const server = new ApolloServer({
  typeDefs,
  resolvers: wrapResolvers(resolvers),
});
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});
export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}

function wrapResolvers(resolvers: any) {
  const wrapped: any = {};

  for (const typeName in resolvers) {
    wrapped[typeName] = {};

    for (const fieldName in resolvers[typeName]) {
      const originalResolver = resolvers[typeName][fieldName];

      wrapped[typeName][fieldName] = async (
        parent: any,
        args: any,
        context: any,
        info: any,
      ) => {
        console.log(`👉 Resolver HIT: ${typeName}.${fieldName}`);
        return originalResolver(parent, args, context, info);
      };
    }
  }

  return wrapped;
}
