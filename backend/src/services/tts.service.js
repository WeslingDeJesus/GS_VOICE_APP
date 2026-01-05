import { ttsClient } from "../config/googleTTS.js";

export async function synthesizeSpeech({ ssml, voice }) {
  const request = {
    model: "gemini-2.5-flash-tts",
    input: { ssml },
    voice: {
      languageCode: voice.languageCode,
      name: voice.name
    },
    audioConfig: {
      audioEncoding: "LINEAR16",
      sampleRateHertz: 44100
    }
  };

  const [response] = await ttsClient.synthesizeSpeech(request);
  return response.audioContent;
}