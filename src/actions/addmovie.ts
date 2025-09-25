// "use server";
// export default async function addmovies() {
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTdjNjU1ODg3YTVlYTY1YWVjMmE2N2JlMTgzNGNiOSIsIm5iZiI6MTc1MjU2ODM5OC43NTgwMDAxLCJzdWIiOiI2ODc2MTI0ZTBkOTUwOWQ2YzA1NzEyNTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mIeud0sTw21Yk74g0hEsUaTwAcZ-XDKk_yDbR0C2mj8",
//     },
//   };

//   const res = await fetch(
//     "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=3",
//     options
//   );
//   const data = await res.json();
//   return data;
// }
