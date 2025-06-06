const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

export const createMatrixRain = () : string[] => {
  const matrix : string[] = [];
  matrix.push("<br>");
  
  // Create a full screen matrix effect
  const lines = 30; // Number of lines
  // Calculate columns based on screen width
  const charWidth = 8; // Reduced character width for better fit
  const screenWidth = window.innerWidth - 40; // Account for margins
  const columns = Math.floor(screenWidth / charWidth);
  
  for (let i = 0; i < lines; i++) {
    let line = "";
    for (let j = 0; j < columns; j++) {
      // Add some randomness to make it look more natural
      if (Math.random() > 0.7) {
        line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
      } else {
        line += " ";
      }
    }
    matrix.push(`<span class='matrix'>${line}</span>`);
  }
  
  matrix.push("<br>");
  return matrix;
}

export const MATRIX = createMatrixRain(); 