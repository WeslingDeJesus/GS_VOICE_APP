export async function previewAudio(payload) {
  const res = await fetch("/api/tts/preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return await res.arrayBuffer();
}

export async function generateFinalAudio(payload) {
  const res = await fetch("/api/tts/text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return res.json();
}