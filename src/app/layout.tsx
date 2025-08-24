import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import MUIThemeProvider from "@/src/components/MUIThemeProvider";
import Link from "next/link";
import ThemeToggle from "@/src/components/ThemeToggle";
import SignOutButton from "@/src/components/SignOutButton";
import SessionControls from "@/components/SessionControls";
export const metadata: Metadata = {
  title: "Avexa UI (MUI)",
  description: "Customer Onboarding demo with Material UI",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <MUIThemeProvider>
            <header className="app-header">
              <nav className="container">
                <div className="left">
                  <Link href="/dashboard" className="brand">
                    Avexa
                  </Link>
                  <Link href="/customers">Customers</Link>
                </div>
                <SessionControls />
              </nav>
            </header>
            <main className="container">{children}</main>
            <footer className="app-footer">
              <div className="container">Demo app · Next.js 14 + MUI</div>
            </footer>
          </MUIThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
