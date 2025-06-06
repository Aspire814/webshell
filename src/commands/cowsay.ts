export const cowsay = (msg: string = 'Moo!') : string[] => {
  // Limit message length for display
  const maxLen = 40;
  let message = msg.length > maxLen ? msg.slice(0, maxLen) + '...' : msg;
  // Pad message for the bubble
  const bubble = `  ${'_'.repeat(message.length + 2)}\n< ${message} >\n  ${'-'.repeat(message.length + 2)}`;
  const cow = `\n        \   ^__^\n         \  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||\n`;
  return [
    '<br>',
    `<pre class='cowsay'>${bubble}${cow}</pre>`,
    '<br>'
  ];
} 