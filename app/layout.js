import "./globals.css";
import StyledComponentsRegistry from "./_lib/registry";
import Navigation from "./_components/Navigation";
import { auth } from "./_lib/auth";

export const metadata = {
  title: "Audio List App",
  description: "Allows to create and manage shopping lists with your voice",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        {session?.user && (
          <Navigation image={session.user.image} name={session.user.name} />
        )}
        <main>
          <StyledComponentsRegistry> {children}</StyledComponentsRegistry>
        </main>
      </body>
    </html>
  );
}
