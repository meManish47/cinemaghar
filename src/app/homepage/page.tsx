import { GETALLMOVIES, GETALLMOVIESCOVERS } from "@/app/queries";
import HomePageClient from "@/components/homepage/homepageclient";

export const revalidate = 43200;

export default async function HomePage() {
  const dataCovers = await fetch(process.env.GRAPHQL_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 3600 },
    body: JSON.stringify({ query: GETALLMOVIESCOVERS }),
  }).then((res) => res.json());

  const dataMovies = await fetch(process.env.GRAPHQL_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 3600 },
    body: JSON.stringify({ query: GETALLMOVIES }),
  }).then((res) => res.json());

  return (
    <HomePageClient
      covers={dataCovers.data.getAllMovies}
      movies={dataMovies.data.getAllMovies}
    />
  );
}
