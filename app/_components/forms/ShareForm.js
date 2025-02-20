"use client";

import { shareList } from "@/app/_lib/actions";

function ShareForm({ setIsOpenShare, categoryName, setCurrentShares }) {
  function handleSubmit() {
    setIsOpenShare(false);
  }
  return (
    <form onSubmit={handleSubmit} action={shareList}>
      <div className="flex gap-4 flex-col">
        <input type="hidden" value={categoryName} name="categoryName" />
        <input type="email" placeholder="share.with@email.com" name="email" />
        <div className="flex gap-4">
          <button onClick={() => setIsOpenShare(false)}>Cancel</button>
          <button>Share</button>
        </div>
      </div>
    </form>
  );
}

export default ShareForm;
