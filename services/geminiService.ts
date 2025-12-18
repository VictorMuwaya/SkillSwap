
import { GoogleGenAI, Type } from "@google/genai";
import { User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPartnerAdvice = async (me: User, partner: User) => {
  const prompt = `
    Analyze the skill set of two community members and suggest why they might be a good swap match.
    User 1 (Me): ${me.name}. Offers: ${me.skillsOffered.map(s => s.name).join(", ")}. Needs: ${me.skillsNeeded.join(", ")}.
    User 2 (Partner): ${partner.name}. Offers: ${partner.skillsOffered.map(s => s.name).join(", ")}. Needs: ${partner.skillsNeeded.join(", ")}.
    
    Provide a friendly, conversational reason (2-3 sentences) why they should connect. Focus on how their skills complement each other's needs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Advice Error:", error);
    return "You both have skills that could benefit the community! Try reaching out to see how you can help each other.";
  }
};

export const suggestSkillCategorization = async (description: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Categorize this skill description into one of these: Home Maintenance, Education, Technology, Culinary, Arts & Crafts, Wellness, Pet Care, Gardening. Description: "${description}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          confidence: { type: Type.NUMBER }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const getChatAssistance = async (context: string, partnerName: string) => {
  const prompt = `You are a helpful community assistant for a skill-swapping app. 
  The user is chatting with ${partnerName}. 
  The last few messages or current context: "${context}". 
  Suggest 3 short, friendly, and proactive reply options the user can use to coordinate the swap (e.g., suggesting a time, asking a detail). 
  Return a JSON array of strings. Keep each suggestion under 15 words.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text) as string[];
  } catch (error) {
    console.error("Chat assistance error:", error);
    return ["Sounds good!", "When are you free?", "Let's do it!"];
  }
};
