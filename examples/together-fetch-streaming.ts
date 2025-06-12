import "dotenv/config";

const payload = {
  model: "deepseek-ai/DeepSeek-V3",
  messages: [
    {
      role: "system",
      content: "You are Together Chat, an AI assistant created by Together AI.",
    },
    {
      role: "user",
      content: "whats the weather in nyc",
    },
    {
      role: "assistant",
      content: "",
      tool_calls: [
        {
          id: "call_fh727iu49u4lfj561aldzdm5",
          type: "function",
          function: {
            name: "getWeather",
            arguments: '{"location":"New York, NY","unit":"fahrenheit"}',
          },
        },
      ],
    },
    {
      role: "tool",
      tool_call_id: "call_fh727iu49u4lfj561aldzdm5",
      content:
        "The weather in New York, NY is currently 89.6°F with Clear sky. The forecast for the next few days is as follows:\n\n- 2025-06-12: High of 90.6°F, Low of 70.4°F, Weather: Overcast.\n- 2025-06-13: High of 80.2°F, Low of 66°F, Weather: Overcast.\n- 2025-06-14: High of 65°F, Low of 61.4°F, Weather: Dense drizzle.\n- 2025-06-15: High of 67°F, Low of 60.7°F, Weather: Moderate drizzle.\n- 2025-06-16: High of 64.6°F, Low of 63.9°F, Weather: Slight rain showers.\n- 2025-06-17: High of 78.5°F, Low of 64.5°F, Weather: Light drizzle.\n- 2025-06-18: High of 76.1°F, Low of 69.7°F, Weather: Light drizzle.",
    },
  ],
  temperature: 0.3,
  max_tokens: 10000,
  stream: true,
  tools: [
    {
      type: "function",
      function: {
        name: "getWeather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: {
              type: "string",
              enum: ["celsius", "fahrenheit"],
              description: "The unit of temperature to return",
            },
          },
        },
      },
    },
  ],
};

async function main() {
  const response = await fetch("https://api.together.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const textDecoder = new TextDecoderStream();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  const readableStream = response.body.pipeThrough(textDecoder);

  console.log("Reading stream");
  let buffer = "";
  for await (const chunk of readableStream) {
    process.stdout.write(".");
    buffer += chunk;
  }

  console.log("\nStream ended, processing buffer");

  buffer.split("\n").forEach((line) => {
    if (line.startsWith("data: ")) {
      const jsonLine = line.slice(6).trim();
      if (jsonLine === "[DONE]") {
        return;
      }
      try {
        const parsed = JSON.parse(jsonLine);
        const choices = parsed.choices;
        const delta = choices[0]?.delta;
        const content = delta?.content;
        if (content) {
          process.stdout.write(content);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Line", jsonLine);
      }
    }
  });
}

main();
