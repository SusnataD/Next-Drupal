import { config } from "../config";
export function formatDate(input) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(input) {
  return `${config.imageUrl}${input}`;
}
