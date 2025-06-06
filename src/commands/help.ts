const helpObj = {
  "commands": [
    [
    "'about'",
    "Who made this website?",
    ],
    [
      "'projects'",
      "Maybe there's something interesting."
    ],
    [
      "'whoami'",
      "A perplexing question."
    ],
    ["'sudo'",
      "???"
    ],
    [
      "'repo'",
      "View the Github Repository."
    ],
    ["'banner'",
      "Display the banner."
    ],
    [
      "'clear'",
      "Clear the terminal."
    ],
    [
      "'fortune'",
      "Get your daily fortune."
    ],
    [
      "'matrix'",
      "Enter the Matrix..."
    ],
    [
      "'joke'",
      "Get a programming joke."
    ],
    [
      "'ascii-art'",
      "Display some ASCII art."
    ],
    [
      "'cowsay [text]'",
      "A talking cow!"
    ],
    [
      "'sl'",
      "Steam Locomotive!"
    ],
    [
      "'glitch [text]'",
      "Apply glitch effect to text"
    ],
    [
      "'npm'",
      "Simulate npm package installation"
    ],
    [
      "'page [name]'",
      "Display a specific page (e.g., page about)"
    ],
    [
      "'theme [name]'",
      "Change terminal theme (e.g., theme matrix)"
    ]
  ],
}

const createHelp = () : string[] => {
  const help : string[] = []
  help.push("<br>")

  helpObj.commands.forEach((ele) => {
    const SPACE = "&nbsp;";
    let string = "";
    string += SPACE.repeat(2);
    string += "<span class='command'>";
    string += ele[0];
    string += "</span>";
    string += SPACE.repeat(17 - ele[0].length);
    string += ele[1];
    help.push(string);
  })

  help.push("<br>");
  help.push("Press <span class='keys'>[Tab]</span> for auto completion.");
  help.push("Press <span class='keys'>[Esc]</span> to clear the input line.");
  help.push("Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands.");
  help.push("<br>");
  return help
}

export const HELP = createHelp();
