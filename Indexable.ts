namespace React {
  export type Key = number | string;
}

type Literal<L> =
  L extends string ? L :
  L extends number ? L :
  L extends boolean ? L :
  L extends undefined ? L :
  L extends null ? L :
  never;

type Id = React.Key;
type Identifier<I extends string> = Record<I, Id>;
type Identifiable<T extends {}, I extends string> =
  T extends Identifier<I>
  ? Indexable<T, I>
  : T;
/* : ('Test' | void | Error); */
type Item = Identifier<'id'>;
type Indexable<T, I extends string, M = T & { [i in I]: Id }> = { [m in keyof M]: M[m] };
