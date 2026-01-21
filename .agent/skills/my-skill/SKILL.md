---
name: nano-banana
description: Generate images (and optionally text) using Google Gemini image models via REST curl. Use this to create product renders, UI mockups, hero images, and marketing visuals for APPLIX.
---

# Nano Banana (Gemini Image)

This skill generates images using Google Gemini's Generative Language API via curl.
It creates a valid JSON request, calls the API, and outputs the streamed response.

## When to use this skill

- When you need marketing images (hero visuals, card renders, backgrounds).
- When you need UI mockups or product visuals to place into /public/media/ placeholders.
- When you need consistent variations (same prompt + different seeds).

## Requirements

- Environment variable: GEMINI_API_KEY must be set.
- curl must be available.

## How to use it

### 1) Create a prompt file
Write the image prompt in a text file (prompt.txt), e.g:
"Premium matte black metal NFC business card on dark velvet background, gold rim light, photorealistic, studio shot, 4k"

### 2) Run generator
Use the script pattern below:
- MODEL_ID default: gemini-2.5-flash-image
- Endpoint: streamGenerateContent
- Response modalities: IMAGE and TEXT

### 3) Output handling (streaming)
The API returns a streaming JSON response. Save it to a file, then parse for image parts.
If the agent environment doesn't parse streams easily, keep the raw response and extract image data later.

## Script template (bash)

Create a file named: nano-banana.sh

```bash
#!/bin/bash
set -euo pipefail

: "${GEMINI_API_KEY:?GEMINI_API_KEY is required}"

MODEL_ID="${MODEL_ID:-gemini-2.5-flash-image}"
API_METHOD="${API_METHOD:-streamGenerateContent}"
PROMPT_TEXT="${1:-Generate an image of a banana wearing a costume.}"

cat > request.json <<EOF
{
  "contents": [
    {
      "role": "user",
      "parts": [
        { "text": "${PROMPT_TEXT//\"/\\\"}" }
      ]
    }
  ],
  "generationConfig": {
    "responseModalities": ["IMAGE","TEXT"]
  }
}
EOF

curl -sS \
  -H "Content-Type: application/json" \
  -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${API_METHOD}?key=$AIzaSyDGY-bWlu59tmyPfSjbk8QaLABU72_-lac
  -d @request.json
