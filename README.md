# Voxline Prompt Studio

A local-first voice-AI system-prompt authoring workspace. It generates editable prompt drafts from configuration, preserves direct edits during section updates, records immutable versions, compares versions, restores a version as a draft, and exports Markdown, text, or JSON.

## Run locally

Use Node.js 18 or later.

```bash
npm run dev
```

Open http://127.0.0.1:4173. Your workspace is stored in your browser's local storage, so it remains on this machine and survives refreshes.

## Validate and build

```bash
npm run check
npm run build
npm run preview
```

`npm run build` writes a deployable static site to `dist/`. `npm run preview` serves that build at http://127.0.0.1:4173.

## Push to your Git remote

After you have set a remote and are happy with the changes:

```bash
git add .
git commit -m "Build Voxline prompt studio"
npm run push
```

`npm run push` deliberately runs checks and a build first, then calls `git push`. It does not deploy to a hosting provider; deployment should be configured for your chosen host.
