import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { AppNavbar } from "./_components/app-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
