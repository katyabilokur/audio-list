import { auth } from "./auth";
import { redis, connectRedis } from "@/app/_lib/redis";
import { getCategories } from "./data-services";

export const getTempItemsInCart = async function (categoryName) {
  const session = await auth();
  const userId = session?.user.userId;

  const categories = await getCategories(userId);
  const categoryId = categories.find((el) => el.name === categoryName).id;

  if (!categoryId) throw new Error("Category not found");

  await connectRedis();

  const redisKey = `cart::${userId}::${categoryId}`;

  const values = await redis.lRange(redisKey, 0, -1);

  return values.map((el) => +el);
};
