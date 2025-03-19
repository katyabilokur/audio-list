import AccountNavigation from "../_components/AccountNavigation";
import Container from "../_components/visual/Container";

export default function Layout({ children }) {
  return (
    <Container className="relative z-0 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-96px)] bg-primary_blue-100 flex flex-col">
      <div className="xs:w-[360px] w-96 sm:w-160 mx-auto mt-8 px-4">
        <div>{children}</div>
        <AccountNavigation />
      </div>
    </Container>
  );
}
