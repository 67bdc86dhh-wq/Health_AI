# Free AI options that can work on GitHub Pages

GitHub Pages is static hosting, so it cannot securely run server-side AI. Free options must run in the browser or use built-in educational search.

## Best practical setup for this project

The current site uses a browser-based Health-AI guide:

- Works on GitHub Pages
- No API key
- No paid model
- Searches built-in AI/healthcare guidance
- Searches uploaded repository materials saved in the browser

## Stronger free/open-source options

1. Transformers.js
   - Runs small open-source models directly in the browser.
   - Good for classification, summarization, embeddings, and smaller text tasks.
   - Docs: https://huggingface.co/docs/transformers.js/

2. WebLLM
   - Runs larger language models in the browser with WebGPU.
   - More chatbot-like, but heavier downloads and needs a modern supported browser/device.

3. Backend later
   - For a true multi-user chatbot with uploaded lecture files, add a backend later.
   - GitHub Pages can stay as the frontend.
