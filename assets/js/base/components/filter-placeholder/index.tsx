interface FilterPlaceholderProps {
	children?: React.ReactChildren;
}

const FilterPlaceholder = ( {
	children,
}: FilterPlaceholderProps ): JSX.Element => {
	return (
		<div className="wc-block-filter-title-placeholder">{ children }</div>
	);
};

export default FilterPlaceholder;
