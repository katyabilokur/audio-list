import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button>
        <ArrowRightOnRectangleIcon />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
