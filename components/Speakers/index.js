import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const Speakers = ({ classes, speakers, onClick, currentSpeaker } ) => {
    return (<List>
        {speakers.map( (speaker, i) => {
            return speaker.break ? (
                <ListItem key={ `speaker-${i}` }>
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

export default Speakers;