import { auth } from "../_lib/auth";

export const metadata = {
  title: "My Account",
};

export default async function Account() {
  const session = await auth();

  const firstName = session.user.name.split(" ")[0];

  return <h2>Welcome, {firstName}</h2>;
}
