import axios from 'axios';

/**
 * Evaluate a short answer using Gemini API.
 * Falls back to simple string comparison if API key is missing.
 *
 * @param {string} userAnswer - The answer provided by the student.
 * @param {object} question   - Question object containing `answer` (model answer) and optionally other fields.
 * @returns {Promise<{isCorrect: boolean, feedback: string}>}
 */
export async function evaluateShortAnswer(userAnswer, question) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const trimmedUser = userAnswer.trim();
  const modelAnswer = (question.answer || '').trim();

  // Fallback if no API key
  if (!apiKey) {
    const isCorrect = trimmedUser.toLowerCase() === modelAnswer.toLowerCase();
    const feedback = isCorrect
      ? '✅ সঠিক উত্তর! (কী না থাকলে সরল তুলনা ব্যবহৃত হয়েছে)'
      : `❌ উত্তরটি সঠিক নয়। সঠিক উত্তর: ${modelAnswer}`;
    return { isCorrect, feedback };
  }

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Question: ${question.question}\nStudent answer: ${trimmedUser}\nCorrect answer: ${modelAnswer}\nIs the student's answer correct? Respond with only 'yes' or 'no' and give a short explanation.`
              }
            ]
          }
        ]
      },
      {
        params: { key: apiKey },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const isCorrect = /yes/i.test(text.split('\n')[0]);
    const feedback = isCorrect
      ? '✅ সঠিক উত্তর! (Gemini দ্বারা যাচাই করা হয়েছে)'
      : `❌ উত্তরটি সঠিক নয়। ${text.replace(/yes|no/i, '').trim()}`;
    return { isCorrect, feedback };
  } catch (err) {
    console.error('Gemini evaluation error:', err);
    const isCorrect = trimmedUser.toLowerCase() === modelAnswer.toLowerCase();
    const feedback = isCorrect
      ? '✅ সঠিক উত্তর! (Gemini ত্রুটির কারণে সরল তুলনা ব্যবহৃত হয়েছে)'
      : `❌ উত্তরটি সঠিক নয়। সঠিক উত্তর: ${modelAnswer}`;
    return { isCorrect, feedback };
  }
}
