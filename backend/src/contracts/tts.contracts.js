import { z } from "zod";

/* =============================
   BLOCK (personaje / voz)
============================= */
export const TTSBlockSchema = z.object({
  id: z.string(),
  voice: z.object({
    languageCode: z.string(),
    name: z.string()
  }),
  emotion: z.enum([
    "neutral",
    "calm",
    "happy",
    "enthusiastic",
    "sad"
  ]).optional(),
  text: z.string().min(1)
});

/* =============================
   REQUEST: Texto → Audio
============================= */
export const TTSTextRequestSchema = z.object({
  blocks: z.array(TTSBlockSchema).min(1),
  output: z.object({
    format: z.enum(["wav", "mp3"]),
    sampleRate: z.number().optional()
  })
});

/* =============================
   RESPONSE: Audio generado
============================= */
export const TTSTextResponseSchema = z.object({
  success: z.boolean(),
  audio: z.object({
    filename: z.string(),
    duration: z.number(),
    url: z.string()
  })
});

/* =============================
   PREVIEW REQUEST
============================= */
export const TTSPreviewRequestSchema = z.object({
  text: z.string(),
  voice: z.object({
    languageCode: z.string(),
    name: z.string()
  }),
  emotion: z.string().optional()
});