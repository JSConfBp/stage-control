import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
	root: {
		flexGrow: 1,
    },
})

const Speakers = ({ classes, speakers, onClick, currentSpeaker } ) => {
    return (<List className={classes.root}>
        {speakers.map( speaker => {
            return speaker.break ? (
                <ListItem>
                    <ListItemText
                        primary={ speaker.name }
                    />
                </ListItem>
            ) : (
                <ListItem
                    key={ speaker.id }
                    button
                    onClick={ () => onClick(speaker) }
                    selected={ currentSpeaker && currentSpeaker.id === speaker.id }
                >
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
                </ListItem>
            )
        })}
    </List>)
}

export default withStyles(styles)(Speakers);