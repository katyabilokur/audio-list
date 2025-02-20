"use client";

import { shareList } from "@/app/_lib/actions";

function ShareForm({ setIsOpenShare }) {
  return (
    <form action={shareList}>
      <div className="flex gap-4 flex-col">
        <input type="email" placeholder="share.with@email.com" />
        <div className="flex gap-4">
          <button onClick={() => setIsOpenShare(false)}>Cancel</button>
          <button>Share</button>
        </div>
      </div>
    </form>
  );
}

export default ShareForm;
