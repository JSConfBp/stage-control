import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
	root: {
		flexGrow: 1,
    },
})

const PresentationStates = ({ classes, onChange, presentation, midsession} ) => {
    return (<>
        <FormControlLabel
            control={<Switch checked={ presentation } 
            onChange={ (event) => onChange('presentation', event.target.checked) } />}
            label="Presentation active"
        />
            <Divider light />

        <FormControlLabel
            control={<Switch checked={ midsession } 
            onChange={ (event) => onChange('midsession', event.target.checked) } />}
            label="Mid session slides active"
        />
    </>)
}



export default withStyles(styles)(PresentationStates);