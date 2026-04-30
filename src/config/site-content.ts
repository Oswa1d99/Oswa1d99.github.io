import content from "./site-content.json";

export type SiteContent = typeof content;
export type EmptyStateCopy = {
  title: string;
  message: string;
  href: string;
  action: string;
};

export const siteContent = content;
export const siteIdentity = content.site;
export const navigation = content.navigation;
export const socialLinks = content.socialLinks;
export const homeHero = content.homeHero;
export const aboutPage = content.aboutPage;
export const footerCopy = content.footer;
export const emptyStates = content.emptyStates;
export const searchPage = content.searchPage;
