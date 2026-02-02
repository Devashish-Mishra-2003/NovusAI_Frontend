export async function callSynthesis(message: string, conversationId?: string) {
  const res = await fetch("https://novusai-backend.onrender.com/api/synthesize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      conversation_id: conversationId ?? null,
    }),
  });

  if (!res.ok) {
    throw new Error("Synthesis request failed");
  }

  return res.json();
}
