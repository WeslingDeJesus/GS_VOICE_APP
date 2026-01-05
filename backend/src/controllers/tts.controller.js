import { buildSSML } from "../services/ssml.service.js";
import { synthesizeSpeech } from "../services/tts.service.js";
import { saveAudio } from "../services/audio.service.js";
import { extractTextFromPdf } from "../services/pdf.service.js";

/* =============================
   TEXT → AUDIO
============================= */
export async function generateAudioFromText(req, res) {
  try {
    const { text, voice, emotion } = req.body;

    const ssml = buildSSML(text, emotion);
    const audioBuffer = await synthesizeSpeech({ ssml, voice });

    const filename = await saveAudio(audioBuffer);

    res.json({
      success: true,
      filename
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* =============================
   PDF → TEXT
============================= */
export async function pdfToText(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required"
      });
    }

    const text = await extractTextFromPdf(req.file.buffer);

    res.json({
      success: true,
      text
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

/* =============================
   PREVIEW (streaming)
============================= */
export async function previewSpeech(req, res) {
  try {
    const { text, voice, emotion } = req.body;

    const ssml = buildSSML(text, emotion);
    const audioBuffer = await synthesizeSpeech({ ssml, voice });

    res.set({
      "Content-Type": "audio/wav",
      "Content-Length": audioBuffer.length
    });

    res.send(audioBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}