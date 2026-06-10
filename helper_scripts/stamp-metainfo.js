/**
 * Date: uses $RELEASE_DATE if set (CI passes the GitHub release's published_at), otherwise today's date. Run automatically before electron-builder by the `build-linux*` npm scripts; the generated copy is referenced by package.json build.flatpak.files and is gitignored (dist-resources/).
 */
const { readFileSync, writeFileSync, mkdirSync } = require("fs");

const TEMPLATE = "net.deepnest.app.metainfo.xml";
const OUT_DIR = "dist-resources";
const OUT = `${OUT_DIR}/net.deepnest.app.metainfo.xml`;

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const rawDate = process.env.RELEASE_DATE;
const date = rawDate ? rawDate.slice(0, 10) : new Date().toISOString().slice(0, 10);

const releases = `  <releases>\n    <release version="${version}" date="${date}" />\n  </releases>\n`;
const out = readFileSync(TEMPLATE, "utf8").replace("</component>", releases + "</component>");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, out);
console.log(`stamp-metainfo: wrote ${OUT} (version ${version}, date ${date})`);
