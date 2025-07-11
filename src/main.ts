import command from '../config.json' assert {type: 'json'};
import { HELP } from "./commands/help";
import { BANNER } from "./commands/banner";
import { ABOUT } from "./commands/about"
import { DEFAULT } from "./commands/default";
import { PROJECTS } from "./commands/projects";
import { createWhoami } from "./commands/whoami";
import { createFortune } from "./commands/fortune";
import { createMatrixRain } from "./commands/matrix";
import { createJoke } from "./commands/joke";
import { cowsay } from "./commands/cowsay";
import { trainFrames } from "./commands/sl";
import { glitch } from './commands/glitch';
import { npm } from './commands/npm';
import { info } from './commands/info';
import { theme } from './commands/theme';
import { applyTheme, getCurrentTheme } from './themes';

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0
let tempInput = ""
let userInput : string;
let isSudo = false;
let isPasswordInput = false;
let passwordCounter = 0;
let bareMode = false;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const INPUT_HIDDEN = document.getElementById("input-hidden");
const PASSWORD = document.getElementById("password-input");
const PASSWORD_INPUT = document.getElementById("password-field") as HTMLInputElement;
const PRE_HOST = document.getElementById("pre-host");
const PRE_USER = document.getElementById("pre-user");
const HOST = document.getElementById("host");
const USER = document.getElementById("user");
const PROMPT = document.getElementById("prompt");
const COMMANDS = ["help", "about", "projects", "whoami", "repo", "banner", "clear", "fortune", "matrix", "weather", "joke", "ascii-art", "glitch", "npm", "page", "theme"];
const HISTORY : string[] = [];
const SUDO_PASSWORD = command.password;
const REPO_LINK = command.repoLink;

let matrixInterval: number | null = null;
let slInterval: number | null = null;

function stopMatrixEffect() {
  if (matrixInterval) {
    clearInterval(matrixInterval);
    matrixInterval = null;
  }
}

function startMatrixEffect() {
  if (matrixInterval) return;
  
  matrixInterval = setInterval(() => {
    if (!mutWriteLines) return;
    const matrix = createMatrixRain();
    writeLines(matrix);
  }, 100);
}

function stopSL() {
  if (slInterval) {
    clearInterval(slInterval);
    slInterval = null;
  }
}

const scrollToBottom = () => {
  const MAIN = document.getElementById("main");
  if(!MAIN) return

  MAIN.scrollTop = MAIN.scrollHeight;
}

function userInputHandler(e : KeyboardEvent) {
  const key = e.key;

  switch(key) {
    case "Enter":
      e.preventDefault();
      if (!isPasswordInput) {
        enterKey();
      } else {
        passwordHandler();
      }

      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      break;
    case "ArrowUp":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "ArrowDown":
      arrowKeys(key);
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }
}

function enterKey() {
  if (!mutWriteLines || !PROMPT) return
  const resetInput = "";
  let newUserInput;
  userInput = USERINPUT.value;

  if (bareMode) {
    newUserInput = userInput;
  } else {
    newUserInput = `<span class='output'>${userInput}</span>`;
  }

  HISTORY.push(userInput);
  historyIdx = HISTORY.length

  //if clear then early return
  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    return
  }

  const div = document.createElement("div");
  div.innerHTML = `<span id="prompt">${PROMPT.innerHTML}</span> ${newUserInput}`;

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  /*
  if input is empty or a collection of spaces, 
  just insert a prompt before #write-lines
  */
  if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
    }
  
  USERINPUT.value = resetInput;
  userInput = resetInput; 
}

function tabKey() {
  let currInput = USERINPUT.value;

  for (const ele of COMMANDS) {
    if(ele.startsWith(currInput)) {
      USERINPUT.value = ele;
      return
    }
  }
}

function arrowKeys(e : string) {
  switch(e){
    case "ArrowDown":      
      if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          USERINPUT.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;  
      }      
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
      }
      break;
  }
}

