const BoardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto w-full max-w-[1200px] space-y-4 px-4 pt-10">
      {children}
    </main>
  );
};

export default BoardContainer;
