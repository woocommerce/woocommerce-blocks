/**
 * Interface that describes the properties of a block, used to help with finding/editing the block in E2E tests.
 */
export interface BlockTestingProperties {
	title: string;
	selectors: Record< string, string >;
	slug: string;
}
