import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fetch from "node-fetch";

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
"""
Doll create User
"""
    type User{
        id:ID!
        firstName:String!
        lastName:String!
        """
        fullName firstName + lastName objects
        """
        fullName:String!
    }
"""
Mayn people create Dolls objects 
"""
    type Dolls {
        id: ID!
        name: String!
        created: String!
        oner:User
    }
    type Query {
        allDolles: [Dolls!]!
        allUsers: [User!]!
        allMovies: [Movie!]! 
        doll(id: ID!): Dolls
        movie(id: ID!): Movie
    }
    type Movie {
      id: Int!
      url: String!
      imdb_code: String!
      title: String!
      title_english: String!
      title_long: String!
      slug: String!
      year: Int!
      rating: Float!
      runtime: Int!
      summary: String!
      description_full: String!
      synopsis: String!
      yt_trailer_code: String!
      language: String!
      mpa_rating: String!
      state: String!
      date_uploaded: String!
      date_uploaded_unix: Int!
      genres: [String!]!
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
    allMovies() {
        return fetch("https://yts.mx/api/v2/list_movies.json")
          .then((result) => result.json())
          .then((json) => json.data.movies)   
    },
    movie(_, { id }) {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`).then((result) => result.json()).then((json) => json.data.movie)
    }
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