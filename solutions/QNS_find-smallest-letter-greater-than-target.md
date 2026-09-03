# Find Smallest Letter Greater Than Target

**Difficulty:** Easy
**Data Structures / Topics:** Array, Binary Search
**Language submitted:** typescript
**Solved on:** 2026-08-19T05:39:37.000Z

## Problem

You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.

 
Example 1:


Input: letters = [&quot;c&quot;,&quot;f&quot;,&quot;j&quot;], target = &quot;a&quot;
Output: &quot;c&quot;
Explanation: The smallest character that is lexicographically greater than &#39;a&#39; in letters is &#39;c&#39;.


Example 2:


Input: letters = [&quot;c&quot;,&quot;f&quot;,&quot;j&quot;], target = &quot;c&quot;
Output: &quot;f&quot;
Explanation: The smallest character that is lexicographically greater than &#39;c&#39; in letters is &#39;f&#39;.


Example 3:


Input: letters = [&quot;x&quot;,&quot;x&quot;,&quot;y&quot;,&quot;y&quot;], target = &quot;z&quot;
Output: &quot;x&quot;
Explanation: There are no characters in letters that is lexicographically greater than &#39;z&#39; so we return letters[0].


 
Constraints:


	2 <= letters.length <= 104
	letters[i] is a lowercase English letter.
	letters is sorted in non-decreasing order.
	letters contains at least two different characters.
	target is a lowercase English letter.

## Solution

```typescript
// PASTE: your actual accepted solution here
```

## Alternative Approaches

_PASTE: LLM-generated alternatives here, or fill manually._

## Reasoning

_PASTE: LLM output here, or fill manually._

## Data Structure / Algorithm Behind This

_PASTE: LLM output here, or fill manually._

---
<details>
<summary>LLM Prompt (click to expand)</summary>

```
Solve the following LeetCode problem in typescript.

Problem: Find Smallest Letter Greater Than Target (Difficulty: Easy)
Topics: Array, Binary Search

You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.

 
Example 1:


Input: letters = [&quot;c&quot;,&quot;f&quot;,&quot;j&quot;], target = &quot;a&quot;
Output: &quot;c&quot;
Explanation: The smallest character that is lexicographically greater than &#39;a&#39; in letters is &#39;c&#39;.


Example 2:


Input: letters = [&quot;c&quot;,&quot;f&quot;,&quot;j&quot;], target = &quot;c&quot;
Output: &quot;f&quot;
Explanation: The smallest character that is lexicographically greater than &#39;c&#39; in letters is &#39;f&#39;.


Example 3:


Input: letters = [&quot;x&quot;,&quot;x&quot;,&quot;y&quot;,&quot;y&quot;], target = &quot;z&quot;
Output: &quot;x&quot;
Explanation: There are no characters in letters that is lexicographically greater than &#39;z&#39; so we return letters[0].


 
Constraints:


	2 <= letters.length <= 104
	letters[i] is a lowercase English letter.
	letters is sorted in non-decreasing order.
	letters contains at least two different characters.
	target is a lowercase English letter.

Provide your answer in exactly this structure:
1. Optimal Solution (code block, typescript)
2. Any alternative/brute-force approaches worth mentioning (code block, brief)
3. Reasoning — why this approach, what makes it correct, what's the complexity
4. Core Data Structure / Algorithm — name it explicitly and explain why it fits this problem
```

</details>
