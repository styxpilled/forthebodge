/// <reference types="@sveltejs/kit" />
interface BadgeInput {
  url: string,
  text: string[],
  colors: string[],
  fonts: string[],
}