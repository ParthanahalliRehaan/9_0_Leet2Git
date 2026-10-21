# Find the Pivot Integer

**Difficulty:** Easy
**Data Structures / Topics:** Math, Prefix Sum
**Language submitted:** cpp
**Solved on:** 2026-10-20T14:27:10.000Z

## Problem

Given a positive integer n, find the pivot integer x such that:


	The sum of all elements between 1 and x inclusively equals the sum of all elements between x and n inclusively.


Return the pivot integer x. If no such integer exists, return -1. It is guaranteed that there will be at most one pivot index for the given input.

 
Example 1:


Input: n = 8
Output: 6
Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.


Example 2:


Input: n = 1
Output: 1
Explanation: 1 is the pivot integer since: 1 = 1.


Example 3:


Input: n = 4
Output: -1
Explanation: It can be proved that no such integer exist.


 
Constraints:


	1 <= n <= 1000

## Solution

```cpp
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
Solve the following LeetCode problem in cpp.

Problem: Find the Pivot Integer (Difficulty: Easy)
Topics: Math, Prefix Sum

Given a positive integer n, find the pivot integer x such that:


	The sum of all elements between 1 and x inclusively equals the sum of all elements between x and n inclusively.


Return the pivot integer x. If no such integer exists, return -1. It is guaranteed that there will be at most one pivot index for the given input.

 
Example 1:


Input: n = 8
Output: 6
Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.


Example 2:


Input: n = 1
Output: 1
Explanation: 1 is the pivot integer since: 1 = 1.


Example 3:


Input: n = 4
Output: -1
Explanation: It can be proved that no such integer exist.


 
Constraints:


	1 <= n <= 1000

Provide your answer in exactly this structure:
1. Optimal Solution (code block, cpp)
2. Any alternative/brute-force approaches worth mentioning (code block, brief)
3. Reasoning — why this approach, what makes it correct, what's the complexity
4. Core Data Structure / Algorithm — name it explicitly and explain why it fits this problem
```

</details>