function commandHandler(input : string) {
  if (input.startsWith('info')) {
    if (bareMode) {
      writeLines(["<span class='warning'>No info in the dark.</span>", "<br>"])
      return;
    }
    const lang = input.split(" ")[1];
    writeLines(info(lang));
    return;
  }

  if (input.startsWith('npm ')) {
    if (bareMode) {
      writeLines(["<span class='warning'>No npm in the dark.</span>", "<br>"])
      return;
    }
    writeLines(npm(input));
    return;
  }

  if (input.startsWith('glitch')) {
    if (bareMode) {
      writeLines(["<span class='warning'>No glitch effects in the dark.</span>", "<br>"])
      return;
    }
    const text = input.length > 6 ? input.slice(6).trim() : 'Hello World!';
    writeLines(glitch(text));
    return;
  }

  if(input.startsWith("rm -rf") && input.trim() !== "rm -rf") {
    if (isSudo) {
      if(input === "rm -rf src" && !bareMode) {
        bareMode = true;

        setTimeout(() => {
          if(!TERMINAL || !WRITELINESCOPY) return
          TERMINAL.innerHTML = "";
          TERMINAL.appendChild(WRITELINESCOPY);
          mutWriteLines = WRITELINESCOPY;
        });

        easterEggStyles();
        setTimeout(() => {
          writeLines(["<span class='warning'>What made you think that was a good idea?</span>", "<br>"]);
        }, 200)

        setTimeout(() => {
          writeLines(["<span class='warning'>Now everything is ruined.</span>", "<br>"]);
        }, 1200)

        } else if (input === "rm -rf src" && bareMode) {
          writeLines(["<span class='warning'>there's no more src folder.</span>", "<br>"])
        } else {
          if(bareMode) {
            writeLines(["<span class='warning'>What else are you trying to delete?</span>", "<br>"])
          } else {
            writeLines(["<br>", "<span class='warning'>Directory not found.</span>", "type <span class='command'>'ls'</span> for a list of directories.", "<br>"]);
          }
        } 
      } else {
        writeLines(["<span class='warning'>Permission not granted.</span>", "<br>"]);
    }
    return
  }

  // cowsay: support both 'cowsay' and 'cowsay something'
  if (input.startsWith('cowsay')) {
    if (bareMode) {
      writeLines(["<span class='warning'>The cow has left the building.</span>", "<br>"])
      return;
    }
    const msg = input.length > 7 ? input.slice(7).trim() : 'Moo!';
    writeLines(cowsay(msg));
    return;
  }

  // 处理 theme 命令
  if (input.startsWith('theme')) {
    if (bareMode) {
      writeLines(["<span class='warning'>No themes in the dark.</span>", "<br>"])
      return;
    }
    const themeName = input.slice(5).trim();
    writeLines(theme(themeName));
    return;
  }

  switch(input) {
    case 'clear':
      setTimeout(() => {
        clearTerminal();
      })
      break;
    case 'banner':
      if(bareMode) {
        writeLines(["<span class='bounce'>WebShell v1.0.0</span>", "<br>"])
        break;
      }
      writeLines(BANNER);
      break;
    case 'help':
      if(bareMode) {
        writeLines(["<span class='bounce'>maybe restarting your browser will fix this.</span>", "<br>"])
        break;
      }
      writeLines(HELP);
      break;
    case 'whoami':      
      if(bareMode) {
        writeLines([`<span class='bounce'>${command.username}</span>`, "<br>"])
        break;
      }
      writeLines(createWhoami());
      break;
    case 'about':
      if(bareMode) {
        writeLines(["<span class='bounce'>Nothing to see here.</span>", "<br>"])
        break;
      }
      writeLines(ABOUT);
      break;
    case 'projects':
      if(bareMode) {
        writeLines(["<span class='bounce'>I don't want you to break the other projects.</span>", "<br>"])
        break;
      }
      writeLines(PROJECTS);
      break;
    case 'repo':
      writeLines(["<span class='bounce'>Redirecting to github.com...</span>", "<br>"]);
      setTimeout(() => {
        window.open(REPO_LINK, '_blank');
      }, 500);
      break;
    case 'linkedin':
      //add stuff here
      break;
    case 'github':
      //add stuff here
      break;
    case 'email':
      //add stuff here
      break;
    case 'rm -rf':
      if (bareMode) {
        writeLines(["don't try again.", "<br>"])
        break;
      }

      if (isSudo) {
        writeLines(["Usage: <span class='command'>'rm -rf &lt;dir&gt;'</span>", "<br>"]);
      } else {
        writeLines(["Permission not granted.", "<br>"])
      }
        break;
    case 'sudo':
      if(bareMode) {
        writeLines(["<span class='warning'>no.</span>", "<br>"])
        break;
      }
      if(!PASSWORD) return
      isPasswordInput = true;
      USERINPUT.disabled = true;

      if(INPUT_HIDDEN) INPUT_HIDDEN.style.display = "none";
      PASSWORD.style.display = "block";
      setTimeout(() => {
        PASSWORD_INPUT.focus();
      }, 100);

      break;
    case 'ls':
      if(bareMode) {
        writeLines(["", "<br>"])
        break;
      }

      if (isSudo) {
        writeLines(["<span class='bounce'>src</span>", "<br>"]);
      } else {
        writeLines(["<span class='warning'>Permission not granted.</span>", "<br>"]);
      }
      break;
    case 'fortune':
      if(bareMode) {
        writeLines(["<span class='warning'>Your fortune is too dark to read.</span>", "<br>"])
        break;
      }
      writeLines(createFortune());
      break;
    case 'matrix':
      if(bareMode) {
        writeLines(["<span class='warning'>The Matrix has you...</span>", "<br>"])
        break;
      }
      startMatrixEffect();
      // Stop the effect after 5 seconds
      setTimeout(() => {
        stopMatrixEffect();
        writeLines(["<br>", "<span class='bounce'>Welcome back to reality.</span>", "<br>"]);
      }, 5000);
      break;
    case 'joke':
      if(bareMode) {
        writeLines(["<span class='warning'>No jokes in the dark.</span>", "<br>"])
        break;
      }
      writeLines(createJoke());
      break;
    case 'ascii-art':
      if(bareMode) {
        writeLines(["<span class='warning'>Art is dead here.</span>", "<br>"])
        break;
      }
      writeLines([
        "<br>",
        "<pre class='rainbow'>",
        "  /\\_/\\",
        " ( o.o )",
        "  > ^ <",
        "</pre>",
        "<br>"
      ]);
      break;
    case 'sl':
      if (bareMode) {
        writeLines(["<span class='warning'>No trains in the dark.</span>", "<br>"])
        return;
      }
      let step = 0;
      stopSL();
      
      // 创建一个容器来放置火车
      const container = document.createElement('div');
      container.id = 'sl-container';
      if (mutWriteLines && mutWriteLines.parentNode) {
        mutWriteLines.parentNode.insertBefore(container, mutWriteLines);
      }

      // 创建火车元素
      const train = document.createElement('pre');
      train.className = 'sl';
      train.innerHTML = trainFrames[0];
      container.appendChild(train);

      slInterval = setInterval(() => {
        if (!container || !train) return;
        
        // 更新火车位置
        const progress = step / 60; // 增加总步数
        const screenWidth = window.innerWidth;
        const trainWidth = 80; // 估计的火车宽度
        const maxOffset = Math.max(0, screenWidth - trainWidth);
        const offset = Math.floor(progress * maxOffset);
        
        train.style.transform = `translateX(${offset}px)`;
        
        // 更新火车动画帧
        train.innerHTML = trainFrames[step % trainFrames.length];
        
        step++;
        if (step >= 60) {
          stopSL();
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }
        }
      }, 200);
      break;
    default:
      if(bareMode) {
        writeLines(["<span class='warning'>Command not found.</span>", "<br>"])
        break;
      }
      writeLines(DEFAULT);
      break;
  }  
}

