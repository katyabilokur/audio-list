import "./globals.css";
import StyledComponentsRegistry from "./_lib/registry";
import Navigation from "./_components/Navigation";

export const metadata = {
  title: "Audio List App",
  description: "Allows to create and manage shopping lists with your voice",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>
          <StyledComponentsRegistry> {children}</StyledComponentsRegistry>
        </main>
      </body>
    </html>
  );
}
