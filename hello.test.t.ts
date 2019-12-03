/** @dts-jest enable:test-value */

const sum = (a: number, b: string) => a + b;

// @dts-jest:pass:show
sum(1, number) // => "3"

// @dts-jest:pass
Math.max(1); //=> 1
