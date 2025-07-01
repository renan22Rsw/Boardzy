export const AuthErrorMessage = ({ msg }: { msg: string }) => {
  return (
    <span className="w-[300px] text-center text-sm text-red-800 italic">
      {msg}
    </span>
  );
};
