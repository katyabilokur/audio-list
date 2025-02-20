import { auth } from "@/app/_lib/auth";
import { redis, connectRedis } from "@/app/_lib/redis";

export async function POST(request) {
  const session = await auth();
  const userId = session?.user.userId;
  const { categoryId, itemId, add } = await request.json();

  await connectRedis();

  //1. Create a key for Redis
  const redisKey = `cart::${userId}::${categoryId}`;

  //2. Save to Redis
  if (add) {
    await redis.rPush(redisKey, itemId.toString());
  } else {
    await redis.lRem(redisKey, 1, itemId.toString());
  }

  //TODO: 30 seconds for testing
  await redis.expire(redisKey, 30);

  //TODO: add error handling
  // if (error) {
  //   console.error(error);
  //   return new Response(
  //     { error: `New recorder items cannot be inserted: ${error}` },
  //     {
  //       status: 500,
  //     }
  //   );
  // }

  return new Response(JSON.stringify({ res: "ok" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
