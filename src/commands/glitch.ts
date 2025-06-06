// 故障效果配置
const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

// 生成随机故障字符
function getRandomGlitchChar(): string {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

// 生成随机颜色
function getRandomColor(): string {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 创建故障效果
function createGlitchEffect(text: string): string {
  const lines = text.split('\n');
  const glitchedLines = lines.map(line => {
    // 随机选择要故障的字符
    const glitchCount = Math.floor(Math.random() * (line.length / 2)) + 1;
    const glitchPositions = new Set<number>();
    
    while (glitchPositions.size < glitchCount) {
      glitchPositions.add(Math.floor(Math.random() * line.length));
    }
    
    // 应用故障效果
    return line.split('').map((char, index) => {
      if (glitchPositions.has(index)) {
        const color = getRandomColor();
        const glitchChar = getRandomGlitchChar();
        return `<span style="color: ${color}; text-shadow: 2px 0 ${color}, -2px 0 ${color};">${glitchChar}</span>`;
      }
      return char;
    }).join('');
  });
  
  return glitchedLines.join('\n');
}

// 创建扫描线效果
function createScanlineEffect(): string {
  const scanline = document.createElement('div');
  scanline.className = 'glitch-scanline';
  scanline.style.position = 'absolute';
  scanline.style.top = '0';
  scanline.style.left = '0';
  scanline.style.width = '100%';
  scanline.style.height = '2px';
  scanline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  scanline.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
  scanline.style.animation = 'scanline 2s linear infinite';
  
  return scanline.outerHTML;
}

// 创建故障容器
function createGlitchContainer(content: string): string {
  const container = document.createElement('div');
  container.className = 'glitch-container';
  container.style.position = 'relative';
  container.style.padding = '20px';
  container.style.backgroundColor = '#000';
  container.style.color = '#fff';
  container.style.fontFamily = 'monospace';
  container.style.overflow = 'hidden';
  
  // 添加内容
  container.innerHTML = content;
  
  // 添加扫描线
  container.innerHTML += createScanlineEffect();
  
  return container.outerHTML;
}

// 主函数
export function glitch(text: string): string[] {
  if (!text) {
    return ['<span class="error">Please provide text to glitch!</span>'];
  }
  
  // 创建故障效果
  const glitchedContent = createGlitchEffect(text);
  
  // 创建容器
  const container = createGlitchContainer(glitchedContent);
  
  // 添加 CSS 动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    
    .glitch-container {
      animation: glitch 0.3s infinite;
    }
    
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
  `;
  
  return [
    '<br>',
    style.outerHTML,
    container,
    '<br>'
  ];
} 