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

const PresentationStates = ({ 
    classes, 
    onChange, 
    presentationEnabled,
    presentation, 
    midsession,
    coffee,
    lunch,
    logoOnly
} ) => {
    return (<>
        <FormControlLabel
            disabled={ !presentationEnabled }
            control={<Switch checked={ presentation } 
            onChange={ (event) => onChange('presentation', event.target.checked) } />}
            label="Presentation active"
        />
        <Divider light />
        <FormControlLabel
            control={<Switch checked={ midsession }
            onChange={ (event) => onChange('midsession', event.target.checked) } />}
            label="Mid-session slides active"
        />
        <Divider light />
        <FormControlLabel
            control={<Switch checked={ coffee }
            onChange={ (event) => onChange('coffee', event.target.checked) } />}
            label="Coffee break"
        />
        <Divider light />
        <FormControlLabel
            control={<Switch checked={ lunch }
            onChange={ (event) => onChange('lunch', event.target.checked) } />}
            label="Lunch break"
        />
        <Divider light />
        <FormControlLabel
            control={<Switch checked={ logoOnly }
            onChange={ (event) => onChange('logoOnly', event.target.checked) } />}
            label="Logo only"
        />
    </>)
}



export default withStyles(styles)(PresentationStates);