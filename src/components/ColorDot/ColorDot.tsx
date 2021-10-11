import React, {useMemo} from 'react';
import {keyframes} from '@emotion/react';
import Box from '@mui/material/Box';

const defaultProps = {
	size: 16,
	color: '#0091ea',
	animated: false,
}

type DefaultProps = Readonly<typeof defaultProps>;
export type ColorDotProps = Partial<DefaultProps>
export type ColorDotPropsWithDefault = ColorDotProps & DefaultProps;

const DotAnimation = keyframes`
	0% {
	  transform: translate(-50%, -50%) scale(1);
	}
  	100% {
	  transform: translate(-50%, -50%) scale(1.5);
    }
`

const ColorDot: React.FC<ColorDotProps> = (props) => {
	const {color, size, animated} = props as ColorDotPropsWithDefault;
	const sharedDotStyles = useMemo(() => ({
		width: size,
		backgroundColor: color,
		height: size,
		borderRadius: '50%',
	}), [size, color])

	return (
		<Box sx={{
			...sharedDotStyles,
			position: 'relative',

			'&:after': {
				...sharedDotStyles,
				content: '""',
				opacity: 0.3,
				position: 'absolute',
				transform: 'translate(-50%, -50%)',
				top: '50%',
				left: '50%',
				zIndex: 0,
				animation: animated ? `${DotAnimation} 1s ease-in-out alternate infinite` : ''
			}
		}}/>
	)
}

ColorDot.defaultProps = defaultProps;
export default React.memo(ColorDot);