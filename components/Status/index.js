import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import PhotoIcon from '@material-ui/icons/Photo';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';
import colors from '../../colors'

const styles = theme => ({
	root: {
		flexGrow: 1,
    },
    redColor: {
		color: theme.palette.getContrastText(colors.red),
		backgroundColor: colors.red,
		'&:hover': {
		  backgroundColor: colors.red,
		},
	},
	blueColor: {
		color: theme.palette.getContrastText(colors.blue),
		backgroundColor: colors.blue,
		'&:hover': {
		  backgroundColor: colors.blue,
		},
	},
	greenColor: {
		color: theme.palette.getContrastText(colors.green),
		backgroundColor: colors.green,
		'&:hover': {
		  backgroundColor: colors.green,
		},
	},
	yellowColor: {
		color: theme.palette.getContrastText(colors.yellow),
		backgroundColor: colors.yellow,
		'&:hover': {
		  backgroundColor: colors.yellow,
		},
	},
	whiteColor: {
		color: theme.palette.getContrastText(colors.white),
		backgroundColor: colors.white,
		'&:hover': {
		  backgroundColor: colors.white,
		},
	},
	blackColor: {
		color: theme.palette.getContrastText(colors.black),
		backgroundColor: colors.black,
		'&:hover': {
		  backgroundColor: colors.black,
		},
    },
    redIcon: {
		color: theme.palette.getContrastText(colors.red),
	},
	blueIcon: {
		color: theme.palette.getContrastText(colors.blue),
	},
	greenIcon: {
		color: theme.palette.getContrastText(colors.green),
	},
	yellowIcon: {
		color: theme.palette.getContrastText(colors.yellow),
	},
	whiteIcon: {
		color: theme.palette.getContrastText(colors.white),
	},
	blackIcon: {
		color: theme.palette.getContrastText(colors.black),
	},
	chip: {
        margin: theme.spacing(1),
        marginLeft: 0
	},
	status: {
		paddingLeft: 0,
		paddingRight: 0,
		flexWrap: 'wrap'
	}
})

const Status = ({ 
	classes, 
	speaker = null, 
	presentationState = '', 
	midSlideState = '', 
	color = '',
	clearSpeaker = () => {}
} ) => {
    const presentationChip = {
        label: presentationState ? 'Presentation active' : 'No active presentation',
        color: presentationState ? 'primary' : 'default',
	}

    const midslideChip = {
        label: midSlideState ? 'Mid-session slides active' : 'No mid-session slides',
        color: midSlideState ? 'secondary' : 'default',
	}

    const colorChip = {
        label: color ? `${color.toUpperCase()}` : 'No color',
        className: color ? classnames(classes.chip, classes[`${color}Color`]) : classnames(classes.chip)
	}

    const iconClass = color ? classes[`${color}Icon`] : '';

    return (<List className={classes.root}>
        <ListItem className={classes.status}>
            <Chip
                icon={<FaceIcon />}
                className={classes.chip}
                { ...presentationChip }
            />
            <Chip
                icon={<PhotoIcon />}
                className={classes.chip}
                { ...midslideChip }
            />
            { color && (<Chip
                icon={<ColorLensIcon className={iconClass} />}
                className={classes.chip}
                { ...colorChip }
            />)}
        </ListItem>

        <Divider light />

        { speaker && (<ListItem >
            <ListItemAvatar>
                <Avatar
                    alt={ speaker.name }
                    src={ speaker.avatar }
                />
            </ListItemAvatar>
            <ListItemText
                primary={ speaker.name }
                secondary={ speaker.topic }
            />
			 <ListItemSecondaryAction>
				<IconButton edge="end" aria-label="remove" onClick={ () => clearSpeaker() }>
					<CancelIcon />
				</IconButton>
			</ListItemSecondaryAction>
        </ListItem>)}
    </List>)
}

export default withStyles(styles)(Status);