import { deployment } from "../../deployment.config.mjs";
import {
  aboutPage,
  footerCopy,
  homeHero,
  navigation,
  siteIdentity,
  socialLinks,
} from "./site-content";

export { aboutPage, footerCopy, homeHero, navigation, socialLinks };

export const site = {
  ...siteIdentity,
  url: deployment.site,
  links: socialLinks,
} as const;
