import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    getAllMovies: [Movie]
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
