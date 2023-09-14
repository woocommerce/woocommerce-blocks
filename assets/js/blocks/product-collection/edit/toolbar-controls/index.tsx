/**
 * External dependencies
 */
import { useMemo } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { setQueryAttribute } from '../../utils';
import DisplaySettingsToolbar from './display-settings-toolbar';
import DisplayLayoutToolbar from './display-layout-toolbar';
import PatternChooserToolbar from './pattern-chooser-toolbar';
import type { QueryEditComponentProps } from '../../types';

export default function ToolbarControls( props: QueryEditComponentProps ) {
	const { attributes, setAttributes, openPatternSelectionModalOpen } = props;
	const { query, displayLayout } = attributes;

	const setQueryAttributeBind = useMemo(
		() => setQueryAttribute.bind( null, props ),
		[ props ]
	);

	return (
		<BlockControls>
			<PatternChooserToolbar
				openPatternSelectionModal={ openPatternSelectionModalOpen }
			/>
			{ ! query.inherit && (
				<>
					<DisplaySettingsToolbar
						query={ query }
						setQueryAttribute={ setQueryAttributeBind }
					/>
					<DisplayLayoutToolbar
						displayLayout={ displayLayout }
						setAttributes={ setAttributes }
					/>
				</>
			) }
		</BlockControls>
	);
}
