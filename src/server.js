import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
import { apiKey } from "../config.js";


const apiLink = `https://api.themoviedb.org/3`;

const typeDefs = `#graphql
  type Genre{
    id: ID!
    name: String!
  }

  type Movie{
    id: ID!
    adult: Boolean!
    genre_ids: Genre
    backdrop_path: String!
    title: String!
    original_language: String!
    overview: String!
    poster_path: String!
    release_date: String!
    video: Boolean!
    vote_average: Float!
    vote_count: Int!
  }
  
  type Query{
    allMovies:[Movie!]!
    allGenres:[Genre!]!
    movie(id:ID!): Movie
  }
`

const resolvers = {
  Query: {
    allMovies() {
      return axios(`${apiLink}/movie/top_rated?api_key=${apiKey}`)
        .then((json) => json)
        .then((result) => result.data.results)
        .catch((err) => err)
    },
    allGenres() {
      return axios(`${apiLink}/genre/movie/list?api_key=${apiKey}`).then(
        (json) => json.data.genres
      )
    },
  },
}



const server = new ApolloServer({ typeDefs,resolvers })


await startStandaloneServer(server).then(result => console.log(` 🚀 Start Server ${result.url}`)).catch((err) => err);

