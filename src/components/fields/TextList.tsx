import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { CountTokenContext } from '../../contexts/countTokens/countTokens';

const TextList: React.FC = () => {
    const countTokenContext = useContext(CountTokenContext);
    if (!countTokenContext) throw new Error('YourComponent must be used within a countTokenContext provider');
    const { text = '', contextTokensVars } = countTokenContext;
    const { tokenIndexes = [], contextTokensTotal = 0, contextTokensLoading, contextTokensErr } = contextTokensVars;



    console.log('contextTokensTotal', contextTokensTotal)
    const cost = .015 * (text.length/3) // contextTokensTotal;
    return (
        <div>
            <Typography>{`CHARS: ${text.length}`}</Typography>
            <Typography>{`TOKENS: ${text.length/3 || '-'}`}</Typography>
            <Typography>{`COST: $${cost}`}</Typography>
        </div>
    );
}

export default TextList;