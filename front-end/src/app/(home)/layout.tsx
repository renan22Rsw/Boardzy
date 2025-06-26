import { NavBar } from "@/components/navbar/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
};

export default HomeLayout;
