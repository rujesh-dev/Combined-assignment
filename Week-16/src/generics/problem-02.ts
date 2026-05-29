// Problem Statement:
// Write a function createPair that takes two arguments of any type and returns a tuple with those values.


export function createPair<T, U>(arg1: any, arg2: any): [T, U]{
 return [arg1, arg2]
}