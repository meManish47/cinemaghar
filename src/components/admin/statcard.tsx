
export default function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold mt-2 text-gray-800">{value}</h3>
    </div>
  );
}