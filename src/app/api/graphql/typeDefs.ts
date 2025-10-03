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
    cinemaId: String!
    cinema: Cinema!
    seats: [Seat]
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
  input SeatInputForTicket {
    id: String!
    row_no: Int!
    seat_no: Int!
  }
  type Seat {
    id: String!
    row_no: Int!
    seat_no: Int!
    hallId: String!
    hall: Hall
    isBooked:Boolean
  }
  type Ticket {
    id: String
    bookingId: String
    seatId: String
    booking: Booking
    seat: Seat
  }
  type Booking {
    id: String
    userId: String
    createdAt: String
    status: String
    showId: String
    user: User
    show: Show
    ticket: [Ticket]
  }
  type Query {
    getAllMovies: [Movie]
    getMovieWithId(id: String!): MovieResponse
    getAllCinemas: [Cinema!]!
    getAllHalls: [Hall!]!
    getShowsByMovie(movieId: String!): [Show!]!
    getShowsByCinema(cinemaId: String!): [Show!]!
    getShowById(showId: String!): Show!
    getSeatById(seatId: String!): Seat
    getUserByClerkId(clerkId: String!): User
    getTicketDataFromSession(sessionId: String!): TicketResponse
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
    createBooking(userId: String!, showId: String!, status: String!): Booking
    confirmBooking(bookingId: String!): Booking
    generateTickets(seats: [SeatInputForTicket!]!, bookingId: String!): [Ticket]
  }
`;
export default typeDefs;
