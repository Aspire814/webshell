import { themes, applyTheme, getCurrentTheme } from '../themes';

export function theme(input: string): string[] {
  if (!input) {
    // 显示当前主题和可用主题列表
    const currentTheme = getCurrentTheme();
    const themeList = Object.entries(themes)
      .map(([key, theme]) => `${key === currentTheme ? '>' : ' '} ${theme.name}`)
      .join('\n');
    
    return [
      '<br>',
      'Available themes:',
      themeList,
      '<br>',
      'Usage: theme &lt;theme-name&gt;',
      '<br>'
    ];
  }

  const themeName = input.trim().toLowerCase();
  if (themes[themeName]) {
    applyTheme(themeName);
    return [
      `<br>`,
      `<span class="success">Theme changed to ${themes[themeName].name}</span>`,
      `<br>`
    ];
  }

  return [
    '<br>',
    '<span class="error">Invalid theme name</span>',
    'Available themes:',
    Object.keys(themes).join(', '),
    '<br>'
  ];
} 