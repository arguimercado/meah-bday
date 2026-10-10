import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fredoka";
import "@fontsource-variable/nunito";
import "./globals.css";
import { party } from "@/lib/party";

export const metadata: Metadata = {
  title: `${party.firstName}'s ${party.age}th Birthday Pool Party`,
  description: `You're invited to ${party.firstName}'s ${party.age}th birthday pool party on ${party.date} in ${party.town}. Tap to RSVP!`,
  // Private family invitation: keep it out of search engines.
  robots: { index: false, follow: false },
  openGraph: {
    title: `You're invited to ${party.firstName}'s ${party.age}th Birthday!`,
    description: `${party.date} · ${party.town} · Pool party — tap to RSVP`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#3a2272",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="night-sky relative min-h-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
