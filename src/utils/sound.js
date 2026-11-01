// Web Audio API synthesizer for tactile game feedback
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  getContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  playTones(freqs, type = 'sine', step = 0.08, duration = 0.25, volume = 0.1) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + idx * step);
        gain.gain.setValueAtTime(0, now + idx * step);
        gain.gain.linearRampToValueAtTime(volume, now + idx * step + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * step + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * step);
        osc.stop(now + idx * step + duration + 0.01);
      });
    } catch {
      // Audio context silenced or blocked
    }
  }

  playClick() { this.playTones([600], 'sine', 0, 0.05, 0.06); }
  playSuccess() { this.playTones([523.25, 659.25, 783.99], 'triangle', 0.08, 0.25, 0.12); }
  playError() { this.playTones([160, 110], 'sawtooth', 0.06, 0.18, 0.08); }
  playLevelUp() { this.playTones([440, 554.37, 659.25, 880], 'sine', 0.07, 0.5, 0.14); }
  playDetectiveCatch() { this.playTones([880, 1760], 'sine', 0.08, 0.3, 0.12); }
}

export const sound = new SoundManager();
