
function playSound(src: string) {
  if (typeof window !== "undefined") {
    fetch(src, { method: "HEAD" })
      .then(res => {
        if (res.ok) {
          const audio = new Audio(src);
          audio.play();
        }
      })
      .catch(() => {
        // fallback: no sound
      });
  }
}

export function playCorrect() {
  playSound("/sound/correct-answer.mp3");
}

export function playWrong() {
  playSound("/sound/incorrect-answer-sound-with-error-for-presentations.mp3");
}

