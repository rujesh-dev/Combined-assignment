// Problem Statement:
// Write a generic function sum that accepts an array of numbers and returns the sum of all the numbers.


export function sum(arr: number[]):number {
    const ans = arr.reduce((acc, cuur)=>{
         acc + cuur
        return acc + cuur;
    }, 0)
    return ans;
}