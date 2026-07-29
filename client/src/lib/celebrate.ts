import confetti from "canvas-confetti";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Two party-popper bursts from the bottom corners plus a short center shower — the classic
 * "level complete" celebration. No-ops when the user prefers reduced motion.
 */
export function fireConfetti(): void {
  if (prefersReducedMotion()) return;

  const base: confetti.Options = {
    spread: 60,
    startVelocity: 55,
    ticks: 200,
    zIndex: 9999,
    colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"],
  };

  // Party poppers angled in from each bottom corner.
  confetti({ ...base, particleCount: 90, angle: 60, origin: { x: 0, y: 1 } });
  confetti({ ...base, particleCount: 90, angle: 120, origin: { x: 1, y: 1 } });

  // A second wave from the top center a moment later, for a fuller shower.
  window.setTimeout(() => {
    confetti({
      ...base,
      particleCount: 120,
      spread: 100,
      angle: 90,
      startVelocity: 45,
      origin: { x: 0.5, y: 0 },
    });
  }, 250);
}

/**
 * A short, pleasant "ta-da" congratulation chime synthesised with the Web Audio API — no
 * audio asset to ship or fail to load. Fires on a rising C-E-G-C arpeggio. Safe to call
 * from a click/save handler (there's a user gesture, so autoplay policies allow it);
 * silently no-ops if Web Audio isn't available.
 */
export function playSuccessChime(): void {
  if (prefersReducedMotion()) return;
  try {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // C5, E5, G5, C6 — a bright major arpeggio.
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const noteDur = 0.13;
    const start = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;

      const t0 = start + i * noteDur;
      const t1 = t0 + noteDur * 1.6;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.28, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t1);

      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t1);
    });

    // Release the context shortly after the last note finishes.
    window.setTimeout(() => ctx.close().catch(() => {}), (notes.length * noteDur + 0.4) * 1000);
  } catch {
    // Audio is a nice-to-have — never let it break the completion flow.
  }
}

/** Fire the full celebration: party poppers + congratulation chime. */
export function celebrateCompletion(): void {
  fireConfetti();
  playSuccessChime();
}
