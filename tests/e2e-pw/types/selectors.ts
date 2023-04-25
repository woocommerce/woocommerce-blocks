export type BlockData = {
	name: string;
	mainClass: string;
	selectors: Record< 'editor' | 'frontend', Record< string, unknown > >;
} & Record< string, unknown >;
