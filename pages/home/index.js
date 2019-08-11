import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import Status from '../../components/Status'
import Speakers from '../../components/Speakers'
import PresentationStates from '../../components/PresentationStates'
import Colors from '../../components/Colors'

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
	const { classes, initialStage } = props;

	// set initial state from getInitialProps

	console.log(initialStage)


	const [ stage, setStage ] = useState(initialStage || {
		speaker: null,
		color: '',
		presentation: false,
		midSlide: false,
	})

	let saveTimer = 0
	const save = (data) => {
		const newData = Object.assign({}, stage, data)
		setStage(newData)
		clearTimeout(saveTimer)
		saveTimer = setTimeout(async () => {
			await fetch('/api/stage', 
			{
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT',
				body: JSON.stringify(newData)
			});
		},200)
	}

	const onSpeakerSelect = (speaker) => {
		const data = {
			speaker
		}

		if (speaker.color) {
			data.color = speaker.color
		}

		save(data)
	}

	const clearCurrentSpeaker = () => {
		const data = {
			speaker: null
		}

		if (stage.presentation) {
			data.presentation = false
		}
		
		save(data)
	}

	const onColorChange = (color) => {
		save({ color })
	}
	
	const onPresentationStateChange = (type, state) => {
		const data = {}

		if (stage.speaker && type === 'presentation') {
			data.presentation = state

			if (state) {
				data.midSlide = false
			}
			if (stage.speaker && stage.speaker.color) {
				data.color = stage.speaker.color
			}
		}

		if (type === 'midsession') {
			data.midSlide = state
			if (state) {
				data.presentation = false
			}
		}

		save(data)
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
						<Speakers 
							currentSpeaker={ stage.speaker }
							onClick={ item => onSpeakerSelect(item) } 
						/>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Typography variant="h5" className={classes.sectionTitle}>
							Status
						</Typography>
						<Status 
							speaker={ stage.speaker }
							presentationState={ stage.presentation }
							midSlideState={ stage.midSlide }
							color={ stage.color }
							clearSpeaker={ () => clearCurrentSpeaker() } 
						/>
				</Paper>

				<Paper className={classes.paper}>
					<Typography variant="h5" className={classes.sectionTitle}>
						Presentation
					</Typography>
					<PresentationStates 
						onChange={ (...args) => onPresentationStateChange(...args) }
						presentationEnabled={ !!stage.speaker }
						presentation={ stage.presentation }
						midsession={ stage.midSlide }
					/>
				</Paper>

				<Paper className={classes.paper}>
					<Typography variant="h5" className={classes.sectionTitle}>
						Colors
					</Typography>
					<Colors onChange={ color => onColorChange(color) } />
				</Paper>
			</Grid>
		</Grid>
	</Container>
</div>)
};

Index.getInitialProps = async ({ req, store, auth }) => {

	let apiUrl = `http://${process.env.HOST}:${process.env.PORT}/api/stage`;
	
	if (process.browser) {
		apiUrl = '/api/stage'
	}

	const request = await fetch(
		apiUrl, 
		{
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'GET'
		}
	);
	const initialStage = await request.json()

	return {
		initialStage
	}
}

export default withStyles(styles)(Index);