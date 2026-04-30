import { deployment } from "../../deployment.config.mjs";
import { getInternalPath } from "./deployment";
import {
  aboutPage,
  footerCopy,
  homeHero,
  navigation as contentNavigation,
  siteIdentity,
  socialLinks,
} from "./site-content";

export { aboutPage, footerCopy, homeHero, socialLinks };

export const navigation = contentNavigation.map((item) => ({
  ...item,
  href: getInternalPath(item.href),
}));

export const site = {
  ...siteIdentity,
  url: deployment.site,
  links: socialLinks,
} as const;
