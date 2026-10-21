# Leet2Git — Setup Guide

Automatically syncs your accepted LeetCode submissions into a GitHub repo — one markdown file per problem, committed automatically on a schedule, no manual copy-pasting.

This guide gets you from zero to a working, automated sync.

---

## Prerequisites

- A GitHub account
- [Node.js](https://nodejs.org/) installed locally (v18+)
- A LeetCode account with a public profile (default setting — most accounts already are)
- Git installed locally

---

## Step 1 — Get the code

**Option A — Fork this repo** (recommended, simplest):
Click **Fork** at the top of this repo's GitHub page, then clone your fork:

```bash
git clone https://github.com/<your-username>/leet2git.git
cd leet2git
```

**Option B — Start fresh from scratch:**

```bash
mkdir leet2git && cd leet2git
git init
npm init -y
npm install node-fetch
mkdir -p scripts solutions .github/workflows
```
Then copy `scripts/sync.js` and `.github/workflows/sync.yml` from this repo into place.

---

## Step 2 — Set your LeetCode username

Open `scripts/sync.js` and change this line near the top:

```js
const USERNAME = 'your_username_here';
```

to your actual LeetCode username (the one in your profile URL: `leetcode.com/u/<this-part>/`).

No API key or password needed — the sync uses a public, unauthenticated query, the same one that powers public LeetCode profile pages.

---

## Step 3 — Initialize local state

Create `state.json` in the repo root:

```bash
echo '{"synced_slugs": []}' > state.json
```

This file tracks which problems have already been synced, so re-runs don't duplicate work. **Do not delete this file** once you start using the repo for real — deleting it will cause every problem you've ever solved to be re-synced (re-committed) on the next run.

---

## Step 4 — Test locally before automating anything

```bash
npm install
node scripts/sync.js
```

You should see either:
- `WROTE: solutions/QNS_<slug>.md` for each newly detected accepted submission, or
- `No new accepted submissions since last sync.` if there's nothing new (also correct — not an error)

Check the `solutions/` folder — confirm files actually appeared and look right before moving on.

---

## Step 5 — Push to GitHub

```bash
git add .
git commit -m "Initial Leet2Git setup"
git push
```

---

## Step 6 — Enable write permissions for GitHub Actions

This is the step people miss, and it causes a silent 403 failure later if skipped.

Go to your repo on GitHub:
`Settings → Actions → General → Workflow permissions`
→ select **"Read and write permissions"** → **Save**

Without this, the automated workflow can run and read data, but will fail to commit and push back to your repo.

---

## Step 7 — Set your schedule

Open `.github/workflows/sync.yml` and find:

```yaml
schedule:
  - cron: '30 17 * * *'
```

GitHub Actions cron runs in **UTC only** — you need to convert your desired local time yourself. Example: if you want it to run at 11 PM IST, that's 17:30 UTC (IST is UTC+5:30).

Use a tool like [crontab.guru](https://crontab.guru/) to build the expression, then convert your local target time to UTC before finalizing it.

---

## Step 8 — Push the workflow and test it manually

```bash
git add .github/workflows/sync.yml
git commit -m "Add sync workflow"
git push
```

Then on GitHub: `Actions tab → Leet2Git → Run workflow` (top right button). This uses the manual trigger (`workflow_dispatch`) so you don't have to wait for the schedule to test it.

**Watch the run.** Click into it, expand each step, and confirm:
- The sync step prints either `WROTE:` lines or `No new accepted submissions`
- If there were new solves, a real commit shows up in your repo's history afterward

Do this at least once with a real new solve before trusting the schedule to run unattended.

---

## Step 9 — Fill in the rest

Each generated `solutions/QNS_<slug>.md` includes:
- The problem statement (fetched automatically)
- A placeholder for your actual solution code (paste it in manually — LeetCode's public API doesn't expose your submitted source)
- A ready-to-use LLM prompt (in a collapsible section) you can paste into any LLM to generate the reasoning, alternative approaches, and data-structure explanation sections

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Workflow runs but never commits | Check Step 6 — write permissions not enabled |
| Every run re-syncs everything | `state.json` got deleted or reset — restore it, don't recreate empty unless you intend a full resync |
| `git add solutions/` fails with "did not match any files" | `solutions/` doesn't exist yet on a quiet-day run — workflow should `mkdir -p solutions` defensively before adding |
| Commits happen even with no new problems solved | Change-detection step is checking the whole repo instead of just `solutions/` and `state.json` — scope it: `git status --porcelain solutions/ state.json` |
| Scheduled runs stop happening after weeks of inactivity | GitHub auto-disables scheduled workflows after 60 days with no repo activity — push any commit or manually re-enable it under the Actions tab |

---

## What This Does *Not* Do

- Does not fetch your actual submitted solution code (no public API for that) — you paste it in
- Does not auto-generate reasoning/alternatives — you run the embedded prompt through an LLM yourself and paste the result in
- Only checks your last ~20 accepted submissions per run — if you solve more than that between scheduled runs, older ones in that gap could be missed. Run more frequently or raise the `limit` in `sync.js` if you're solving in high volume.