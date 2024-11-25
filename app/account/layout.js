import AccountNavigation from "../_components/AccountNavigation";

export default function Layout({ children }) {
  return (
    <div>
      <div>
        <AccountNavigation />
      </div>
      <div>{children}</div>
    </div>
  );
}
