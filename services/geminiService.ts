import { GoogleGenAI } from "@google/genai";

//const apiKey = "AIzaSyDTlDmIZs-h4HPgoc-J4pi-ZcjNS6fY73U";
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "dummy-key-for-build" });

export const getGeminiResponse = async (
  prompt: string,
  context: string = ""
): Promise<string> => {
  try {
    const modelId = "gemini-2.5-flash";
    const systemInstruction = `Bạn là trợ lý ảo thông minh của Tinhocvanphong247 (tinhocvanphong247ai).
    
    NHIỆM VỤ CỦA BẠN:
    1. Ưu tiên hàng đầu: Trả lời câu hỏi dựa trên "DỮ LIỆU CÓ SẴN" (Context) được cung cấp dưới đây.
    2. Nếu câu trả lời có trong dữ liệu: Hãy trích dẫn hoặc tổng hợp thông tin từ đó.
    3. Nếu câu trả lời KHÔNG có trong dữ liệu: Hãy sử dụng kiến thức chung của bạn về tin học văn phòng (Excel, Word, PowerPoint) để trả lời. Hãy trả lời một cách tự tin và chuyên nghiệp.
    4. Định dạng câu trả lời bằng Markdown (in đậm phím tắt, dùng block code cho công thức Excel).
    5. Luôn giữ thái độ thân thiện, hữu ích.

    DỮ LIỆU CÓ SẴN TỪ BLOG:
    ${context}
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6, // Giảm temperature để bám sát context hơn
      },
    });

    return response.text || "Xin lỗi, tôi không thể tạo câu trả lời lúc này.";
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Xin lỗi, đã có lỗi xảy ra khi kết nối với hệ thống AI. Vui lòng báo cáo với ADMIN và thử lại sau.";
  }
};
