import React from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button';
import colors from '../../colors'

const getColorButton = (color) => styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(colors[color]),
	backgroundColor: colors[color],
	'&:hover': {
		backgroundColor: colors[color],
	},
	width: 72,
	marginBottom: 8,
	marginRight: 8
}));


const PresentationStates = ({ classes, onChange} ) => {
    return (<>
    {colors.variants.map( color => {
		let ColorButton = getColorButton(color)
		return (<ColorButton
			key={ color }
            onClick={ () => onChange(color) }
            variant="contained"
        >
            { `${color}` }
        </ColorButton>
    )
	})}
  </>)
}

export default PresentationStates
