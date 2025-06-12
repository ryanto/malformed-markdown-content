# Tool calls and malformed markdown

When sending chat completion requests to Together AI, the presence of `{ tools: [] }` and `{ stream: true }` in the request body cause malformed markdown responses.

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

### Usage

Run each of the following scripts to see the tool call output from the services:

| Command                                              | Description                                      | Valid markdown                                    |
| ---------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| `pnpm tsx examples/together-fetch-non-streaming.ts`  | Fetch a non-streaming response from Together AI  | ✅                                                |
| `pnpm tsx examples/together-fetch-streaming.ts`      | Fetch a streaming response from Together AI      | ❌ No newlines, spaces before numbers are removed |
| `pnpm tsx examples/openai-fetch-non-streaming.ts`    | Fetch a non-streaming response from OpenAI       | ✅                                                |
| `pnpm tsx examples/openai-fetch-streaming.ts`        | Fetch a streaming response from OpenAI           | ✅                                                |
| `pnpm tsx examples/fireworks-fetch-non-streaming.ts` | Fetch a non-streaming response from Fireworks AI | ✅                                                |
| `pnpm tsx examples/fireworks-fetch-streaming.ts`     | Fetch a streaming response from Fireworks AI     | ✅                                                |
