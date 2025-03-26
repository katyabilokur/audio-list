import { auth } from "@/app/_lib/auth";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const session = await auth();
  const locale = session?.user.language || "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
