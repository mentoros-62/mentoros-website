import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Public base path the site is served from.
 *  - GitHub Pages project site:  BASE_PATH=/mentoros-website/  (the deploy workflow sets this)
 *  - Custom domain or local dev: BASE_PATH=/           (default)
 */
function normaliseBase(raw: string | undefined): string {
  const value = (raw ?? "/").trim();
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

/**
 * Replaces __SITE_URL__ in index.html with the absolute site URL (canonical + Open Graph tags).
 * Uses VITE_SITE_URL when set, otherwise the GitHub Pages URL for the resolved base path.
 */
function siteUrlPlugin(explicitUrl: string | undefined): Plugin {
  let base = "/";
  return {
    name: "mentoros-site-url",
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml(html) {
      const raw = explicitUrl || `https://mentoros-62.github.io${base}`;
      const url = raw.endsWith("/") ? raw : `${raw}/`;
      return html.replaceAll("__SITE_URL__", url);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  return {
    base: normaliseBase(env.BASE_PATH),
    plugins: [react(), tailwindcss(), siteUrlPlugin(env.VITE_SITE_URL)],
  };
});
