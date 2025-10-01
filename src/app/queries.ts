import { gql } from "graphql-request";

export const GET_ALL_HALLS = gql`
  query {
    getAllHalls {
      id
      hall_name
      cinema {
        id
        name
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
        cinema {
          name
        }
        seats {
          id
          seat_no
          row_no
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
