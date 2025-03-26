import "@/app/_styles/globals.css";
import Navigation from "./_components/Navigation";
import { auth } from "./_lib/auth";

import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    template: "%s / Audio List",
    default: "Welcome / Audio List",
  },
  description: "Create and manage your shopping lists with your voice",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  // const language = session?.user.language || "en";

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${font.className} antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider>
          {session?.user && (
            <Navigation image={session.user.image} name={session.user.name} />
          )}
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
