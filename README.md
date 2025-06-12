# Tool calls and malformed markdown

When sending chat completion requests to Together AI, the presence of `{ tools: [] }` and `{ stream: true }` in the request body cause malformed markdown responses.

The malformed markdown shows up like this:

```markdown
Currently, the weather in New York City is **89.6°F** with **clear skies**.### Upcoming Forecast:- **June12**: ☁️ Overcast | High: **90.6°F** | Low: **70.4°F**- **June13**: ☁️ Overcast | High: **80.2°F** | Low: **66°F**- **June14**: 🌧️ Dense drizzle | High: **65°F** | Low: **61.4°F**- **June15**: 🌧️ Moderate drizzle | High: **67°F** | Low: **60.7°F**- **June16**: 🌦️ Slight rain showers | High: **64.6°F** | Low: **63.9°F**- **June17**: 🌧️ Light drizzle | High: **78.5°F** | Low: **64.5°F**- **June18**: 🌧️ Light drizzle | High: **76.1°F** | Low: **69.7°F**Stay cool today, and keep an umbrella handy later in the week! ☔
```

The correct markdown shows like this:

```markdown
Currently, the weather in New York City is **89.6°F** with **clear skies**.

### Upcoming Forecast:

- **Jun 12**: ☁️ Overcast | High: **90.6°F** | Low: **70.4°F**
- **Jun 13**: ☁️ Overcast | High: **80.2°F** | Low: **66°F**
- **Jun 14**: 🌧️ Dense drizzle | High: **65°F** | Low: **61.4°F**
- **Jun 15**: 🌧️ Moderate drizzle | High: **67°F** | Low: **60.7°F**
- **Jun 16**: 🌦️ Slight rain showers | High: **64.6°F** | Low: **63.9°F**

Stay cool today—it’s a hot one! 🌞 Let me know if you’d like more details.
```

## Setup

Create a `.env` file in the root directory with the following variables:

```env
# .env
TOGETHER_API_KEY=
FIREWORKS_API_KEY=
OPENAI_API_KEY=
```

Install dependencies:

```text
pnpm install
```

## Usage

Run each of the following scripts to see the tool call output from the services:

| Command                                              | Description                                      | Valid markdown                                    |
| ---------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| `pnpm tsx examples/together-fetch-non-streaming.ts`  | Fetch a non-streaming response from Together AI  | ✅                                                |
| `pnpm tsx examples/together-fetch-streaming.ts`      | Fetch a streaming response from Together AI      | ❌ No newlines, spaces before numbers are removed |
| `pnpm tsx examples/openai-fetch-non-streaming.ts`    | Fetch a non-streaming response from OpenAI       | ✅                                                |
| `pnpm tsx examples/openai-fetch-streaming.ts`        | Fetch a streaming response from OpenAI           | ✅                                                |
| `pnpm tsx examples/fireworks-fetch-non-streaming.ts` | Fetch a non-streaming response from Fireworks AI | ✅                                                |
| `pnpm tsx examples/fireworks-fetch-streaming.ts`     | Fetch a streaming response from Fireworks AI     | ✅                                                |
