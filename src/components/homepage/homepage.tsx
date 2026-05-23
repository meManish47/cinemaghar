import { GETALLMOVIES, GETALLMOVIESCOVERS } from "@/app/queries";
import HomePageClient from "./homepageclient";
import { getRedis } from "@/services/redis";

export default async function HomePage() {
  const CACHE_KEY = "movies:all";

  let dataCovers: any = null;
  let dataMovies: any = null;

  // 🟢 1. Try Redis
  try {
    const redis = await getRedis();
    if (redis) {
      const cached = await redis.get(CACHE_KEY);

      if (cached) {
        const parsed = JSON.parse(cached);

        if (parsed?.dataCovers && parsed?.dataMovies) {
          dataCovers = parsed.dataCovers;
          dataMovies = parsed.dataMovies;
          console.log("✅ CACHE HIT");
        }
      }
    }
  } catch (err) {
    console.error("Redis error, skipping cache", err);
  }

  // 🔴 2. Fetch if cache missing
  if (!dataCovers || !dataMovies) {
    try {
      console.log("❌ CACHE MISS → Fetching API");

      const results = await Promise.all([
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

      [dataCovers, dataMovies] = results;

      // 🟡 Store in Redis (only if valid)
      if (dataCovers && dataMovies) {
        try {
          const redis = await getRedis();
          if (redis) {
            await redis.set(CACHE_KEY, JSON.stringify({ dataCovers, dataMovies }), {
              EX: 3,
            });
          }
        } catch (err) {
          console.error("Redis set error, skipping cache write", err);
        }
      }
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }

  // 🛑 3. Hard fallback (no crash)
  if (!dataCovers || !dataMovies) {
    return <div>Failed to load movies</div>;
  }

  // 🟢 4. Safe rendering
  return (
    <HomePageClient
      covers={dataCovers?.data?.getAllMovies ?? []}
      movies={dataMovies?.data?.getAllMovies ?? []}
    />
  );
}
