import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function saveAudio(buffer) {
  const id = crypto.randomUUID();
  const filePath = path.resolve("src/storage/audio", `${id}.wav`);

  await fs.promises.writeFile(filePath, buffer, "binary");
  return `${id}.wav`;
}