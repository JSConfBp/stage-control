import React from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button';
import colors from '../../colors'

const styles = theme => ({
	root: {
		flexGrow: 1,
    },

	colorButton: {
		width: 72,
		marginBottom: 8,
		marginRight: 8
	},
	redButton: {
		color: theme.palette.getContrastText(colors.red),
		backgroundColor: colors.red,
		'&:hover': {
		  backgroundColor: colors.red,
		},
	},
	blueButton: {
		color: theme.palette.getContrastText(colors.blue),
		backgroundColor: colors.blue,
		'&:hover': {
		  backgroundColor: colors.blue,
		},
	},
	greenButton: {
		color: theme.palette.getContrastText(colors.green),
		backgroundColor: colors.green,
		'&:hover': {
		  backgroundColor: colors.green,
		},
	},
	yellowButton: {
		color: theme.palette.getContrastText(colors.yellow),
		backgroundColor: colors.yellow,
		'&:hover': {
		  backgroundColor: colors.yellow,
		},
	},
	whiteButton: {
		color: theme.palette.getContrastText(colors.white),
		backgroundColor: colors.white,
		'&:hover': {
		  backgroundColor: colors.white,
		},
	},
	blackButton: {
		color: theme.palette.getContrastText(colors.black),
		backgroundColor: colors.black,
		'&:hover': {
		  backgroundColor: colors.black,
		},
	},
	orangeButton: {
		color: theme.palette.getContrastText(colors.orange),
		backgroundColor: colors.orange,
		'&:hover': {
		  backgroundColor: colors.orange,
		},
	},
	purpleButton: {
		color: theme.palette.getContrastText(colors.purple),
		backgroundColor: colors.purple,
		'&:hover': {
		  backgroundColor: colors.purple,
		},
	},
})

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