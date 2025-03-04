import { auth } from "./auth";
import { redis, connectRedis } from "@/app/_lib/redis";

export const getTempItemsInCart = async function (
  categoryId,
  sharedSameCatIds = null
) {
  const session = await auth();
  const userId = session?.user.userId;

  await connectRedis();

  const redisKey = `cart::${userId}::${categoryId}`;

  const values = await redis.lRange(redisKey, 0, -1);

  let allValues = values.map((el) => +el);

  if (sharedSameCatIds && sharedSameCatIds.length > 0) {
    const sharedValues = await Promise.all(
      sharedSameCatIds.map(async (catId) => {
        const sharedKey = `cart::${userId}::${catId}`;
        const sharedItems = await redis.lRange(sharedKey, 0, -1);
        return sharedItems.map((el) => +el);
      })
    );

    allValues = [...allValues, ...sharedValues.flat()];
  }

  return allValues;
};
