# Vowel-Consonant Score

**Difficulty:** Easy
**Data Structures / Topics:** String, Simulation
**Language submitted:** c
**Solved on:** 2026-01-18T04:20:20.000Z

## Problem

You are given a string s consisting of lowercase English letters, spaces, and digits.

Let v be the number of vowels in s and c be the number of consonants in s.

A vowel is one of the letters &#39;a&#39;, &#39;e&#39;, &#39;i&#39;, &#39;o&#39;, or &#39;u&#39;, while any other letter in the English alphabet is considered a consonant.

The score of the string s is defined as follows:


	If c > 0, the score = floor(v / c) where floor denotes rounding down to the nearest integer.
	Otherwise, the score = 0.


Return an integer denoting the score of the string.

 
Example 1:


Input: s = &quot;cooear&quot;

Output: 2

Explanation:

The string s = &quot;cooear&quot; contains v = 4 vowels (&#39;o&#39;, &#39;o&#39;, &#39;e&#39;, &#39;a&#39;) and c = 2 consonants (&#39;c&#39;, &#39;r&#39;).

The score is floor(v / c) = floor(4 / 2) = 2.


Example 2:


Input: s = &quot;axeyizou&quot;

Output: 1

Explanation:

The string s = &quot;axeyizou&quot; contains v = 5 vowels (&#39;a&#39;, &#39;e&#39;, &#39;i&#39;, &#39;o&#39;, &#39;u&#39;) and c = 3 consonants (&#39;x&#39;, &#39;y&#39;, &#39;z&#39;).

The score is floor(v / c) = floor(5 / 3) = 1.


Example 3:


Input: s = &quot;au 123&quot;

Output: 0

Explanation:

The string s = &quot;au 123&quot; contains no consonants (c = 0), so the score is 0.


 
Constraints:


	1 <= s.length <= 100
	s consists of lowercase English letters, spaces and digits.

## Solution

```c
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
Solve the following LeetCode problem in c.

Problem: Vowel-Consonant Score (Difficulty: Easy)
Topics: String, Simulation

You are given a string s consisting of lowercase English letters, spaces, and digits.

Let v be the number of vowels in s and c be the number of consonants in s.

A vowel is one of the letters &#39;a&#39;, &#39;e&#39;, &#39;i&#39;, &#39;o&#39;, or &#39;u&#39;, while any other letter in the English alphabet is considered a consonant.

The score of the string s is defined as follows:


	If c > 0, the score = floor(v / c) where floor denotes rounding down to the nearest integer.
	Otherwise, the score = 0.


Return an integer denoting the score of the string.

 
Example 1:


Input: s = &quot;cooear&quot;

Output: 2

Explanation:

The string s = &quot;cooear&quot; contains v = 4 vowels (&#39;o&#39;, &#39;o&#39;, &#39;e&#39;, &#39;a&#39;) and c = 2 consonants (&#39;c&#39;, &#39;r&#39;).

The score is floor(v / c) = floor(4 / 2) = 2.


Example 2:


Input: s = &quot;axeyizou&quot;

Output: 1

Explanation:

The string s = &quot;axeyizou&quot; contains v = 5 vowels (&#39;a&#39;, &#39;e&#39;, &#39;i&#39;, &#39;o&#39;, &#39;u&#39;) and c = 3 consonants (&#39;x&#39;, &#39;y&#39;, &#39;z&#39;).

The score is floor(v / c) = floor(5 / 3) = 1.


Example 3:


Input: s = &quot;au 123&quot;

Output: 0

Explanation:

The string s = &quot;au 123&quot; contains no consonants (c = 0), so the score is 0.


 
Constraints:


	1 <= s.length <= 100
	s consists of lowercase English letters, spaces and digits.

Provide your answer in exactly this structure:
1. Optimal Solution (code block, c)
2. Any alternative/brute-force approaches worth mentioning (code block, brief)
3. Reasoning — why this approach, what makes it correct, what's the complexity
4. Core Data Structure / Algorithm — name it explicitly and explain why it fits this problem
```

</details>
