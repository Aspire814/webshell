// 包信息类型定义
interface PackageInfo {
  size: string;
  deps: number;
}

// 模拟的包信息
const PACKAGES: Record<string, PackageInfo> = {
  'react': { size: '2.5MB', deps: 5 },
  'vue': { size: '1.8MB', deps: 3 },
  'angular': { size: '3.2MB', deps: 8 },
  'express': { size: '1.2MB', deps: 4 },
  'lodash': { size: '800KB', deps: 0 },
  'typescript': { size: '1.5MB', deps: 2 },
  'webpack': { size: '2.1MB', deps: 6 },
  'babel': { size: '1.9MB', deps: 4 },
  'jest': { size: '1.7MB', deps: 3 },
  'eslint': { size: '1.1MB', deps: 2 }
};

// 生成随机进度
function getRandomProgress(): number {
  return Math.floor(Math.random() * 30) + 70; // 70-100之间的随机数
}

// 生成安装日志
function generateInstallLog(packageName: string): string[] {
  const logs: string[] = [];
  const packageInfo = PACKAGES[packageName.toLowerCase()] || { size: '1.0MB', deps: 2 };
  
  logs.push(`<span class="npm-info">npm notice</span> created a lockfile as package-lock.json`);
  logs.push(`<span class="npm-info">npm notice</span> You should commit this file.`);
  logs.push(`<br>`);
  
  // 添加包信息
  logs.push(`added ${packageInfo.deps} packages, and audited ${packageInfo.deps + 1} packages in 1s`);
  logs.push(`<br>`);
  
  // 添加进度条
  logs.push(`<div class="npm-progress">`);
  logs.push(`  <div class="npm-progress-bar" style="width: ${getRandomProgress()}%"></div>`);
  logs.push(`</div>`);
  logs.push(`<br>`);
  
  // 添加包大小信息
  logs.push(`<span class="npm-success">+ ${packageName}@latest</span> ${packageInfo.size}`);
  logs.push(`<br>`);
  
  // 添加完成信息
  logs.push(`<span class="npm-success">✓ All packages installed successfully!</span>`);
  logs.push(`<br>`);
  
  return logs;
}

// 主函数
export function npm(input: string): string[] {
  if (!input.startsWith('npm install ')) {
    return [
      '<span class="npm-error">Error: Invalid command</span>',
      'Usage: npm install &lt;package-name&gt;',
      '<br>'
    ];
  }

  const packageName = input.slice(8).trim();
  if (!packageName) {
    return [
      '<span class="npm-error">Error: Package name required</span>',
      'Usage: npm install &lt;package-name&gt;',
      '<br>'
    ];
  }

  // 模拟安装延迟
  return generateInstallLog(packageName);
} 