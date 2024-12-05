import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { text } = await request.json();
    const categories = "grocery, household, other";

    const prompt = `
    INSTRUCTIONS:
    1. Extract items from INPUT and their quantity;
2. Translate items into English;
3. Name of the product across the results should be either in singular or plural form;
4. Detect unit in world standard format (e.g. kg for kilos, l for liters, pack) and keep it consistent in the results;
5. Return results in strict CSV format (without header and spaces) and proper columns: type (one of: ${categories}), quantity, unit, name, note (if exists);
6. Type and Name can not be empty, others fields can;
7. Only use products from INPUT;
8. Assign each item to the best-fit type based on its context. Only assign 'Other' type is really unsure;
9. Do not add any extra quotes to item names;
10. Do not add columns. Keep the structure of columns consistent: type, quantity, unit, name, note. If no information for note, leave the column empty but do not skip;

    INPUT:"${text}"`.trim();

    console.log(prompt);

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that converts lists to structured CSV data.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.4,
      // max_tokens: 256,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
    });

    const csvData = response.choices[0].message.content.trim();

    return new Response(JSON.stringify({ csv: csvData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      { error: `Text structuring request failed with error: ${error.message}` },
      {
        status: 500,
      }
    );
  }
}
