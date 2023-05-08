import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


const typeDefs = `#graphql
    type Dolls {
        id: ID
        name: String
        created: String
    }
    type Query {
        allDolles: [Dolls] 
        doll(id: ID): Dolls
    }
`;
const server = new ApolloServer({ typeDefs })

const { url } = await startStandaloneServer(server);
console.log(`start sever ${url}`);