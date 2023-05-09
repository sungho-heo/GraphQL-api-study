import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

let dolls = [
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

const users = [
    {
    id: 1,
    firstName: "김",
    lastName: "철수"
    },
    {
        id: 2,
        firstName: "김",
        lastName: "영희"
    },
];

const typeDefs = `#graphql
    type User{
        id:ID!
        firstName:String!
        lastName:String!
        fullName:String!
    }
    type Dolls {
        id: ID!
        name: String!
        created: String!
    }
    type Query {
        allDolles: [Dolls!]!
        allUsers: [User!]! 
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
        },
        allUsers() {
            return users;
        }
    },
    Mutation:{
        postDolls(root, { name, userId }) {
            const newDolls = {
                id: dolls.length + 1,
                name,
                created: new Date().toLocaleString("ko-kr", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            };
            dolls.push(newDolls);
            return newDolls;
        },
        deleteDolls(root, { id }) {
            const doll = dolls.find(
              (doll) => parseInt(doll.id) === parseInt(id)
            )
            if (!doll) return false;
            dolls = dolls.filter(doll => parseInt(doll.id) !== parseInt(id));
            return true;
        }
    },
    User: {
        fullName({ firstName, lastName }, args, context, info) {
            return `${firstName}${lastName}`;
        }
    }
};
const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server);
console.log(`start sever ${url}`);