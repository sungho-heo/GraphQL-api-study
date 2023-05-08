import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


const typeDefs = `#graphql
    type Users{
        id:ID
        name:String
    }
    type Dolls {
        id: ID
        name: String
        created: String
    }
    type Query {
        allDolles: [Dolls] 
        doll(id: ID): Dolls
    }

    type Mutation{
        postDolls(name:String, userId:ID): Dolls
        deleteDolls(id:ID): Boolean
    }
`;
const server = new ApolloServer({ typeDefs })

const { url } = await startStandaloneServer(server);
console.log(`start sever ${url}`);