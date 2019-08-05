import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
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
	chip: {
		margin: theme.spacing(1),
	},
	avatar: {
		margin: 10,
		width: 60,
		height: 60,
	},
});

class Index extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			ticketId: '',
			modalOpen: false,
			error: false,
			loading: false,
		}
	}

	

	render() {
		console.log(this.props)
		const { classes } = this.props;
	
		function handleChange(event, newValue) {
		  setValue(newValue);
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
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Typography variant="h5" className={classes.sectionTitle}>
							Speakers
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Typography variant="h5" className={classes.sectionTitle}>
							Status
						</Typography>

						<Chip
							icon={<FaceIcon />}
							label="Presentation active"
							className={classes.chip}
							color="secondary"
						/>

<Divider light />

<Avatar alt="Remy Sharp" src="https://jsconfbp.com/static/f6374502c504eb6d34c71099a97f966c/05a89/isa_silveira.webp" className={classes.avatar} />

					</Paper>
					<Paper className={classes.paper}>
						<Typography variant="h5" className={classes.sectionTitle}>
							Presentation
						</Typography>
						<FormControlLabel
        					control={<Switch checked={ false } onChange={ () => {} } />}
        					label="Presentation active"
      					/>
						  <Divider light />

						<FormControlLabel
        					control={<Switch checked={ false } onChange={ () => {} } />}
        					label="Mid session slides active"
      					/>
					</Paper>
					<Paper className={classes.paper}>

						<Typography variant="h5" className={classes.sectionTitle}>
							Colors
						</Typography>

						<Button variant="contained" className={ classnames(classes.colorButton, classes.redButton) }>
        					Red
      					</Button>
						<Button variant="contained" className={ classnames(classes.colorButton, classes.blueButton) }>
        					Blue
      					</Button>
						<Button variant="contained" className={ classnames(classes.colorButton, classes.greenButton) }>
        					Green
      					</Button>
						<Button variant="contained" className={ classnames(classes.colorButton, classes.yellowButton) }>
        					Yellow
      					</Button>
						<Button variant="contained" className={ classnames(classes.colorButton, classes.whiteButton) }>
        					White
      					</Button>    
						<Button variant="contained" className={ classnames(classes.colorButton, classes.blackButton) }>
        					Black
      					</Button>
					</Paper>
				</Grid>
        	</Grid>
		</Container>
	</div>)
	}


	static getInitialProps({ req, store, auth }) {
		return {}
	}

}


export default withStyles(styles)(Index);