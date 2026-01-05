import pdf from "pdf-parse";

/**
 * Extrae texto limpio desde un PDF
 * @param {Buffer} fileBuffer
 * @returns {Promise<string>}
 */
export const extractTextFromPdf = async (fileBuffer) => {
  const data = await pdf(fileBuffer);

  return data.text
    .replace(/\s+/g, " ")
    .trim();
};