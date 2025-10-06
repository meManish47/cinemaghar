import HomeLogic from "@/components/main/homelogic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    <main className="bg-[#FFFFFF]">
      <HomeLogic q={q} />
    </main>
  );
}
