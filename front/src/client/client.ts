import { GraphQLClient } from "graphql-request";

// creat the client for the graphql server and set the endpoint from the env
const client = new GraphQLClient(
    process.env.GRAPHQL_ENDPOINT || "http://127.0.0.1/graphql"
);

export default client;
