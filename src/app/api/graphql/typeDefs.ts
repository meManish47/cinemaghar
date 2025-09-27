import { gql } from "graphql-tag";

const typeDefs = gql`
  type MovieResponse {
  success: Boolean!
  movie: Movie
  message: String
}
  type Query {
    getAllMovies: [Movie]
    getMovieWithId(id:String!):MovieResponse
  }
  type Movie{
    id:           String   
    movie_title:  String
    popularity:   Int
    thumbnail:    String
    cover:        String
    release_date: String
    overview:     String

  }
`;
export default typeDefs;
