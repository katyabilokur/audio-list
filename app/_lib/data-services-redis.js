import { auth } from "./auth";
import { redis, connectRedis } from "@/app/_lib/redis";

export const getTempItemsInCart = async function (categoryId) {
  const session = await auth();
  const userId = session?.user.userId;

  await connectRedis();

  const redisKey = `cart::${userId}::${categoryId}`;

  const values = await redis.lRange(redisKey, 0, -1);

  return values.map((el) => +el);
};
