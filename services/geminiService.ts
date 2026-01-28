
import { GoogleGenAI } from "@google/genai";
import { DiseaseResult, GroundingSource } from "../types";

export const searchMedicalInfo = async (query: string): Promise<DiseaseResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    คุณเป็นผู้ช่วยผู้เชี่ยวชาญด้านข้อมูลทางการแพทย์ที่ให้ข้อมูลแม่นยำและเป็นปัจจุบัน
    หน้าที่ของคุณคือ:
    1. อธิบายรายละเอียดของโรค (ความหมาย, อาการ, สาเหตุ)
    2. วิธีการวินิจฉัยเบื้องต้น
    3. แนวทางการรักษาทางการแพทย์
    4. การดูแลตัวเองและการปฐมพยาบาลเบื้องต้น (First Aid)
    5. คำแนะนำในการป้องกัน
    
    กฎสำคัญ:
    - ตอบเป็นภาษาไทยที่อ่านง่ายและเป็นมืออาชีพ
    - ต้องมีคำเตือนเสมอว่า "ข้อมูลนี้ไม่ใช่คำวินิจฉัยของแพทย์ โปรดปรึกษาบุคลากรทางการแพทย์เพื่อการวินิจฉัยที่ถูกต้อง"
    - ใช้ Google Search เพื่อหาข้อมูลที่ทันสมัยที่สุด
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `กรุณาให้ข้อมูลเกี่ยวกับ: ${query}`,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const content = response.text || "ไม่พบข้อมูลที่ต้องการ";
    
    // Extract sources from grounding metadata
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          // Avoid duplicates
          if (!sources.find(s => s.uri === chunk.web.uri)) {
            sources.push({
              title: chunk.web.title,
              uri: chunk.web.uri
            });
          }
        }
      });
    }

    return {
      content,
      sources,
      timestamp: new Date().toLocaleTimeString('th-TH')
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง");
  }
};
