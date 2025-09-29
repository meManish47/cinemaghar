import { gql } from "graphql-tag";

const typeDefs = gql`
  type MovieResponse {
    success: Boolean!
    movie: Movie
    message: String
  }
  type Cinema {
    id: String!
    name: String!
    location: String!
    halls: [Hall!]!
  }

  type Hall {
    id: String!
    hall_name: String!
    capacity: Int!
    cinemaId: String!
    cinema: Cinema!
  }
  type Movie {
    id: String
    movie_title: String
    popularity: Int
    thumbnail: String
    cover: String
    release_date: String
    overview: String
  }
  type Show {
    id: String!
    start: String!
    finish: String!
    date: String!
    hallId: String!
    movieId: String!
    hall: Hall!
    movie: Movie!
  }
  input SeatInput {
    hallId: String!
    row_no: Int!
    seat_no: Int!
  }
  type Seat {
    id: String!
    row_no: Int!
    seat_no: Int!
    hallId: String!
    hall: Hall
  }
  type Query {
    getAllMovies: [Movie]
    getMovieWithId(id: String!): MovieResponse
    getAllCinemas: [Cinema!]!
    getAllHalls: [Hall!]!
    getShowsByMovie(movieId: String!): [Show!]!
    getShowsByCinema(cinemaId: String!): [Show!]!
  }
  type Mutation {
    addCinema(name: String!, location: String!): Cinema!
    addHall(hall_name: String!, capacity: Int!, cinemaId: String!): Hall!
    addBulkSeats(hallId: String!, seats: [SeatInput!]!): [Seat!]!
    addShow(
      movieId: String!
      hallId: String!
      start: String!
      finish: String!
      date: String!
    ): Show
  }
`;
export default typeDefs;
