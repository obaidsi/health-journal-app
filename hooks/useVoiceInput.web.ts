import { useCallback, useEffect, useRef, useState } from 'react';

export function useVoiceInput(onResult: (text: string) => void) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    setSupported(true);
    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ');
      onResult(transcript);
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
    return () => {
      recognition.stop();
    };
  }, [onResult]);

  const start = useCallback(() => {
    const recognition = recognitionRef.current;
    if (recognition && !listening) {
      setListening(true);
      recognition.start();
    }
  }, [listening]);

  const stop = useCallback(() => {
    const recognition = recognitionRef.current;
    if (recognition && listening) {
      recognition.stop();
      setListening(false);
    }
  }, [listening]);

  return {
    start,
    stop,
    listening,
    supported,
  };
}
