/**
 * External dependencies
 */
import React from 'react';
import styled from '@emotion/styled';

const StyledSectionWrapper = styled.div`
	display: flex;
	flex-flow: column;
	margin-bottom: 24px;
	&:last-child {
		margin-bottom: 0;
	}
	@media ( min-width: 800px ) {
		flex-flow: row;
	}
`;

const StyledDescriptionWrapper = styled.div`
	flex: 0 1 auto;
	margin-bottom: 24px;
	@media ( min-width: 800px ) {
		flex: 0 0 250px;
		margin: 0 32px 0 0;
	}
	h2 {
		font-size: 16px;
		line-height: 24px;
	}
	p {
		font-size: 13px;
		line-height: 17.89px;
		margin: 12px 0;
	}
	> :last-child {
		margin-bottom: 0;
	}
`;

const StyledSectionControls = styled.div`
	flex: 1 1 auto;
`;

const SettingsSection = ( {
	Description = () => null,
	children,
	...props
}: {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Description?: () => JSX.Element | null;
	children: React.ReactNode;
} ): JSX.Element => (
	<StyledSectionWrapper
		className="wc-blocks-settings-section-wrapper"
		{ ...props }
	>
		<StyledDescriptionWrapper className="wc-blocks-settings-description-wrapper">
			<Description />
		</StyledDescriptionWrapper>
		<StyledSectionControls className="wc-blocks-settings-section-controls">
			{ children }
		</StyledSectionControls>
	</StyledSectionWrapper>
);

export default SettingsSection;
