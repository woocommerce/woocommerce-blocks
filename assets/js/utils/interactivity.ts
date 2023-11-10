// Util to add the type of another store part.
export type StorePart< T > = T extends Function
	? T
	: T extends object
	? { [ P in keyof T ]?: StorePart< T[ P ] > }
	: T;
