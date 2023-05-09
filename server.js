import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const dolls = [
    {
        id: 1,
        name: "bear",
        created: new Date().toLocaleString("ko-kr", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
    },
    {
        id: 2,
        name: "lion",
        created: new Date().toLocaleString("ko-kr", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
    },
    {
        id: 3,
        name: "tiger",
        created: new Date().toLocaleString("ko-kr", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
    },
];

const typeDefs = `#graphql
    type Users{
        id:ID!
        name:String!
    }
    type Dolls {
        id: ID!
        name: String!
        created: String!
    }
    type Query {
        allDolles: [Dolls!]! 
        doll(id: ID!): Dolls
    }

    type Mutation{
        postDolls(name:String!, userId:ID!): Dolls
        deleteDolls(id: ID!): Boolean
    }
`

const resolvers = {
    Query: {
        allDolles() {
            return dolls
        },
        doll(root, { id }) {
            return dolls.find((doll) => parseInt(doll.id) === parseInt(id));
        }
    },
};
const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server);
console.log(`start sever ${url}`);