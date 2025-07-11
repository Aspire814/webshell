export const trainFrames = [
`        o o o
      o O o o o
    o O O o o o o
      o o o o o
    ====        ________
 _D _|  |_______/        \__I_I_____===__|_________|
  |(_)---  |   H\________/ |   |        =|___ ___|      _________________
  /     |  |   H  |  |     |   |         ||_| |_||     _|                \_____A
 |      |  |   H  |__--------------------| [___] |   =|                        |
 | ________|___H__/__|_____/[][]~\_______|       |   -|                        |
 |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\___/          |_D__D__D_|  |_D__D__D_|
  \_/      \O=====O=====O=====O_/      \_/               \_/   \_/    \_/   \_/
`,
`      o o o o
    o O O o o o
  o O O O o o o o
    o o o o o o
    ====        ________
 _D _|  |_______/        \__I_I_____===__|_________|
  |(_)---  |   H\________/ |   |        =|___ ___|      _________________
  /     |  |   H  |  |     |   |         ||_| |_||     _|                \_____A
 |      |  |   H  |__--------------------| [___] |   =|                        |
 | ________|___H__/__|_____/[][]~\_______|       |   -|                        |
 |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\___/          |_D__D__D_|  |_D__D__D_|
  \_/      \_O=====O=====O=====O_/      \_/               \_/   \_/    \_/   \_/
`,
`    o o o o o
  o O O O o o o
o O O O O o o o o
  o o o o o o o
    ====        ________
 _D _|  |_______/        \__I_I_____===__|_________|
  |(_)---  |   H\________/ |   |        =|___ ___|      _________________
  /     |  |   H  |  |     |   |         ||_| |_||     _|                \_____A
 |      |  |   H  |__--------------------| [___] |   =|                        |
 | ________|___H__/__|_____/[][]~\_______|       |   -|                        |
 |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\___/          |_D__D__D_|  |_D__D__D_|
  \_/      \_/O=====O=====O=====O_/      \_/               \_/   \_/    \_/   \_/
`
];

export const smokeFrames = [
`    ~
   ~ ~
  ~ ~ ~
 ~ ~ ~ ~
~ ~ ~ ~ ~
`,
`   ~ ~
  ~ ~ ~
 ~ ~ ~ ~
~ ~ ~ ~ ~
 ~ ~ ~ ~
`,
`  ~ ~ ~
 ~ ~ ~ ~
~ ~ ~ ~ ~
 ~ ~ ~ ~
  ~ ~ ~
`
];

export function createSLFrames(step: number): string[] {
  // 计算火车位置
  const maxSteps = 60; // 增加总步数
  const progress = step / maxSteps;
  const screenWidth = window.innerWidth;
  const trainWidth = 80; // 估计的火车宽度
  const maxOffset = Math.max(0, screenWidth - trainWidth);
  const offset = Math.floor(progress * maxOffset);
  
  // 获取当前帧
  const frame = trainFrames[step % trainFrames.length];
  
  // 为每一行添加适当的缩进
  const paddedFrame = frame.split('\n')
    .map(line => ' '.repeat(offset) + line)
    .join('\n');

  return [
    '<br>',
    paddedFrame,
    '<br>'
  ];
} 