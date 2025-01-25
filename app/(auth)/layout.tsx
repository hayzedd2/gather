export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex p-4 justify-center items-center min-h-screen max-w-7xl mx-auto">
      {children}
    </div>
  );
}
