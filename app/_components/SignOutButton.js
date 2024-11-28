import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button>
        <ArrowRightStartOnRectangleIcon className="h-5" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
