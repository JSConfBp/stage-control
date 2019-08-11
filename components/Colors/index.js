import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames'
import Button from '@material-ui/core/Button';
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
})

const PresentationStates = ({ classes, onChange} ) => {
    return (<>
    {colors.variants.map( color => (
		<Button 
			key={ color }
            onClick={ () => onChange(color) }
            variant="contained" 
            className={ classnames(classes.colorButton, classes[`${color}Button`]) }
        >
            { `${color}` }
        </Button>
    ))}
    </>)
}



export default withStyles(styles)(PresentationStates);