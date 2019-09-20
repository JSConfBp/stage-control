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

import js1_speakers from '../../js1-speakers'
import js2_speakers from '../../js2-speakers'
import css_speakers from '../../css-speakers'

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

	const [ stage, setStage ] = useState(initialStage || {
		event: 'css',
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
		const data = Object.assign({}, stage, {
			speaker
		})

		if (!data.midSlide && speaker.color) {
			data.color = speaker.color
		}

		save(data)
	}

	const clearCurrentSpeaker = () => {
		const data = Object.assign({}, stage, {
			speaker: null
		})

		if (stage.presentation) {
			data.presentation = false
		}

		if (!data.midSlide) {
			data.logoOnly = true
		}

		save(data)
	}

	const onColorChange = (color) => {
		const data = Object.assign({}, stage, {
			color
		})

		if (data.midSlide) return;

		save(data)
	}

	const onPresentationStateChange = (type, state) => {
		const data = Object.assign({}, stage)

		if (data.speaker && type === 'presentation') {
			data.presentation = state

			if (state) {
				data.midSlide = false
				data.coffee = false
				data.lunch = false
				data.logoOnly = false
			}
			if (stage.speaker && stage.speaker.color) {
				data.color = stage.speaker.color
			}
		}

		if (type === 'midsession') {
			data.midSlide = state
			data.color ='white'

			if (state) {
				data.presentation = false
				data.logoOnly = false
			} else if (stage.speaker && stage.speaker.color) {
				data.color = stage.speaker.color
			}

			if (!state) {
				data.coffee = false
				data.lunch = false
			}
		}

		if (type === 'coffee') {
			data.coffee = state

			if (state) {
				data.lunch = false
			}
		}

		if (type === 'lunch') {
			data.lunch = state

			if (state) {
				data.coffee = false
			}
		}

		if (type === 'logoOnly') {
			data.logoOnly = state

			if (state) {
				data.color ='white'
				data.presentation = false
				data.midSlide = false
				data.coffee = false
				data.lunch = false
			}
		}

		save(data)
	}

	const onEventChange = (event, index) => {
		const data = {}

		if (index === 0 && stage.event !== 'css') {
			data.event = 'css'
			data.speaker = null
			data.color = ''
			data.presentation = false
			data.midSlide = false
			data.coffee = false
			data.lunch = false
			data.logoOnly = true
			save(data)
		}
		if (index === 1 && stage.event !== 'js1') {
			data.event = 'js1'
			data.speaker = null
			data.color = 'white'
			data.presentation = false
			data.midSlide = false
			data.coffee = false
			data.lunch = false
			data.logoOnly = true
			save(data)
		}
		if (index === 2 && stage.event !== 'js2') {
			data.event = 'js2'
			data.speaker = null
			data.color = 'white'
			data.presentation = false
			data.midSlide = false
			data.coffee = false
			data.lunch = false
			data.logoOnly = true
			save(data)
		}
	}

	const getEventTabValue = (state) => {
		if (!state.event) return 0;

		if (state.event === 'css') return 0;

		if (state.event === 'js1') return 1;

		if (state.event === 'js2') return 2;

		return 0
	}

	const getSpeakers = (state) => {
		if (state && state.event === 'css') return css_speakers;

		if (state && state.event === 'js1') return js1_speakers;

		if (state && state.event === 'js2') return js2_speakers;

		return []
	}

	return (<div className={classes.root}>
		<Paper className={ classes.top }>
			<Tabs
				value={ getEventTabValue(stage) }
				onChange={ (...args) => onEventChange(...args) }
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="CSS" />
				<Tab label="JS DAY 1" />
				<Tab label="JS DAY 2" />
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
							speakers={ getSpeakers(stage) }
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
						lunch={ stage.lunch }
						coffee={ stage.coffee }
						logoOnly={ stage.logoOnly }
					/>
				</Paper>

				{ stage && stage.event.startsWith('js') && (<Paper className={classes.paper}>
					<Typography variant="h5" className={classes.sectionTitle}>
						Colors
					</Typography>
					<Colors onChange={ color => onColorChange(color) } />
				</Paper>)}

			</Grid>
		</Grid>
	</Container>
</div>)};

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
	try {
		const initialStage = await request.json()

		return {
			initialStage
		}
	} catch(e) {
		return {
			initialStage: null
		}
	}
}

export default withStyles(styles)(Index);