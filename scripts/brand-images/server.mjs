// Renders the social preview image and PNG icons in a real browser (canvas) and saves them
// into website/public/. Usage: `node scripts/brand-images/server.mjs`, then open
// http://localhost:4321/ in a browser and wait for "Saved".
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, "..", "..", "public");
const allowed = new Set(["og-image.png", "apple-touch-icon.png", "favicon-32.png"]);

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(await readFile(join(here, "render.html")));
    return;
  }
  if (req.method === "GET" && url.pathname === "/favicon.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.end(await readFile(join(publicDir, "favicon.svg")));
    return;
  }
  if (req.method === "POST" && url.pathname === "/save") {
    const name = basename(url.searchParams.get("name") ?? "");
    if (!allowed.has(name)) {
      res.writeHead(400).end("bad name");
      return;
    }
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const b64 = Buffer.concat(chunks).toString("utf8").replace(/^data:image\/png;base64,/, "");
    await writeFile(join(publicDir, name), Buffer.from(b64, "base64"));
    console.log("saved", name);
    res.writeHead(200).end("ok");
    return;
  }
  res.writeHead(404).end();
}).listen(4321, () => console.log("Open http://localhost:4321/"));
