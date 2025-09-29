import { addCinema, getAllCinemas } from "./resolvers/cinema";
import { addHall, getAllHalls } from "./resolvers/halls";
import { getAllMovies, getMovieWithId } from "./resolvers/movie";
import { addBulkSeats } from "./resolvers/seats";
import { addShow, getShowsByCinema, getShowsByMovie } from "./resolvers/shows";

const resolvers = {
  Query: {
    getAllMovies,
    getMovieWithId,
    getAllCinemas,
    getAllHalls,
    getShowsByCinema,
    getShowsByMovie
  },
  Mutation:{
      addCinema,
      addHall,
      addBulkSeats,
      addShow
  }
};
export default resolvers