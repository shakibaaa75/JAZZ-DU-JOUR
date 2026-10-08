import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Jazz Du Jour — Live Jazz Combos | Sacramento & Yolo County",
  description:
    "Live jazz for any occasion in the Sacramento & Yolo County area. Jazz quartets, trios, duos and solo sax. Real jazz — not Dixieland, not smooth jazz.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}