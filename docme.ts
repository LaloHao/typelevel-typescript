export type T = 'test1' | 'test2';
/**
 * Documentation for T
 */
export let x: T = 'test1';

type Domain = {
  a: string;
  b: never;
};

declare const lift: (f: (...args: any[]) => void) => never;

lift(<A extends { }, B extends keyof Domain>
     (a: A, b: B) => {
       return console.log(a, b);
     })

// declare const liftC: <A>(f: <A>(arg: any) => void) => never;
declare const liftC: { <A>(f: <A>(arg: any) => void): never; }
declare const lift0: (f: (arg: any) => void) => never;
declare const lift2: { <A>(f: <A>(arg: (arg: (arg: any) => void) => void) => void) }

type p = Parameters<(() => void)>;

lift2<string>(a => b => {
  return console.log(a, b);
});
