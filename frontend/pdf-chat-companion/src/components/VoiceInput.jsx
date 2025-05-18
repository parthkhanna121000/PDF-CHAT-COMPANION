import React from "react";

const VoiceInput = ({ setInput }) => {
  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("❌ Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("🎙️ Voice recognition started");
    };

    recognition.onspeechend = () => {
      console.log("🛑 Speech ended");
      recognition.stop();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("✅ Transcript received:", transcript);
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
      alert("Error using voice input. Check mic permissions or try again.");
    };

    recognition.onend = () => {
      console.log("🎤 Recognition stopped");
    };

    recognition.start();
  };

  return (
    <button
      onClick={handleVoice}
      className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-2 rounded-full hover:bg-gray-400 transition"
      title="Voice Input"
    >
      🎤
    </button>
  );
};

export default VoiceInput;
