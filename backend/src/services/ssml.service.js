const EMOTIONS = {
  neutral: { rate: "1", pitch: "0st" },
  happy: { rate: "1.1", pitch: "+3st" },
  enthusiastic: { rate: "1.2", pitch: "+4st" },
  calm: { rate: "0.95", pitch: "+1st" },
  serious: { rate: "0.9", pitch: "-1st" }
};

export function buildSSML(text, emotion = "neutral") {
  const e = EMOTIONS[emotion] || EMOTIONS.neutral;

  return `
<speak>
  <prosody rate="${e.rate}" pitch="${e.pitch}">
    ${text}
  </prosody>
</speak>
`;
}