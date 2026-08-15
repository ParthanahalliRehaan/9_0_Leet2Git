import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const query = `
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

async function probe() {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com'
    },
    body: JSON.stringify({
      query,
      variables: { username: 'ParthanahlliRehaan', limit: 15 }
    })
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

probe();