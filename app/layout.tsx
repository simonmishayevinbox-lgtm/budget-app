export const metadata = {
  title: "Budget App",
  description: "My personal finance app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he">
      <head>
        {/* PWA בסיס */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff7a00" />

        {/* אייפון (קריטי!) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Budget App" />

        {/* אייקון לאייפון */}
        <link rel="apple-touch-icon" href="/icon.png" />

        {/* רספונסיב */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#0f0f0f",
          color: "white",
        }}
      >
        {children}
      </body>
    </html>
  );
}