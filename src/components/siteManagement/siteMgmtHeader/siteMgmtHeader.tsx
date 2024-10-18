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
import { Box, Collapse } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';

export default function SiteManagementHeader() {
    const { organisation } = useOrganisation()
    const { saveTempSiteSettings } = useSiteManagement()

    const [isOpen, setIsOpen] = React.useState(false)

    const saveChanges = () => { 
        // save changes to the site
    }

    const reset = () => {
        // reset the site to the last saved version
    }

    // site url is this website url + /organisation?.name
    const currentUrl = window.location.hostname
    const SITE_URL = `https://www.${currentUrl}/${organisation?.name}`
    return (
        <div>

            {/* EXPLANATION + buttons */}
            <Box
                component="div"
                sx={{
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                }}
            >
                {/* HEADER */}
                <Box className='header'
                // sx breaks the Box child and h1 child into different lines if too long to fit
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        '@media (max-width: 1000px)': {
                            fontSize: '.8rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            // centered text
                            // justifyContent: 'center',
                        },
                        'h1': {
                            marginBottom: '0',
                            marginTop: '0',
                        }
                    }}
                >
                    <Box sx={{
                        marginRight: '1rem',
                        '@media (max-width: 1000px)': {
                            display: 'flex',
                            // justifyContent: 'center',
                        }
                    }}>
                        <h1>{`SITE MANAGEMENT`}</h1>
                    </Box>
                    <Box 
                        // if window width is less than 1000px, h1 font size is .8rem
                        // also it's overflow hidden with ellipsis
                        sx={{
                            '@media (max-width: 1000px)': {
                                marginRight: 0,
                                display: 'flex',
                                justifyContent: 'center'
                            }
                        }}
                    >
                        <h1>{`${organisation?.name}`}</h1>
                    </Box>
                </Box>
                    
                <Collapse in={isOpen}>
                    {/* DESCRIPTION */}

                    <Box>
                        <p>
                            This is a demo page - Edit contents and preview changes before publishing.
                        </p>
                        <div>
                            {/* <button>
                                <Button variant="contained" color="primary" onClick={reset}>
                                    RESET
                                </Button>
                            </button>
                            <button>
                                <Button variant="contained" color="primary" onClick={saveChanges}>
                                    Publish
                                </Button>
                            </button> */}
                        </div>
                    </Box>

                    {/* LINKS */}
                    {/* <Box
                        sx={{
                            p: 2,
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px',
                        }}
                    >
                        LINKS HERE !!
                        
                    </Box> */}
                    
                </Collapse>

                {/* BOT BUTTONs */}


            {/* container that  */}

                <Box sx={{
                    // bot right corner
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '1rem',
                }}>
                    <Box
                        sx={{
                            // container flex for buttons
                            display: 'flex',
                            
                        }}>
                        <Button onClick={() => saveTempSiteSettings()} sx={{
                        }} >
                            SAVE
                        </Button>  

                        {/* OPENS TEST URL IN NEW TAB */}
                        <Button onClick={() => window.open(SITE_URL, '_blank')} sx={{
                            marginRight: '1rem',
                            display: 'flex',
                            alignItems: 'center',

                        }}>
                            <div>{`${SITE_URL}`}</div>
                            <OpenInNewIcon />
                        </Button>

                        {/* SHOW/HIDE BUTTON */}
                        <Button onClick={() => setIsOpen(!isOpen)} sx={{
                        }} >
                            {isOpen ? 'Hide' : 'Show'} Details
                        </Button>  
                    </Box>
                </Box>

            </Box>

            {/* <Analytics /> */}
            {/* <LiveSite /> */}
            {/* <SiteLinks /> */}
            {/* <Content /> */}

        </div>
    )
}