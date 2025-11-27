import AdminDashboard from "@/app/admin/page";
import { GET_USER_BY_CLERK_ID } from "@/app/queries";
import { gqlClient } from "@/services/gql";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "../../../generated/prisma";
import AdminNavBar from "../admin/adminNavBar";
import HomePage from "../homepage/homepage";

export default async function HomeLogic() {
  const User = await currentUser();
  if (!User) return <HomePage />;
  const data: { getUserByClerkId: User } = await gqlClient.request(
    GET_USER_BY_CLERK_ID,
    { clerkId: User.id }
  );
  const user = data.getUserByClerkId;
  if (user.role !== "ADMIN") return <HomePage />;
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
