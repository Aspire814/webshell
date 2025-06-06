export interface Theme {
  name: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    accent: string;
    border: string;
    hover: string;
  };
}

export const themes: Record<string, Theme> = {
  'matrix': {
    name: 'Matrix',
    colors: {
      primary: '#00ff00',
      background: 'rgba(0, 0, 0, 0.9)',
      text: '#fff',
      accent: '#00ff00',
      border: '#00ff00',
      hover: '#00ff00'
    }
  },
  'cyberpunk': {
    name: 'Cyberpunk',
    colors: {
      primary: '#ff00ff',
      background: 'rgba(0, 0, 0, 0.9)',
      text: '#fff',
      accent: '#00ffff',
      border: '#ff00ff',
      hover: '#00ffff'
    }
  },
  'retro': {
    name: 'Retro',
    colors: {
      primary: '#ff6b6b',
      background: '#2d3436',
      text: '#dfe6e9',
      accent: '#fdcb6e',
      border: '#ff6b6b',
      hover: '#fdcb6e'
    }
  },
  'monokai': {
    name: 'Monokai',
    colors: {
      primary: '#a6e22e',
      background: '#272822',
      text: '#f8f8f2',
      accent: '#f92672',
      border: '#a6e22e',
      hover: '#f92672'
    }
  }
};

let isApplyingTheme = false;

export function applyTheme(themeName: string) {
  if (isApplyingTheme) return;
  isApplyingTheme = true;

  try {
    const theme = themes[themeName] || themes['matrix'];
    const root = document.documentElement;
    
    // 更新所有 CSS 变量
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}-color`, value);
    });
    
    // 移除旧的样式
    const oldStyle = document.getElementById('theme-style');
    if (oldStyle) {
      oldStyle.remove();
    }
    
    // 创建新的样式元素
    const style = document.createElement('style');
    style.id = 'theme-style';
    style.textContent = `
      body { background: var(--background-color); color: var(--text-color); }
      input { background: var(--background-color); color: var(--text-color); }
      .output { color: var(--text-color); }
      #pre-host, #host, #pre-user, #user, #prompt { color: var(--primary-color); }
      pre { color: var(--accent-color); }
      a { color: var(--primary-color); }
      a:hover { color: var(--hover-color); }
      .command { color: var(--primary-color); }
      .keys { color: var(--accent-color); }
      #bars { background: var(--background-color); }
      main { border-color: var(--border-color); }
      #bar-1 { background: var(--border-color); color: var(--background-color); }
      #bar-2, #bar-3, #bar-4, #bar-5 { background: var(--border-color); }
    `;
    
    // 添加新的样式
    document.head.appendChild(style);
    
    // 保存主题设置到 localStorage
    localStorage.setItem('theme', themeName);
    
    // 触发自定义事件，通知主题已更改
    const event = new CustomEvent('themeChanged', { 
      detail: { theme: themeName },
      bubbles: true
    });
    window.dispatchEvent(event);
  } finally {
    isApplyingTheme = false;
  }
}

export function getCurrentTheme(): string {
  return localStorage.getItem('theme') || 'matrix';
} 