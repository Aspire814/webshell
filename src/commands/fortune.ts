const fortunes = [
  "A beautiful, smart, and loving person will be coming into your life.",
  "A dubious friend may be an enemy in camouflage.",
  "A faithful friend is a strong defense.",
  "A fresh start will put you on your way.",
  "A golden egg of opportunity falls into your lap this month.",
  "A lifetime friend shall soon be made.",
  "A light heart carries you through all the hard times.",
  "A new perspective will come with the new year.",
  "A pleasant surprise is waiting for you.",
  "A short pencil is usually better than a long memory any day.",
  "A small donation is call for. Send it to P.O. Box 1142.",
  "A smile is your personal welcome mat.",
  "A smooth long journey! Great expectations.",
  "A soft voice may be awfully persuasive.",
  "A truly rich life contains love and art in abundance.",
];

export const createFortune = () : string[] => {
  const fortune : string[] = [];
  fortune.push("<br>");
  fortune.push("<span class='bounce'>Your fortune for today:</span>");
  fortune.push("<br>");
  fortune.push(`<span class='command'>${fortunes[Math.floor(Math.random() * fortunes.length)]}</span>`);
  fortune.push("<br>");
  return fortune;
} 