import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
import { apiKey } from "./config.js";


const apiLink = `https://api.themoviedb.org/3`;

/*
    adult: false,
    backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    genre_ids: [Array],
    id: 238,
    original_language: 'en',
    original_title: 'The Godfather',
    overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
    popularity: 95.565,
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    release_date: '1972-03-14',
    title: 'The Godfather',
    video: false,
    vote_average: 8.7,
    vote_count: 17877
*/

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
  Movie: {
    genre_ids(root) {
      console.log(root.genre_ids);
      return true
    },
  },
}
// https://api.themoviedb.org/3/genre/movie/list

const server = new ApolloServer({ typeDefs,resolvers })


const { url } = await startStandaloneServer(server);

console.log(` 🚀 Start Server ${url}`);