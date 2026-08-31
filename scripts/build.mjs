import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await Promise.all(["index.html", "app.js", "styles.css"].map(file => cp(file, `dist/${file}`)));
console.log("Built static app in dist/");
