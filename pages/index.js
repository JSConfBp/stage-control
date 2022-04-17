import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import ErrorIcon from '@mui/icons-material/Error';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import Status from '../components/Status'
import Speakers from '../components/Speakers'
import PresentationStates from '../components/PresentationStates'
import Colors from '../components/Colors'

import js1_speakers from '../js1-speakers'
import js2_speakers from '../js2-speakers'
import css_speakers from '../css-speakers'

const styles = theme => ({


	sectionTitle: {
		textTransform: 'uppercase',
		fontSize: 16,
		marginBottom: 16
	},
	
});

const Index = (props) => {
	const { classes, initialStage } = props;
	const [ token, setToken ] = useState('');
	const [ errorNotification, setErrorNotification ] = useState(false);

	const closeErrorNotification = () => {
		setErrorNotification(false)
	}

	useEffect(() => {
		const rawToken = (new URL(window.location.href)).searchParams.get('token')

		if (rawToken) {
			setToken(rawToken)
		}

		return () => {}
	})

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
		clearTimeout(saveTimer)
		saveTimer = setTimeout(async () => {
			const res = await fetch('/api/stage',
			{
				headers: {
					token,
					'Content-Type': 'application/json'
				},
				method: 'PUT',
				body: JSON.stringify(newData)
			});

			if (res.status < 400) {
				setStage(newData)
			} else {
				setErrorNotification(true)
			}
		},200)
	}

	const onSpeakerSelect = (speaker) => {
		const data = Object.assign({}, stage, {
			speaker
		})

		if (!data.midSlide && speaker.color) {
			data.color = speaker.color
		}
		if (data.logoOnly) {
			data.color = 'white'
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
			} else if (!data.midSlide && data.speaker) {
				data.color = data.speaker.color
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

	const SubPaper = styled(Paper)`
		padding: 32px;
		margin-bottom: 16px
	`

	const SectionTitle = styled(Typography)`
		text-transform: uppercase;
		font-size: 16px
		margin-bottom: 16px
	`

	return (<div  css={css`
		flex-grow: 1
	`}>
		<Paper css={css`
				margin-bottom: 16px
			`}>
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

				<Grid item xs={6} css={css`
					height: calc(100vh - 64px);
					overflow: auto;
				`}>
					<SubPaper>
						<SectionTitle variant="h5">
							Speakers
						</SectionTitle>
						<Speakers
							speakers={ getSpeakers(stage) }
							currentSpeaker={ stage.speaker }
							onClick={ item => onSpeakerSelect(item) }
						/>
					</SubPaper>
				</Grid>

				<Grid item xs={6}>
					<SubPaper>
						<SectionTitle variant="h5">
							Status
						</SectionTitle>
						<Status 
							speaker={ stage.speaker }
							presentationState={ stage.presentation }
							midSlideState={ stage.midSlide }
							color={ stage.color }
							clearSpeaker={ () => clearCurrentSpeaker() } 
						/>
				</SubPaper>

				<SubPaper>
					<SectionTitle variant="h5">
						Presentation
					</SectionTitle>
					<PresentationStates
						onChange={ (...args) => onPresentationStateChange(...args) }
						presentationEnabled={ !!stage.speaker }
						presentation={ stage.presentation }
						midsession={ stage.midSlide }
						lunch={ stage.lunch }
						coffee={ stage.coffee }
						logoOnly={ stage.logoOnly }
					/>
				</SubPaper>

				{ stage && stage.event.startsWith('js') && (<SubPaper>
					<SectionTitle variant="h5">
						Colors
					</SectionTitle>
					<Colors onChange={ color => onColorChange(color) } />
				</SubPaper>)}

			</Grid>
		</Grid>
	</Container>
	<Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={ errorNotification }
        autoHideDuration={5000}
        onClose={closeErrorNotification}
      >
		<SnackbarContent
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar">
          			<ErrorIcon />
          			Could not save stage
        		</span>
      		}
    	/>
	  </Snackbar>
</div>)};

Index.getInitialProps = async ({ req, res, store, auth }) => {
	let apiUrl = `http://${process.env.HOST}:${process.env.PORT}/api/stage`;

	if (typeof window != "undefined") {
		apiUrl = '/api/stage'
	}

	if (
		! typeof window != "undefined"
		&& process.env.ADMIN_TOKEN
		&& process.env.ADMIN_TOKEN !== req.query.token
	) {
		res.status(401).send()
		return
	}

	console.log(apiUrl)
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

export default Index