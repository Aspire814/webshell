const jokes = [
  {
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs!"
  },
  {
    setup: "How many programmers does it take to change a light bulb?",
    punchline: "None, that's a hardware problem!"
  },
  {
    setup: "Why did the programmer quit their job?",
    punchline: "Because they didn't get arrays (a raise)!"
  },
  {
    setup: "What do you call a computer that sings?",
    punchline: "A Dell!"
  },
  {
    setup: "Why was the JavaScript developer sad?",
    punchline: "Because they didn't know how to 'null' their feelings!"
  },
  {
    setup: "What did the Java Code say to the C code?",
    punchline: "You've got no class!"
  },
  {
    setup: "Why do programmers always mix up Halloween and Christmas?",
    punchline: "Because Oct 31 == Dec 25!"
  },
  {
    setup: "What's the best thing about a Boolean?",
    punchline: "Even if you're wrong, you're only off by a bit!"
  }
];

export const createJoke = () : string[] => {
  const joke : string[] = [];
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  
  joke.push("<br>");
  joke.push(`<span class='bounce'>${randomJoke.setup}</span>`);
  joke.push("<br>");
  setTimeout(() => {
    joke.push(`<span class='command'>${randomJoke.punchline}</span>`);
    joke.push("<br>");
  }, 1000);
  
  return joke;
} 