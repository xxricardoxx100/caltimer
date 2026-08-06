// Sonidos de la subasta, sintetizados con Web Audio API (sin archivos externos).

let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

const playTone = (ctx, { freq, start = 0, duration, type = "sine", peakGain = 0.2 }) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);

  const t0 = ctx.currentTime + start;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peakGain, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
};

/** Campanita al hacer una puja (dos armónicos tipo "ding"). */
export function playBidSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  playTone(ctx, { freq: 1318.5, duration: 0.45, peakGain: 0.2 });
  playTone(ctx, { freq: 1975.5, duration: 0.35, peakGain: 0.12 });
}

/** Secuencia descendente al finalizar la subasta. */
export function playAuctionEndSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  playTone(ctx, { freq: 880, start: 0, duration: 0.35, type: "triangle", peakGain: 0.22 });
  playTone(ctx, { freq: 659.25, start: 0.18, duration: 0.35, type: "triangle", peakGain: 0.22 });
  playTone(ctx, { freq: 440, start: 0.36, duration: 0.6, type: "triangle", peakGain: 0.25 });
}
