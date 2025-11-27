import AdminDashboard from "@/app/admin/page";
import { GET_USER_BY_CLERK_ID } from "@/app/queries";
import { gqlClient } from "@/services/gql";
import { currentUser } from "@clerk/nextjs/server";
import AdminNavBar from "../admin/adminNavBar";
import HomePage from "../homepage/homepage";
import { User } from "../../../generated/prisma";

export default async function HomeLogic() {
  const authUser = await currentUser();
  if (!authUser) return <HomePage />;

  let userDb = null;
  try {
    const data: { getUserByClerkId: User } = await gqlClient.request(
      GET_USER_BY_CLERK_ID,
      {
        clerkId: authUser.id,
      }
    );
    userDb = data?.getUserByClerkId ?? null;
  } catch (err) {
    console.error("GraphQL Error:", err);
    return <HomePage />;
  }

  if (!userDb || userDb.role !== "ADMIN") return <HomePage />;

  return (
    <div className="flex flex-col">
      <AdminNavBar />
      <div className="flex">
        <main className="flex-1 p-6 sm:px-32">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}
