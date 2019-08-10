import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import colors from '../../colors'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';


import Status from '../../components/Status'
import Speakers from '../../components/Speakers'
import PresentationStates from '../../components/PresentationStates'
import Colors from '../../components/Colors'

import Cookies from 'universal-cookie';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: theme.mixins.gutters({
		padding: theme.spacing(2),
		marginBottom: 16		
	}),
	top: {
		marginBottom: 16	
	},
	sectionTitle: {
		textTransform: 'uppercase',
		fontSize: 16,
		marginBottom: 16		
	},
	speakerColumn: {
		height: 'calc(100vh - 64px)',
		overflow: 'auto',
	}
});

const Index = (props) => {
	const { classes } = props;
	const [ speaker, setSpeaker ] = useState(null)
	const [ color, setColor ] = useState('')
	const [ presentationState, setPresentationState ] = useState(false)
	const [ midSlideState, setMidSlideState ] = useState(false)

	const onSpeakerSelect = (selectedSpeaker) => {
		setSpeaker(selectedSpeaker)
		if (selectedSpeaker.color) {
			setColor(selectedSpeaker.color)
		}
	}

	const clearCurrentSpeaker = () => {
		setSpeaker(null)
		if (presentationState) {
			setPresentationState(false)
		}
	}
	
	const onPresentationStateChange = (type, state) => {
		
	
		if (speaker && type === 'presentation') {
			setPresentationState(state)
			if (state) {
				setMidSlideState(false)
			}
			if (speaker && speaker.color) {
				setColor(speaker.color)
			}
		}
		if (type === 'midsession') {
			setMidSlideState(state)
			if (state) {
				setPresentationState(false)
			}
		}
	}

	return (<div className={classes.root}>
		
		<Paper className={ classes.top }>
			<Tabs
				value={ 1 }
				onChange={ (...args) => console.log(args) }
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="CSSConf Budapest 2019" />
				<Tab label="JSConf Budapest 2019" />
			</Tabs>
		</Paper>

		<Container maxWidth="xl">
			<Grid container spacing={3}>
				<Grid item xs={6} className={classes.speakerColumn}>
					<Paper className={classes.paper}>
						<Typography variant="h5" className={classes.sectionTitle}>
							Speakers
						</Typography>

						<Speakers onClick={ item => onSpeakerSelect(item) } />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Typography variant="h5" className={classes.sectionTitle}>
							Status
						</Typography>

						<Status 
							speaker={ speaker }
							presentationState={ presentationState }
							midSlideState={ midSlideState }
							color={ color }
							clearSpeaker={ () => clearCurrentSpeaker() } 
						/>
				</Paper>

				<Paper className={classes.paper}>
					<Typography variant="h5" className={classes.sectionTitle}>
						Presentation
					</Typography>

					<PresentationStates 
						onChange={ (...args) => onPresentationStateChange(...args) }
						presentationEnabled={ !!speaker }
						presentation={ presentationState }
						midsession={ midSlideState }
					/>
				</Paper>

				<Paper className={classes.paper}>
					<Typography variant="h5" className={classes.sectionTitle}>
						Colors
					</Typography>

					<Colors onChange={ color => setColor(color) } />
				</Paper>
			</Grid>
		</Grid>
	</Container>
</div>)
};

Index.getInitialProps = ({ req, store, auth }) => {
	return {}
}

export default withStyles(styles)(Index);