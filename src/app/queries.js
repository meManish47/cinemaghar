import { gql } from "graphql-request";

export const GET_ALL_HALLS = gql`
  query {
    getAllHalls {
      id
      hall_name
      capacity
      rows
      columns
      cinema {
        id
        name
        location
      }
      shows {
        id
        start
        finish
        date
        movie {
          id
          movie_title
        }
        bookings {
          id
          createdAt
          seats {
            id
            seat_no
          }
          user {
            name
            email
            id
          }
        }
      }
    }
  }
`;

export const GET_ALL_MOVIES = gql`
  query {
    getAllMovies {
      id
      movie_title
    }
  }
`;

export const ADD_SHOW = gql`
  mutation AddShow(
    $movieId: String!
    $hallId: String!
    $start: String!
    $finish: String!
    $date: String!
  ) {
    addShow(
      movieId: $movieId
      hallId: $hallId
      start: $start
      finish: $finish
      date: $date
    ) {
      id
      start
      finish
      date
      hall {
        hall_name
        cinema {
          name
        }
      }
      movie {
        movie_title
      }
    }
  }
`;

export const GET_SHOWS_BY_MOVIE = gql`
  query GetShowsByMovie($movieId: String!) {
    getShowsByMovie(movieId: $movieId) {
      id
      start
      finish
      date
      hall {
        hall_name
        cinema {
          id
          name
          location
        }
      }
    }
  }
`;

export const GET_MOVIES_BY_ID = gql`
  query GetMovieWithId($getMovieWithIdId: String!) {
    getMovieWithId(id: $getMovieWithIdId) {
      message
      movie {
        movie_title
        id
      }
      success
    }
  }
`;

export const GET_SHOW_BY_ID = gql`
  query GetShowById($showId: String!) {
    getShowById(showId: $showId) {
      date
      finish
      hallId
      id
      movieId
      start
      hall {
        rows
        columns
        cinema {
          name
        }
        seats {
          id
          row_no
          col_no
          seat_no
        }
        hall_name
        id
      }
      movie {
        movie_title
        id
        release_date
        cover
      }
      bookings {
        createdAt
        seats {
          id
        }
      }
    }
  }
`;

export const GET_SEAT_BY_ID = gql`
  query GetSeatById($seatId: String!) {
    getSeatById(seatId: $seatId) {
      row_no
      seat_no
      id
      hallId
      hall {
        hall_name
        cinema {
          name
        }
      }
    }
  }
`;

export const GET_TICKET_RESPONSE = gql`
  query GetTicketDataFromSession($sessionId: String!) {
    getTicketDataFromSession(sessionId: $sessionId) {
      movieTitle
      cinemaName
      hallName
      moviePoster
      screen
      seats
      showDate
      showTime
      user {
        clerkId
        email
        id
        name
      }
    }
  }
`;
export const GET_USER_BY_CLERK_ID = gql`
  query getUserByClerkId($clerkId: String!) {
    getUserByClerkId(clerkId: $clerkId) {
      name
      email
      clerkId
      id
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $userId: String!
    $showId: String!
    $status: String!
    $seats: [String]!
  ) {
    createBooking(
      userId: $userId
      showId: $showId
      status: $status
      seats: $seats
    ) {
      createdAt
      id
      show {
        id
      }
      showId
      status
      user {
        name
        clerkId
      }
      userId
    }
  }
`;

export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($bookingId: String!) {
    confirmBooking(bookingId: $bookingId) {
      createdAt
      id
      showId
      userId
      user {
        name
      }
      show {
        hall {
          hall_name
        }
        id
        movie {
          movie_title
        }
      }
      status
    }
  }
`;

export const GENERATE_TICKETS = gql`
  mutation Mutation($seats: [SeatInputForTicket!]!, $bookingId: String!) {
    generateTickets(seats: $seats, bookingId: $bookingId) {
      booking {
        id
      }
      bookingId
      id
      seat {
        row_no
        seat_no
        hall {
          hall_name
          cinema {
            name
            location
          }
        }
        hallId
        id
      }
      seatId
    }
  }
`;
export const DELETE_SHOW = gql`
  mutation DeleteShow($showId: String!) {
    deleteShow(showId: $showId)
  }
`;

export const GET_ALL_SHOWS = gql`
  query GetAllShows {
    getAllShows {
      start
      movieId
      id
      hallId
      finish
      date
      hall {
        hall_name
      }
      movie {
        movie_title
        thumbnail
      }
      bookings {
        id
      }
    }
  }
`;
export const GET_ALL_SHOWS_WITH_DELETED = gql`
  query GetAllShowsWithDeltedOnes {
    getAllShowsWithDeltedOnes {
      start
      movieId
      id
      hallId
      finish
      date
      hall {
        hall_name
        cinema {
          name
          location
        }
      }
      movie {
        movie_title
        thumbnail
      }
      bookings {
        id
        createdAt
        user {
          name
          email
          id
        }
        seats {
          seat_no
        }
      }
    }
  }
`;

export const GET_COUNTS = gql`
  query GetCounts {
    getCounts {
      cinemaCount
      hallCount
      userCount
    }
  }
`;
export const GETMOVIEWITHID = gql`
  query GetMovieWithId($getMovieWithIdId: String!) {
    getMovieWithId(id: $getMovieWithIdId) {
      success
      movie {
        cover
        movie_title
        id
        overview
        popularity
        release_date
        thumbnail
        shows {
          id
          deletedAt
        }
      }
      message
    }
  }
`;
export const GETALLMOVIESCOVERS = gql`
  query GetAllMovies {
    getAllMovies {
      cover
    }
  }
`;

export const GETALLMOVIES = gql`
  query GetAllMovies {
    getAllMovies {
      movie_title
      cover
      thumbnail
      id
      release_date
      overview
      popularity
    }
  }
`;
export const GET_BOOKINGS_BY_HALL = gql`
  query GetBookingsByHall($hallId: String!) {
    getBookingsByHall(hallId: $hallId) {
      id
      createdAt
      seats {
        seat_no
      }
      user {
        name
        email
      }
      show {
        date
        start
        movie {
          movie_title
          thumbnail
        }
      }
    }
  }
`;

export const GET_HALLS = gql`
  query {
    getAllHalls {
      id
      hall_name
      capacity
      cinema {
        id
        name
        location
      }
      cinemaId
    }
  }
`;
export const ADD_CINEMA = gql`
  mutation AddCinema($name: String!, $location: String!) {
    addCinema(name: $name, location: $location) {
      id
      name
      location
    }
  }
`;
export const GET_CINEMAS = gql`
  query {
    getAllCinemas {
      id
      name
      location
      halls {
        id
        hall_name
        capacity
      }
    }
  }
`;
export const ADD_HALL = gql`
  mutation Mutation($hallName: String!, $capacity: Int!, $cinemaId: String!, $rows: Int!, $columns: Int!) {
    addHall(hall_name: $hallName, capacity: $capacity, cinemaId: $cinemaId, rows: $rows, columns: $columns) {
      hall_name
      id
      cinemaId
      capacity
      rows
      columns
    }
  }
`;