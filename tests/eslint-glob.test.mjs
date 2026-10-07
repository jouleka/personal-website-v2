import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const pluginRequire = createRequire(require.resolve("@next/eslint-plugin-next"));
const { globSync } = pluginRequire("fast-glob");
const normalize = (paths) => paths.map((p) => p.replaceAll("\\", "/")).sort();

test("Next lint root-directory glob contract: literal, glob and brace alternatives", () => {
  assert.deepEqual(globSync("src", { onlyDirectories: true }), ["src"]);
  assert.deepEqual(normalize(globSync("src/*", { onlyDirectories: true })), ["src/app", "src/components", "src/lib"]);
  assert.deepEqual(normalize(globSync("src/{app,lib}", { onlyDirectories: true })), ["src/app", "src/lib"]);
  assert.deepEqual(globSync("src/lib/projects.ts", { onlyDirectories: true }), []);
  assert.deepEqual(normalize(globSync(resolve("src").replaceAll("\\", "/"), { onlyDirectories: true })), normalize([resolve("src")]));
});
