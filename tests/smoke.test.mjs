import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [html, app] = await Promise.all([readFile("index.html", "utf8"), readFile("app.js", "utf8")]);

test("application shell exposes the core prompt-authoring workflow", () => {
  for (const id of ["promptEditor", "versionModal", "downloadModal", "regenerateModal", "compareView", "libraryView"]) assert.match(html, new RegExp(`id="${id}"`));
});

test("generator covers the documented prompt sections and safe review mode", () => {
  for (const section of ["Role and objective", "Voice and character", "Pronunciation guardrails", "Safety, privacy, and topic guardrails", "Conversation close"]) assert.match(app, new RegExp(section));
  assert.match(app, /AUTHORISATION-CONFIRMED REVIEW CHECKLIST/);
});

test("prompt regeneration retains a section-aware protection path", () => {
  assert.match(app, /function mergeSection/);
  assert.match(app, /DIRECT EDITS DETECTED|regenerateModal/);
});

test("wizard saves five steps before one final generation action", () => {
  for (const step of ["basics", "persona", "workflow", "pronunciation", "guardrails"]) assert.match(html, new RegExp(`data-save-step="${step}"`));
  assert.match(html, /id="generatePromptFinal"/);
  assert.match(app, /function saveStep/);
  assert.match(app, /completedSteps/);
});

test("comparison keeps two complete selected prompts side by side", () => {
  for (const id of ["basePrompt", "comparisonPrompt", "baseVersion", "compareVersion"]) assert.match(html, new RegExp(`id="${id}"`));
  assert.match(app, /function sideLines/);
  assert.match(app, /healthScoreNote/);
});
