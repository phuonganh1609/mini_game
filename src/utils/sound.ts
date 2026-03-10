


"use client";

class AudioManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private started = false;

  init() {
    if (this.started) return;

    this.sounds = {
      thinking: new Audio("/sound/Question - Millionaire.mp3"),
      correct: new Audio("/sound/Correct - Millionaire.mp3"),
      wrong: new Audio("/sound/Wrong - Millionaire.mp3"),
      lifeline: new Audio("/sound/milionerzy głosowanie publiczności.mp3"),
      win: new Audio("/sound/Jackpot - Millionaire.mp3"),
      timeout: new Audio("/sound/- Millionaire.mp3"),
      welcome: new Audio("/sound/Who Wants To Be A Millionaire - Commercial Break.mp3"),
    };

    this.sounds.thinking.loop = true;

    this.started = true;
  }

  play(name: string) {
    const sound = this.sounds[name];
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  stop(name: string) {
    const sound = this.sounds[name];
    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;
  }

  stopAll() {
    Object.values(this.sounds).forEach((s) => {
      s.pause();
      s.currentTime = 0;
    });
  }
}

export const audioManager = new AudioManager();