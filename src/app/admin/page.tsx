import { SessionProvider } from "next-auth/react";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminPage() {
  return (
    <SessionProvider>
      <AdminDashboard />
    </SessionProvider>
  );
}
