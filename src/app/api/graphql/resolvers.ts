import { getAllMovies, getMovieWithId } from "./resolvers/movie";

const resolvers = {
  Query: {
    getAllMovies,
    getMovieWithId
  },
};
export default resolvers