function writeLines(message : string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item : string, idx : number) {
  setTimeout(() => {
    if(!mutWriteLines) return
    const p = document.createElement("p");
    p.innerHTML = item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
    scrollToBottom();
  }, 40 * idx);
}

function revertPasswordChanges() {
    if (!INPUT_HIDDEN || !PASSWORD) return
    PASSWORD_INPUT.value = "";
    USERINPUT.disabled = false;
    INPUT_HIDDEN.style.display = "block";
    PASSWORD.style.display = "none";
    isPasswordInput = false;

    setTimeout(() => {
      USERINPUT.focus();
    }, 200)
}

function passwordHandler() {
  if (passwordCounter === 2) {
    if (!INPUT_HIDDEN || !mutWriteLines || !PASSWORD) return
    writeLines(["<br>", "<span class='warning'>INCORRECT PASSWORD.</span>", "<span class='warning'>PERMISSION NOT GRANTED.</span>", "<br>"])
    revertPasswordChanges();
    passwordCounter = 0;
    return
  }

  if (PASSWORD_INPUT.value === SUDO_PASSWORD) {
    if (!mutWriteLines || !mutWriteLines.parentNode) return
    writeLines(["<br>", "<span class='bounce'>PERMISSION GRANTED.</span>", "Try <span class='command'>'rm -rf'</span>", "<br>"])
    revertPasswordChanges();
    isSudo = true;
    return
  } else {
    PASSWORD_INPUT.value = "";
    passwordCounter++;
  }
}

