import { createAboutInfo } from "../contents/About";

export function info(): string[] {
  return createAboutInfo();
  return ['<span class="error">info not found</span>', "<br>"];
}
