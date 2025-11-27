import CheckoutRedirectFunction from "@/components/success/checkoutredirectcomponent";

export default async function CheckoutRedirect({
  searchParams,
}: {
  searchParams: Promise<{ showId: string }>;
}) {
  const { showId } = await searchParams;
  return <CheckoutRedirectFunction showId={showId} />;
}
