import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateDraftInquiry = async (userInput: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key not found. Returning mock response.");
    return "APIキーが設定されていないため、AI機能を利用できません。直接フォームにご記入ください。";
  }

  try {
    const prompt = `
      あなたはプロフェッショナルなビジネスアシスタントです。
      ユーザーのラフな要望をもとに、問い合わせフォームに入力するための丁寧なビジネスメールの本文を作成してください。
      
      ユーザーの要望: ${userInput}
      
      要件:
      - 丁寧な敬語を使用すること。
      - 簡潔かつ明確に伝えること。
      - 「ご担当者様」で始めること。
      - 本文のみを出力すること（件名や挨拶の重複は避ける）。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "申し訳ありません。ドラフトの生成に失敗しました。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "エラーが発生しました。もう一度お試しください。";
  }
};