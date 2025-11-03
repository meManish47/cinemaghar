import { confirmBooking, createBooking } from "./resolvers/booking";
import { addCinema, getAllCinemas } from "./resolvers/cinema";
import { addHall, getAllHalls } from "./resolvers/halls";
import { getAllMovies, getMovieWithId } from "./resolvers/movie";
import { getSeatById } from "./resolvers/seats";
import {
  addShow,
  getShowById,
  getShowsByCinema,
  getShowsByMovie,
} from "./resolvers/shows";
import {  getTicketDataFromSession } from "./resolvers/ticket";
import {
  getCurrentUserEmail,
  getUserByClerkId,
  logoutUser,
} from "./resolvers/user";

const resolvers = {
  Query: {
    getAllMovies,
    getMovieWithId,
    getAllCinemas,
    getAllHalls,
    getShowsByCinema,
    getShowsByMovie,
    getShowById,
    getSeatById,
    getTicketDataFromSession,
    getUserByClerkId,
    getCurrentUserEmail,
  },
  Mutation: {
    addCinema,
    addHall,
    addShow,
    createBooking,
    confirmBooking,
    logoutUser,
  },
};
export default resolvers;
