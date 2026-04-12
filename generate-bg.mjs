import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A minimalist and luxurious watercolor floral background for a wedding website. Flowers appear ONLY at the bottom edge of the image. The top 70% of the image MUST remain completely clean and empty off-white. Delicate, thin stems and small flowers. Very low floral density, light and airy. Soft and desaturated tones: off-white, light warm gray, soft dusty blue, muted blue-gray, soft blush nude. Slight watercolor effect, soft blur, subtle texture. No strong contrast, no dark backgrounds, no heavy textures. Romantic, modern, high-end editorial style.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.mkdirSync('./public', { recursive: true });
        fs.writeFileSync('./public/floral-bg.png', Buffer.from(base64Data, 'base64'));
        console.log('Image generated successfully.');
        break;
      }
    }
  } catch (e) {
    console.error("Error generating image:", e);
    process.exit(1);
  }
}
main();
