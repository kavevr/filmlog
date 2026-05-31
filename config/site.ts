/** Shared site-wide configuration.
 *  Secrets and environment-specific values go in .env / .env.local */
export const siteConfig = {
  name: "FilmLog",
  description: "Your personal film & TV tracker",
  /** Pixel threshold before the navbar snaps to the top */
  scrollThreshold: 60,
  theme: {
    default: "system" as const,
    storageKey: "theme",
  },
} as const;
