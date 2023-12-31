import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import "./theme-config.css";
import "./globals.css";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track and solve issues",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="iris">
              <NavBar />
              <Container className="m-5">
                <main>{children}</main>
              </Container>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
