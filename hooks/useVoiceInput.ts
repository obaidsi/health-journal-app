export function useVoiceInput(_: (text: string) => void) {
  return {
    start: () => {},
    stop: () => {},
    listening: false,
    supported: false,
  };
}
