import SignInButton from "../_components/SignInButton";
export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div>
      <h2>Sign in to access your account</h2>
      <SignInButton />
    </div>
  );
}
