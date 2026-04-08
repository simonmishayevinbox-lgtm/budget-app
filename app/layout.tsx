import "./globals.css";

export const metadata = {
  title: "Budget",
  description: "My budget app",

  icons: {
    icon: "/apple-icon-v2.png",
    apple: "/apple-icon-v2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he">
      <head>
        {/* חשוב לאייפון */}
        <link rel="apple-touch-icon" href="/icon.png" />

        <link rel="manifest" href="/manifest.json" />
      </head>

      <body>{children}</body>
    </html>
  );
}