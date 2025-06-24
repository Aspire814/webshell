import { createAboutInfo, createAboutInfoEN } from "../contents/About";

export function info(lang: string): string[] {
  if (lang === "zh") {
    return createAboutInfo();
  } else {
    return createAboutInfoEN();
  }
}
