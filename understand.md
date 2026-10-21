# Leet2Git

Automatically syncs your accepted LeetCode submissions into this GitHub repo — one markdown file per problem, committed automatically, no manual copy-pasting.

---

## Problem This Solves

LeetCode has no official API and no webhook system. There's no way to be *notified* when you solve a problem. The only option is **polling**: periodically ask "what's new since I last checked."

Leet2Git automates that polling on a schedule, using GitHub Actions as the scheduler/executor, and git itself as the persistence layer (since the compute that runs the check is destroyed after every run and remembers nothing on its own).

---

## Architecture

```
GitHub Actions (cron, daily)
        │
        ▼
  scripts/sync.js
        │
        ├── 1. POST to leetcode.com/graphql
        │      → fetch last N accepted submissions (public, no auth)
        │
        ├── 2. Filter: statusDisplay === "Accepted"
        │
        ├── 3. Filter: titleSlug NOT already in state.json
        │      (this is the dedup / idempotency check)
        │
        ├── 4. For each new problem:
        │      → fetch problem statement (2nd GraphQL query)
        │      → build solutions/QNS_<slug>.md
        │        (problem text + an embedded LLM prompt,
        │         solution/reasoning sections left for manual fill-in)
        │      → append slug to state.json
        │
        ▼
  Workflow checks: did solutions/ or state.json actually change?
        │
        ├── No  → skip commit (quiet day, not a failure)
        └── Yes → git commit + push, using auto-issued GITHUB_TOKEN
```

---

## Why Things Are Built the Way They Are

**Why `titleSlug` and not submission `id` for dedup?**
Every submission — even a *resubmission* of a problem you already solved — gets a brand new `id`. If dedup were keyed on `id`, resubmitting a cleaned-up solution would look "new" and try to re-generate/re-commit a file that already exists. `titleSlug` is stable per problem, so "have I already written a file for this problem" is the correct question, and it's the one `titleSlug` actually answers.

**Why does state live in `state.json`, committed to the repo, instead of some database?**
GitHub Actions runners are **ephemeral** — a fresh, empty VM spins up per run and is destroyed after. Nothing survives between runs unless it's explicitly persisted somewhere durable. Git itself is that durable store here: cheap, versioned, and free debugging (you can literally read the history of what was synced and when).

**Why no LeetCode auth/cookies?**
`recentAcSubmissionList` — the query that powers public LeetCode profile pages — happens to require no authentication. This removed an entire category of fragility (expiring session cookies, secret rotation, silent auth failures) from the system for free. The tradeoff: it can't fetch your actual *submitted code*, only submission metadata — so the solution code in each file is still pasted in manually.

**Why is the LLM prompt embedded in the file instead of the reasoning being auto-generated?**
No API — LeetCode's or otherwise — knows *why* you chose an approach. That's inherently something only you (or an LLM you prompt yourself) can produce. Rather than leaving the file empty, each `.md` ships with a ready-to-paste prompt so filling in Reasoning / Alternatives / DS sections is fast.

**Why does the workflow check `git status --porcelain solutions/ state.json` instead of the whole repo?**
Early version checked the entire repo's diff, which caused false-positive commits whenever `npm install` regenerated `package-lock.json` with harmless metadata differences. Scoping the check to only the paths the app actually writes to means a commit only ever happens when there's a *real* new solve — not incidental build artifacts.

**Why does `sync.js` `process.exit(1)` on a malformed API response?**
So a broken run is *visibly* broken. A script that always exits `0` makes "0 new submissions because you didn't code today" indistinguishable from "0 new submissions because LeetCode changed their schema and the fetch silently failed." A hard failure turns into a red ❌ in the Actions tab — a signal you can actually notice, instead of a rotting green checkmark that's lying to you.

---

## How the Automation Actually Runs (mechanics)

There's no long-running process watching your repo. What actually happens:

1. GitHub's own scheduler infrastructure reads the `cron:` expression in `.github/workflows/sync.yml` across every repo on the platform.
2. At the scheduled UTC time, it spins up a **fresh, temporary Ubuntu VM** ("runner") just for this run.
3. That runner clones your repo, installs Node, installs dependencies, and runs `node scripts/sync.js` — same as running it locally, just on a disposable machine.
4. If `solutions/` or `state.json` changed, the workflow commits and pushes using a scoped, auto-issued `GITHUB_TOKEN` (no personal access token needed).
5. The VM is destroyed. Everything that mattered is now sitting in your git history — that's the *only* thing that persisted.

`workflow_dispatch: {}` in the YAML additionally allows manually triggering a run anytime from the Actions tab, without waiting on the schedule — essential for testing changes.

---

## Known Limitations / Open Items

- **No auth = no access to your actual submitted source code.** The "Solution" section of each `.md` is pasted in manually.
- **`recentAcSubmissionList` only returns a limited window (currently `limit: 20`)** of your most recent accepted submissions — if you solve more than that between two consecutive scheduled runs, older ones in that gap would be missed. Increasing `limit` or running more frequently reduces this risk but doesn't eliminate it.
- **GitHub disables scheduled workflows automatically after 60 days of repo inactivity.** Worth periodically confirming the schedule is still active if the repo goes quiet.
- **Reasoning / Alternatives / DS sections are manually filled** using the embedded LLM prompt — not automated end-to-end.

---

## File Structure

```
leet2git/
├── .github/workflows/sync.yml   ← cron schedule + commit logic
├── scripts/sync.js              ← fetch, filter, dedup, file generation
├── solutions/                   ← QNS_<slug>.md, one per solved problem
├── state.json                   ← durable record of already-synced slugs
└── package.json
```