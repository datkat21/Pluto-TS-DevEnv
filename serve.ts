import express from "express";
import cors from "cors";
import JSON5 from "json5";
import { Glob } from "bun";

export default function serve() {
  const app = express();
  app.use(cors());

  app.get('/apps', async (req, res) => {
    const glob = new Glob("*.js");
    const scannedFiles = await Array.fromAsync(
      glob.scan({ cwd: "./public/dist/apps" })
    );
    res.json(scannedFiles);
  })
  app.use(express.static("public"));
  app.listen(1930, () =>
    console.log("Listening on port 1930, now open Pluview on a Pluto instance")
  );
}

// Grab the latest dynamic files so we can turn them into a TS type.
const stringSrc = await fetch(
  "https://pluto-app.zeon.dev/assets/strings.js"
).then((t) => t.text());
const iconSrc = await fetch("https://pluto-app.zeon.dev/assets/icons.js").then(
  (t) => t.text()
);

function cleanseJs(string: string) {
  return string.replace(";", "").replace("export default", "").trim();
}

const stringsSanitized = cleanseJs(stringSrc);
const iconsSanitized = cleanseJs(iconSrc);

const strings: Record<string, Record<string, string>> = JSON5.parse(
  stringsSanitized
);
const icons: Record<string, string> = JSON5.parse(iconsSanitized);

const stringsDefault: Record<string, string> = strings["en_US"];
const stringKeys = Object.keys(stringsDefault);
const langs = Object.keys(strings);

const iconKeys = Object.keys(icons);

function mapJoinArray(array: string[]) {
  return array.map((string) => `"${string}"`).join(" | ");
}

const template = /*ts*/ `// Auto-generated by Bun.js ${process.version}
export type AutoGeneratedStrings = ${mapJoinArray(stringKeys)};
export type AutoGeneratedLanguages = ${mapJoinArray(langs)};
export type AutoGeneratedIcons = ${mapJoinArray(iconKeys)};
`;

Bun.write("./src/types/_autoGenerated.ts", template);
