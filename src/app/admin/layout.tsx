import AdminNav from "@/components/admin/adminnav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminNav />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
