import { getCategories } from "@/app/_lib/data-services";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request) {
  try {
    const { text, userId } = await request.json();

    const categoriesList = await getCategories(userId);
    const categories = categoriesList.map((catEl) => catEl.name).join(", ");

    const prompt = `
Here are the categories you should use to classify items:

CATEGORIES: ${categories}
INPUT-TEXT: ${text}

Instructions:
1. Extract individual shopping items from the INPUT-TEXT.
2. For each item, determine the following:
   - Type (choose the best fit from the provided CATEGORIES)
   - Quantity
   - Unit (use plural form if quantity > 1, otherwise singular). If not given set "Item" as a unit mesurnment
   - Product name
   - Additional notes (if any)
3. Format the output as CSV with the following columns in this order:
   type,quantity,unit,product name,note
4. Follow these rules:
   - Do not include a header row in the CSV output.
   - The type and product name columns must not be empty.
   - Other columns can be empty if the information is not provided.
   - Use only letters, digits, dashes, and single quotes in the product name.
   - Move descriptive details (e.g., "big", "fresh") to the note column.
   - Treat general terms like "veggies" or "fruit" as product names, not notes.
   - Do not add any quotes to the CSV values.
   - If a value is missing, leave it empty but keep the comma (e.g., "grocery,,,veggies,some").
Proceed with analyzing the shopping list and generating the CSV output only as a result.
    `.trim();

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1000,
      temperature: 0.2,
      system:
        "You are an advanced shopping list parser. Your task is to analyze a given shopping list and convert it into a structured CSV format.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    const csvData = response.content[0].text.trim();

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
