// "use client";
import AdminDashboard from "@/app/admin/page";
import { currentUser } from "@clerk/nextjs/server";
import AdminNavBar from "../admin/adminNavBar";
import HomePage from "../homepage/homepage";

export default async function HomeLogic() {
  // const { user, isSignedIn, isLoaded } = useUser();
  const User = await currentUser();
  // console.log(User);
  const adminEmail = "kmanish57610@gmail.com";
  // const currentEmail = user?.primaryEmailAddress?.emailAddress;
  const currentEmail = User?.emailAddresses[0].emailAddress;
  // if (!isLoaded)
  //   return (
  //     <p className="h-screen w-full flex items-center justify-center ">
  //       <span className="loading loading-spinner loading-xl"></span>
  //     </p>
  //   );
  if (!currentEmail) return <HomePage />;
  if (currentEmail !== adminEmail) return <HomePage />;
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
