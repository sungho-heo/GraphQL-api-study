import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


const typeDefs = `#graphql
    type Query {
        movies: String
    }
`;
const server = new ApolloServer({ typeDefs })

const { url } = await startStandaloneServer(server);
console.log(`start sever ${url}`);