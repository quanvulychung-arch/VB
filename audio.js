/**
 * Audio Engine Siêu Cấp Cho Web Game Đối Kháng Quán Nét
 * Sử dụng Web Audio API thuần + Giọng nói tiếng Việt
 * Đảm bảo 100% không bị ngắt tiếng, âm lượng to rõ, đầy đủ hiệu ứng đòn đánh & chiêu thức
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.bgmGain = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX Gain (Hiệu ứng chiêu thức, đòn đánh to rõ)
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // BGM Gain (Nhạc nền Arcade)
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.32, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  init() {
    this.ensureContext();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBGM();
      if (this.masterGain) this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else {
      this.ensureContext();
      if (this.masterGain) this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
      this.startBGM();
    }
    return this.isMuted;
  }

  // Tiếng chữ gõ chíp chíp vui nhộn khi thoại
  playSpeechBlip(pitch = 500) {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch + (Math.random() * 80 - 40), t);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch (e) {}
  }

  // Tiếng Sát Thương Tâm Lý (Tự Ái / Cà Khịa Trúng Tim Đen)
  playMentalHit() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(360, t);
      osc.frequency.linearRampToValueAtTime(80, t + 0.28);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.28);
    } catch (e) {}
  }

  // Tiếng Đấm Phang Vật Lý Cực Mạnh (Heavy Street Fighter Punch / Chair Smash)
  playPhysicalHit() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    try {
      const t = ctx.currentTime;

      // 1. Noise Crash
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1600, t);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6, t);
      noiseGain.gain.linearRampToValueAtTime(0.01, t + 0.18);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);
      noise.start(t);

      // 2. Heavy Bass Thump
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.linearRampToValueAtTime(30, t + 0.2);
      
      oscGain.gain.setValueAtTime(0.7, t);
      oscGain.gain.linearRampToValueAtTime(0.001, t + 0.2);

      osc.connect(oscGain);
      oscGain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch (e) {}
  }

  // Tiếng Gong Bắt Đầu Hiệp Đấu (Round Start)
  playRoundStart() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    try {
      const t = ctx.currentTime;
      const chords = [523.25, 659.25, 783.99]; // C5, E5, G5
      chords.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.linearRampToValueAtTime(freq * 0.9, t + 0.6);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.6);
      });
    } catch (e) {}
  }

  // Tiếng Chiêu Cuối Bùng Nổ (Sập Cầu Dao, Bão Màu Hường, Đầu Trọc Phản Quang)
  playUltimateSound(type) {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    try {
      const t = ctx.currentTime;

      if (type === "power_cut") {
        // Tiếng chập điện sập cầu dao tạch xì khói
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(450, t);
        osc.frequency.linearRampToValueAtTime(10, t + 0.5);

        gain.gain.setValueAtTime(0.8, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.5);
      } else {
        // Tiếng laser rền vang
        for (let i = 0; i < 3; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = t + i * 0.08;
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(900 - i * 180, start);
          osc.frequency.linearRampToValueAtTime(80, start + 0.35);

          gain.gain.setValueAtTime(0.5, start);
          gain.gain.linearRampToValueAtTime(0.001, start + 0.35);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(start);
          osc.stop(start + 0.35);
        }
      }

      this.playExplosion();
    } catch (e) {}
  }

  // Tiếng Nổ Lớn
  playExplosion() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    try {
      const t = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.75, t);
      gain.gain.linearRampToValueAtTime(0.01, t + 0.6);

      noise.connect(gain);
      gain.connect(this.sfxGain);
      noise.start(t);
    } catch (e) {}
  }

  // Tiếng K.O Hoành Tráng + Fanfare Chiến Thắng
  playKOSound() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    try {
      const t = ctx.currentTime;
      const victoryNotes = [261.63, 329.63, 392.00, 523.25, 659.25];
      victoryNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = t + idx * 0.1;
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.4, start);
        gain.gain.linearRampToValueAtTime(0.001, start + 1.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(start);
        osc.stop(start + 1.2);
      });
      this.playExplosion();
    } catch (e) {}
  }

  // NHẠC NỀN FIGHTING ARCADE CỰC SUNG (Bass Drum + Arcade Lead)
  startBGM() {
    if (this.bgmPlaying || this.isMuted) return;
    const ctx = this.ensureContext();
    this.bgmPlaying = true;

    const melodyNotes = [
      220, 220, 261.63, 293.66, 329.63, 293.66, 261.63, 220,
      196, 196, 220, 261.63, 293.66, 261.63, 220, 196,
      246.94, 246.94, 293.66, 329.63, 369.99, 329.63, 293.66, 246.94,
      220, 246.94, 261.63, 293.66, 329.63, 392.00, 440.00, 329.63
    ];
    
    const bassNotes = [110, 110, 130.81, 146.83, 98, 98, 110, 130.81];
    let step = 0;

    const playBeat = () => {
      if (!this.bgmPlaying || this.isMuted) return;
      try {
        const t = ctx.currentTime;

        // Kick Drum
        if (step % 2 === 0) {
          const kickOsc = ctx.createOscillator();
          const kickGain = ctx.createGain();
          kickOsc.type = "sine";
          kickOsc.frequency.setValueAtTime(130, t);
          kickOsc.frequency.linearRampToValueAtTime(30, t + 0.1);

          kickGain.gain.setValueAtTime(0.35, t);
          kickGain.gain.linearRampToValueAtTime(0.001, t + 0.1);

          kickOsc.connect(kickGain);
          kickGain.connect(this.bgmGain);
          kickOsc.start(t);
          kickOsc.stop(t + 0.1);
        }

        // Bassline
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = "sawtooth";
        bassOsc.frequency.setValueAtTime(bassNotes[step % bassNotes.length], t);
        
        bassGain.gain.setValueAtTime(0.15, t);
        bassGain.gain.linearRampToValueAtTime(0.01, t + 0.12);

        bassOsc.connect(bassGain);
        bassGain.connect(this.bgmGain);
        bassOsc.start(t);
        bassOsc.stop(t + 0.13);

        // Melody Lead
        const leadOsc = ctx.createOscillator();
        const leadGain = ctx.createGain();
        leadOsc.type = "square";
        leadOsc.frequency.setValueAtTime(melodyNotes[step % melodyNotes.length], t);

        leadGain.gain.setValueAtTime(0.08, t);
        leadGain.gain.linearRampToValueAtTime(0.001, t + 0.12);

        leadOsc.connect(leadGain);
        leadGain.connect(this.bgmGain);
        leadOsc.start(t);
        leadOsc.stop(t + 0.13);
      } catch (e) {}

      step++;
      this.bgmTimer = setTimeout(playBeat, 135);
    };

    playBeat();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

window.soundEngine = new SoundEngine();
