import BookingsPage from "@/components/admin/bookingsPageComponent";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ hallId: string }>;
}) {
  // const searchParams = useSearchParams();
  // const hallId = searchParams.get("hallId");
  const { hallId } = await searchParams;
  return <BookingsPage hallId={hallId} />;
}
