/**
 * Allow for the entire object to be passed, with only some properties
 * required.
 */
export type LooselyMustHave< T, K extends keyof T > = Partial< T > &
	Pick< T, K >;

export type HTMLElementEvent< T extends HTMLElement > = Event & {
	target: T;
};
/**
 * Require type T to have at least one of K.
 */
export type RequiredKeys< T, K extends keyof T > = Required< Pick< T, K > > &
	Omit< T, K >;
