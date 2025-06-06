import command from '../config.json' assert {type: 'json'};

(() => {
  const style = document.createElement('style')
  const head = document.head
  
  // 使用 CSS 变量
  const root = document.documentElement;
  root.style.setProperty('--primary-color', command.colors.prompt.default);
  root.style.setProperty('--background-color', command.colors.background);
  root.style.setProperty('--text-color', command.colors.foreground);
  root.style.setProperty('--accent-color', command.colors.banner);
  root.style.setProperty('--border-color', command.colors.border.color);
  root.style.setProperty('--hover-color', command.colors.link.highlightText);

  const background = `body {background: var(--background-color)}`
  const foreground = `body {color: var(--text-color)}`
  const inputBackground = `input {background: var(--background-color)}`
  const inputForeground = `input {color: var(--text-color)}`
  const outputColor = `.output {color: var(--text-color)}`
  const preHost = `#pre-host {color: var(--primary-color)}`
  const host = `#host {color: var(--primary-color)}`
  const preUser = `#pre-user {color: var(--primary-color)}`
  const user = `#user {color: var(--primary-color)}`
  const prompt = `#prompt {color: var(--primary-color)}`
  const banner = `pre {color: var(--accent-color)}`
  const link = `a {color: var(--primary-color)}`
  const linkHighlight = `a:hover {background: var(--background-color)}`
  const linkTextHighlight = `a:hover {color: var(--hover-color)}`
  const commandHighlight = `.command {color: var(--primary-color)}`
  const keys = `.keys {color: var(--accent-color)}`

  head.appendChild(style)

  if (!style.sheet) return

  if (!command.colors.border.visible) {
    style.sheet.insertRule("#bars {display: none}")    
    style.sheet.insertRule("main {border: none}")
  } else {
    style.sheet.insertRule(`#bars {background: var(--background-color)}`)
    style.sheet.insertRule(`main {border-color: var(--border-color)}`)
    style.sheet.insertRule(`#bar-1 {background: var(--border-color); color: var(--background-color)}`)
    style.sheet.insertRule(`#bar-2 {background: var(--border-color)}`)
    style.sheet.insertRule(`#bar-3 {background: var(--border-color)}`)
    style.sheet.insertRule(`#bar-4 {background: var(--border-color)}`)
    style.sheet.insertRule(`#bar-5 {background: var(--border-color)}`)
  }

  style.sheet.insertRule(background)
  style.sheet.insertRule(foreground)
  style.sheet.insertRule(inputBackground)
  style.sheet.insertRule(inputForeground)
  style.sheet.insertRule(outputColor)
  style.sheet.insertRule(preHost)
  style.sheet.insertRule(host)
  style.sheet.insertRule(preUser)
  style.sheet.insertRule(user)
  style.sheet.insertRule(prompt)
  style.sheet.insertRule(banner)
  style.sheet.insertRule(link)
  style.sheet.insertRule(linkHighlight)
  style.sheet.insertRule(linkTextHighlight)
  style.sheet.insertRule(commandHighlight)
  style.sheet.insertRule(keys)
})()
