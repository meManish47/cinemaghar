import AdminNavBar from "@/components/admin/adminNavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <AdminNavBar />
      <div className="flex">
        {/* <AdminNav /> */}
        <main className="flex-1 p-6 sm:px-32">{children}</main>
      </div>
    </div>
  );
}
