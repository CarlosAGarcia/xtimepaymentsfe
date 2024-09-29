/*
    This header would display a quick intro to what this page is.
    The next component under would be an 'ANALYTICS' component that would link to the /analytics page.
    The next component would be a link to the 'live site' which would be the actual site they link people to and whether it's active or not.
    the next component would be a collapsed section that would include an easy to copy link to the site along with additional 'special' link that are generated for promotions etc.
        it also generates an auto updating QR code to paste on posters etc for all the above links.
    the next component would just be the 'CONTENT' component that would allow the user to edit the content of the site.
*/

import React from 'react'
import { useOrganisation } from '../../../contexts/organisations/organisationContext'
import { Button } from '@mui/material';
import { css } from '@emotion/react';
import { Box, Collapse } from '@mui/material';


export default function SiteManagementHeader() {
    const { organisation } = useOrganisation()

    const [isOpen, setIsOpen] = React.useState(false)

    const saveChanges = () => { 
        // save changes to the site
    }

    const reset = () => {
        // reset the site to the last saved version
    }

    return (
        <div>
            <h1>{`Site Management - ${organisation?.name}`}</h1>

            {/* EXPLANATION + buttons */}
            <Box
                component="div"
                sx={{
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    padding: '16px',
                    borderRadius: '8px',
                    display: 'flex',
                }}
            >
                <Box className='header'
                    sx={{
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        padding: '16px',
                        borderRadius: '8px',
                        display: 'flex',
                    }}
                >
                    <p>
                        This is a demo page - Edit contents and preview changes before publishing.
                    </p>

                    <div>
                    <button>
                            <Button variant="contained" color="primary" onClick={reset}>
                                RESET
                            </Button>
                        </button>
                        <button>
                            <Button variant="contained" color="primary" onClick={saveChanges}>
                                Publish
                            </Button>
                        </button>
                    </div>
                </Box>
            </Box>
            
            {/* LINKS */}
            <Box
                sx={{
                    p: 2,
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                }}
                >
            <Button
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    mt: 2,
                }}
            >
                {isOpen ? 'Hide' : 'Show'} Site Links
            </Button>
            
            <Collapse in={isOpen}>
                This is the content inside the collapsible section. It can be anything from text, forms, to complex components.
            </Collapse>
            </Box>

            {/* <Analytics /> */}
            {/* <LiveSite /> */}
            {/* <SiteLinks /> */}
            {/* <Content /> */}
        </div>
    )
}