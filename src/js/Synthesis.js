export default function speak(word) {
  const s = window.speechSynthesis;
  const speakText = new SpeechSynthesisUtterance("spell," + word);
  speakText.voice = s.getVoices()[1];
  s.speak(speakText);
}
