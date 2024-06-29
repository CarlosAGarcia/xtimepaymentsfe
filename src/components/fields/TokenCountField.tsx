import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import { CountTokenContext } from '../../contexts/countTokens/countTokens';

const TokenCountField: React.FC = () => {
    const countTokenContext = useContext(CountTokenContext);
    if (!countTokenContext) throw new Error('YourComponent must be used within a countTokenContext provider');
    const { text, setTextState } = countTokenContext;


    return <TextField
        label="TokenCountField"
        variant="outlined"
        fullWidth
        multiline
        minRows={3}
        maxRows={10}
        value={text}
        onChange={(e) => setTextState(e.target.value)}
    />;
}

export default TokenCountField;