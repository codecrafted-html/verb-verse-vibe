
export const playCorrectSound = () => {
  try {
    // Create correct answer sound (Duolingo-style success)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Resume context if suspended (required for some browsers)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // Play uplifting melody - C major arpeggio
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const currentTime = audioContext.currentTime;
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, currentTime);
      oscillator.type = 'sine';
      
      // Smooth volume envelope
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, currentTime + index * 0.08 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + index * 0.08 + 0.25);
      
      oscillator.start(currentTime + index * 0.08);
      oscillator.stop(currentTime + index * 0.08 + 0.3);
    });
  } catch (error) {
    console.log('Could not play correct sound:', error);
  }
};

export const playIncorrectSound = () => {
  try {
    // Create incorrect answer sound (Duolingo-style error)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Resume context if suspended
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // Play descending disappointed sound
    const frequencies = [523.25, 466.16, 415.30]; // C5, Bb4, Ab4
    const currentTime = audioContext.currentTime;
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, currentTime);
      oscillator.type = 'sawtooth';
      
      // Disappointed volume envelope
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, currentTime + index * 0.12 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + index * 0.12 + 0.4);
      
      oscillator.start(currentTime + index * 0.12);
      oscillator.stop(currentTime + index * 0.12 + 0.45);
    });
  } catch (error) {
    console.log('Could not play incorrect sound:', error);
  }
};
