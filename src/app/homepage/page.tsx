import { GETALLMOVIES, GETALLMOVIESCOVERS } from "@/app/queries";
import HomePageClient from "@/components/homepage/homepageclient";

// Force dynamic rendering — this page fetches from the GraphQL API
// which is a runtime-only endpoint and cannot be statically pre-rendered.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const [dataCovers, dataMovies] = await Promise.all([
      fetch(process.env.GRAPHQL_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: GETALLMOVIESCOVERS }),
      }).then((res) => res.json()),

      fetch(process.env.GRAPHQL_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: GETALLMOVIES }),
      }).then((res) => res.json()),
    ]);

    return (
      <HomePageClient
        covers={dataCovers?.data?.getAllMovies ?? []}
        movies={dataMovies?.data?.getAllMovies ?? []}
      />
    );
  } catch (err) {
    console.error("HomePage fetch failed:", err);
    return <div>Failed to load movies. Please try again later.</div>;
  }
}
