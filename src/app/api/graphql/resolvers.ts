import {
  confirmBooking,
  createBooking,
  getBookingsByHall,
} from "./resolvers/booking";
import createCheckoutSession from "./resolvers/checkout";
import { addCinema, getAllCinemas, getCounts } from "./resolvers/cinema";
import { addHall, getAllHalls } from "./resolvers/halls";
import {
  getAllMovies,
  getMovieWithId,
} from "./resolvers/movie";
import { getSeatById } from "./resolvers/seats";
import {
  addShow,
  deleteShow,
  getAllShows,
  getAllShowsWithDeltedOnes,
  getShowById,
  getShowsByCinema,
  getShowsByMovie,
} from "./resolvers/shows";
import { getTicketDataFromSession } from "./resolvers/ticket";
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
    getAllShows,
    getAllShowsWithDeltedOnes,
    getCounts,
    getBookingsByHall,
  },
  Mutation: {
    addCinema,
    addHall,
    addShow,
    createBooking,
    confirmBooking,
    logoutUser,
    deleteShow,
    createCheckoutSession,
  },
};
export default resolvers;
