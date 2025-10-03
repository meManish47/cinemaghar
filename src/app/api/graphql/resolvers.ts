import { confirmBooking, createBooking } from "./resolvers/booking";
import { addCinema, getAllCinemas } from "./resolvers/cinema";
import { addHall, getAllHalls } from "./resolvers/halls";
import { getAllMovies, getMovieWithId } from "./resolvers/movie";
import { addBulkSeats, getSeatById } from "./resolvers/seats";
import {
  addShow,
  getShowById,
  getShowsByCinema,
  getShowsByMovie,
} from "./resolvers/shows";
import { generateTickets, getTicketDataFromSession } from "./resolvers/ticket";
import { getUserByClerkId } from "./resolvers/user";

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
  },
  Mutation: {
    addCinema,
    addHall,
    addBulkSeats,
    addShow,
    createBooking,
    confirmBooking,
    generateTickets,
  },
};
export default resolvers;