function easterEggStyles() {   
  const bars = document.getElementById("bars");
  const body = document.body;
  const main = document.getElementById("main");
  const span = document.getElementsByTagName("span");

  if (!bars) return
  bars.innerHTML = "";
  bars.remove()

  if (main) main.style.border = "none";

  body.style.backgroundColor = "black";
  body.style.fontFamily = "VT323, monospace";
  body.style.fontSize = "20px";
  body.style.color = "white";

  for (let i = 0; i < span.length; i++) {
    span[i].style.color = "white";
  }

  USERINPUT.style.backgroundColor = "black";
  USERINPUT.style.color = "white";
  USERINPUT.style.fontFamily = "VT323, monospace";
  USERINPUT.style.fontSize = "20px";
  if (PROMPT) PROMPT.style.color = "white";

}

function initTheme() {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
}

// 初始化事件监听器
const initEventListeners = () => {
  if(HOST) {
    HOST.innerText= command.hostname;
  }

  if(USER) {
    USER.innerText = command.username;
  }

  if(PRE_HOST) {
    PRE_HOST.innerText= command.hostname;
  }

  if(PRE_USER) {
    PRE_USER.innerText = command.username;
  } 
  
  USERINPUT.addEventListener('keypress', userInputHandler);
  USERINPUT.addEventListener('keydown', userInputHandler);
  PASSWORD_INPUT.addEventListener('keypress', userInputHandler);

  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  console.log(`%cPassword: ${command.password}`, "color: red; font-size: 20px;");

  // 监听主题变更事件
  window.addEventListener('themeChanged', ((e: Event) => {
    const event = e as CustomEvent;
    const { theme } = event.detail;
    if (theme) {
      applyTheme(theme);
    }
  }) as EventListener);

  // 监听页面加载事件
  window.addEventListener('load', () => {
    initTheme();
    writeLines(BANNER);
  });
}

function clearTerminal() {
  stopMatrixEffect();
  if(!TERMINAL || !WRITELINESCOPY) return;
  TERMINAL.innerHTML = "";
  TERMINAL.appendChild(WRITELINESCOPY);
  mutWriteLines = WRITELINESCOPY;
}

initEventListeners();
