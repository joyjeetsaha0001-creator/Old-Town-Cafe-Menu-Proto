import "./globals.css";

export const metadata = {
  title: "Old Town Café",
  description: "Old Town Café digital menu",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}