# Find Pivot Index

**Difficulty:** Easy
**Data Structures / Topics:** Array, Prefix Sum
**Language submitted:** cpp
**Solved on:** 2026-10-23T05:11:28.000Z

## Problem

Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index&#39;s right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.

 
Example 1:


Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11


Example 2:


Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.

Example 3:


Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0


 
Constraints:


	1 <= nums.length <= 104
	-1000 <= nums[i] <= 1000


 
Note: This question is the same as 1991: https://leetcode.com/problems/find-the-middle-index-in-array/

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

Problem: Find Pivot Index (Difficulty: Easy)
Topics: Array, Prefix Sum

Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index&#39;s right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.

 
Example 1:


Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11


Example 2:


Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.

Example 3:


Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0


 
Constraints:


	1 <= nums.length <= 104
	-1000 <= nums[i] <= 1000


 
Note: This question is the same as 1991: https://leetcode.com/problems/find-the-middle-index-in-array/

Provide your answer in exactly this structure:
1. Optimal Solution (code block, cpp)
2. Any alternative/brute-force approaches worth mentioning (code block, brief)
3. Reasoning — why this approach, what makes it correct, what's the complexity
4. Core Data Structure / Algorithm — name it explicitly and explain why it fits this problem
```

</details>
