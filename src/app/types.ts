import {
  Booking,
  Cinema,
  Hall,
  Movie,
  Seat,
  Show,
  User,
} from "../../generated/prisma";

export type CinemaWithHall = Cinema & {
  halls: Hall[];
};
export type HallsWithCinema = Hall & {
  cinema: Cinema;
  shows: SHOW_WITH_HALL_MOVIE[];
};
export type SHOW_WITH_HALL_MOVIE = Show & {
  hall: Hall & { cinema: Cinema; seats: Seat[] };
  movie: Movie;
  bookings: BookingWithSeats[];
};
export type BookingWithSeats = Booking & {
  seats: Seat[];
  user: User;
  show: Show & { movie: Movie };
};
export type ShowWithHall = Show & {
  hall: Hall & { cinema: CinemaWithHall };
  movie: Movie;
};
export type GroupedCinema = {
  cinema: CinemaWithHall;
  shows: ShowWithHall[];
};
export type TicketResponse = {
  movieTitle: string;
  moviePoster: string;
  hallName: string;
  cinemaName: string;
  showDate: string;
  showTime: string;
  seats: string[];
  screen: string;
  user: User;
};
export type AddShowFormProps = {
  movies: Movie[];
  halls: HallsWithCinema[];
  onAdded: () => void;
};
export type ShowForm = {
  movieId: string;
  hallId: string;
  start: string;
  finish: string;
  date: string;
};
export type ShowItem = {
  movieTitle: string;
  date: string;
  start: string;
  end: string;
  hallName: string;
  cinemaName: string;
  cinemaLocation: string;
};
export type MovieWithShow = Movie & { shows: Show[] };

