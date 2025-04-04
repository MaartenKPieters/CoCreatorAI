// /pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  const prompt = `
You are a practical, business-oriented learning coach based on the book "The 7 Principles of Complete Co-Creation."
Help the user understand and apply Principle 1: Awareness in the context of business, innovation, leadership, creating change, and value creation.
Use a clear, results-driven tone. Offer examples and practical advice. Avoid spiritual or abstract language.

User's question: "${message}"
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  res.status(200).json({ reply });
}
