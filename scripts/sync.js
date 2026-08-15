import fetch from 'node-fetch';
import fs from 'fs';

const USERNAME = 'ParthanahlliRehaan'; // <-- set your LeetCode username
const STATE_PATH = './state.json';
const SOLUTIONS_DIR = './solutions';

const submissionListQuery = `
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
  }
`;

const questionDataQuery = `
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      title
      difficulty
      content
      topicTags { name }
    }
  }
`;

async function graphql(query, variables) {
    const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    });
    return res.json();
}

function stripHtml(html) {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
}

function loadState() {
    if (!fs.existsSync(STATE_PATH)) return { synced_slugs: [] };
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
}

function saveState(state) {
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

async function buildMarkdown(sub) {
    const qRes = await graphql(questionDataQuery, { titleSlug: sub.titleSlug });
    const q = qRes.data?.question;

    const title = q?.title ?? sub.title;
    const difficulty = q?.difficulty ?? 'Unknown';
    const tags = q?.topicTags?.map(t => t.name).join(', ') ?? 'Unknown';
    const description = q?.content
        ? stripHtml(q.content)
        : '_Problem statement unavailable via public API._';

    const llmPrompt = `Solve the following LeetCode problem in ${sub.lang}.

Problem: ${title} (Difficulty: ${difficulty})
Topics: ${tags}

${description}

Provide your answer in exactly this structure:
1. Optimal Solution (code block, ${sub.lang})
2. Any alternative/brute-force approaches worth mentioning (code block, brief)
3. Reasoning — why this approach, what makes it correct, what's the complexity
4. Core Data Structure / Algorithm — name it explicitly and explain why it fits this problem`;

    return `# ${title}

**Difficulty:** ${difficulty}
**Data Structures / Topics:** ${tags}
**Language submitted:** ${sub.lang}
**Solved on:** ${new Date(Number(sub.timestamp) * 1000).toISOString()}

## Problem

${description}

## Solution

\`\`\`${sub.lang}
// PASTE: your actual accepted solution here
\`\`\`

## Alternative Approaches

_PASTE: LLM-generated alternatives here, or fill manually._

## Reasoning

_PASTE: LLM output here, or fill manually._

## Data Structure / Algorithm Behind This

_PASTE: LLM output here, or fill manually._

---
<details>
<summary>LLM Prompt (click to expand)</summary>

\`\`\`
${llmPrompt}
\`\`\`

</details>
`;
}

async function main() {
    const listRes = await graphql(submissionListQuery, { username: USERNAME, limit: 20 });
    const submissions = listRes.data?.recentAcSubmissionList;

    if (!submissions) {
        throw new Error('Malformed response — check USERNAME or LeetCode schema changed: ' + JSON.stringify(listRes));
    }

    const state = loadState();
    const accepted = submissions.filter(s => s.statusDisplay === 'Accepted');
    const newOnes = accepted.filter(s => !state.synced_slugs.includes(s.titleSlug));

    if (newOnes.length === 0) {
        console.log('No new accepted submissions since last sync.');
        return;
    }

    if (!fs.existsSync(SOLUTIONS_DIR)) fs.mkdirSync(SOLUTIONS_DIR);

    for (const sub of newOnes) {
        const md = await buildMarkdown(sub);
        const filePath = `${SOLUTIONS_DIR}/QNS_${sub.titleSlug}.md`;
        fs.writeFileSync(filePath, md);
        console.log(`WROTE: ${filePath}`);
        state.synced_slugs.push(sub.titleSlug);
    }

    saveState(state);
}

main().catch(err => {
    console.error('sync.js failed:', err);
    process.exit(1);
});