import { gql } from "graphql-tag";

const typeDefs = gql`
  type MovieResponse {
    success: Boolean!
    movie: Movie
    message: String
  }
  type TicketResponse {
    movieTitle: String
    moviePoster: String
    hallName: String
    cinemaName: String
    showDate: String
    showTime: String
    seats: [String!]
    screen: String
    user: User
  }
  type User {
    id: String!
    clerkId: String!
    email: String!
    name: String!
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
    rows: Int!
    columns: Int!
    cinemaId: String!
    cinema: Cinema!
    seats: [Seat]
    shows: [Show]
  }
  type Movie {
    id: String
    movie_title: String
    popularity: Int
    thumbnail: String
    cover: String
    release_date: String
    overview: String
    shows: [Show]
  }
  scalar DateTime
  type Show {
    id: String!
    start: String!
    finish: String!
    date: String!
    hallId: String!
    movieId: String!
    hall: Hall!
    movie: Movie
    bookings: [Booking]
    deletedAt: DateTime
  }
  input SeatInputForBooking {
    id: String!
  }

  type Seat {
    id: String!
    hallId: String!
    hall: Hall
    row_no: Int
    col_no: Int
    seat_no: String
    bookingId: String
  }
  type Booking {
    id: String
    userId: String
    createdAt: String
    status: String
    showId: String
    user: User
    show: Show
    seats: [Seat]
  }
  type Counts {
    cinemaCount: Int!
    hallCount: Int!
    userCount: Int!
  }
  type Query {
    getAllMovies: [Movie]
    getMovieWithId(id: String!): MovieResponse
    getAllCinemas: [Cinema!]!
    getAllHalls: [Hall!]!
    getShowsByMovie(movieId: String!): [Show!]!
    getShowsByCinema(cinemaId: String!): [Show!]!
    getShowById(showId: String!): Show
    getSeatById(seatId: String!): Seat
    getUserByClerkId(clerkId: String!): User
    getTicketDataFromSession(sessionId: String!): TicketResponse
    getCurrentUserEmail: String
    getAllShows: [Show]
    getAllShowsWithDeltedOnes: [Show]
    getCounts: Counts!
    getBookingsByHall(hallId:String!): [Booking]
  }
  type Mutation {
    addCinema(name: String!, location: String!): Cinema!
    addHall(
      hall_name: String!
      capacity: Int!
      cinemaId: String!
      rows: Int!
      columns: Int!
    ): Hall!
    addShow(
      movieId: String!
      hallId: String!
      start: String!
      finish: String!
      date: String!
    ): Show
    createBooking(
      userId: String!
      showId: String!
      status: String!
      seats: [String]!
    ): Booking
    confirmBooking(bookingId: String!): Booking
    logoutUser: Boolean
    deleteShow(showId: String!): Boolean
  }
`;
export default typeDefs;
