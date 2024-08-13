import DashboardNavbar from "@/components/layout/DashboardNavbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <DashboardNavbar />
      {children}
    </div>
  );
}
