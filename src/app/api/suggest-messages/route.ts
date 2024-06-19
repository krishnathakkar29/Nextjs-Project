import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 500,
  temperature: 0.7,
  topP: 0.6,
  topK: 16,
};
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
});

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await model.generateContent(prompt);
    return Response.json(
      {
        success: true,
        message: "Suggested Messages generated successfully",
        prompt: result.response.text(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("An unexpected error occured while generating", error);
    throw error;
  }
}