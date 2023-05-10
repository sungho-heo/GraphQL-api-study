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
        userId: 1
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
        userId: 2
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
        userId:2
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
        oner:User
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
      const doll = dolls.find((doll) => parseInt(doll.id) === parseInt(id))
      if (!doll){
          throw Error("doll not found");    
      }
      return doll
    },
    allUsers() {
      return users
    },
  },
  Mutation: {
      postDolls(root, { name, userId }) {
      const user = users.find((user) => parseInt(user.id) === parseInt(userId));
      if (!user) {
          throw Error("user not found");
      }
      const newDolls = {
        id: dolls.length + 1,
        name,
        created: new Date().toLocaleString("ko-kr", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        userId,
      };
      dolls.push(newDolls)
      return newDolls
    },
    deleteDolls(root, { id }) {
      const doll = dolls.find((doll) => parseInt(doll.id) === parseInt(id))
      if (!doll) return false
      dolls = dolls.filter((doll) => parseInt(doll.id) !== parseInt(id))
      return true
    },
  },
  User: {
    fullName({ firstName, lastName }, args, context, info) {
      return `${firstName}${lastName}`
    },
  },
    Dolls: {
        oner({ userId }) {
            const user = users.find(user => user.id === userId);
            if (!user) {
                throw Error("User not found");
            }
            return user;
      }
  }
}
const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server);
console.log(`start sever ${url}`);