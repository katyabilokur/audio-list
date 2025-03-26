import { auth } from "@/app/_lib/auth";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const session = await auth();
  const locale = session?.user.language || "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
