import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

const apiLink = `https://api.themoviedb.org/3`;

const typeDefs = `#graphql
  type Genre{
    id: ID!
    name: String!
  }

  type Movies{
    id: ID!
    adult: Boolean!
    title: String!
    poster_path: String!
    release_date: String!
    vote_average: Float!
  }

  type Movie{
    id: ID!
    title: String!
    genres: [Genre!]!
    overview: String!
    poster_path: String!
    vote_average: Float!
    release_date: String!
  }
  
  type Query{
    allMovies(page: Int!):[Movies!]!
    movie(id:ID!): Movie
  }
`;
const resolvers = {
  Query: {
    allMovies(_, { page }) {
      return axios(
        `${apiLink}/movie/popular?api_key=${process.env.APIKEY}&page=${page}`
      )
        .then((json) => json)
        .then((result) => result.data.results)
        .catch((err) => err);
    },
    movie(_, { id }) {
      return axios(`${apiLink}/movie/${id}?api_key=${process.env.APIKEY}`)
        .then((json) => json.data)
        .catch((err) => err);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

await startStandaloneServer(server)
  .then((result) => console.log(` 🚀 Start Server ${result.url}`))
  .catch((err) => err);
