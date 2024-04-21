import "../styles/globals.css";

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 h-full flex items-center justify-center">
      <body className="bg-orange-50 p-5 md:p-0 w-full h-full flex flex-row justify-center items-center">
        <div className="bg-orange-100 h-full flex flex-col flex-1 w-full rounded-lg shadow-orange-500 shadow-lg p-2 md:p-5 overflow-y-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}
