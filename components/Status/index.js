import React from 'react'
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import PhotoIcon from '@mui/icons-material/Photo';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import colors from '../../colors'

const MyChip = styled(Chip)`
	margin: 16px;
	margin:left: 0;
`
const getColorChip = (color) => styled(MyChip)(({ theme }) => ({
	color: theme.palette.getContrastText(colors[color]),
	backgroundColor: colors[color],
	'&:hover': {
	  backgroundColor: colors[color],
	},
}));

const getColorIcon = (color) => styled(ColorLensIcon)(({ theme }) => ({
	color: theme.palette.getContrastText(colors[color]),
}));


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
	}


    return (<List>
        <ListItem css={css`
			padding-left: 0;
			padding-right: 0;
			flex-wrap: wrap;
		`}>
            <MyChip
                icon={<FaceIcon />}
                { ...presentationChip }
            />
            <MyChip
                icon={<PhotoIcon />}
                { ...midslideChip }
            />
            { color && (() => { 
				let ColorChip = getColorChip(color); 
				let ColorIcon = getColorIcon(color); 
				return (<ColorChip
                	icon={<ColorIcon />}
                	{ ...colorChip }
            	/>)
			})}
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

export default Status;