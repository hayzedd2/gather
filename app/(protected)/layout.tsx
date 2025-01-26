import Aside from "@/components/Aside";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex">
      <Aside />
      <main className="flex-1  min-h-screen max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
