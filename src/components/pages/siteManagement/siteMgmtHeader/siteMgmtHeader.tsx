/*
    This header would display a quick intro to what this page is.
    The next component under would be an 'ANALYTICS' component that would link to the /analytics page.
    The next component would be a link to the 'live site' which would be the actual site they link people to and whether it's active or not.
    the next component would be a collapsed section that would include an easy to copy link to the site along with additional 'special' link that are generated for promotions etc.
        it also generates an auto updating QR code to paste on posters etc for all the above links.
    the next component would just be the 'CONTENT' component that would allow the user to edit the content of the site.
*/

import React, { useEffect } from 'react'
import { useOrganisation } from '../../../../contexts/organisations/organisationContext'
import { Button } from '@mui/material';
import { Box, Collapse } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useSiteManagement } from '../../../../contexts/siteManagement/siteManagementContext';
import ColorPicker from '../../../common/pickers/ColorPicker';

export default function SiteManagementHeader() {
    const { organisation } = useOrganisation()
    const { saveTempSiteSettings, setSiteSettingsTemp, siteSettingsTemp } = useSiteManagement()
    const [isOpen, setIsOpen] = React.useState(false)

    const [backgroundColor, setBackgroundColor] = React.useState('#dfdcf5')
    useEffect(() => {
        if (siteSettingsTemp?.backgroundColor && siteSettingsTemp.backgroundColor !== backgroundColor) {
            handleColorChange(siteSettingsTemp.backgroundColor)
        }
    }, [siteSettingsTemp, backgroundColor])

    const handleColorChange = (color: string) => {
        if (color !== backgroundColor) {
            setBackgroundColor(color)
            setSiteSettingsTemp({ ...siteSettingsTemp, backgroundColor: color }, true)
        }
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
                <Box sx={{

                }}>
                    <h3>
                        Edit your site and preview changes before publishing ✎
                    </h3>
                    <h3>
                        Dont worry, changes are saved automatically and not published until you hit the big green button ✅
                    </h3>
                    <h3>
                        This section won't appear on the live site 😶‍🌫️
                    </h3>
                </Box>
                    
                <Collapse in={isOpen}>
                    {/* DESCRIPTION */}
                    <Box>
                        <p>
                            This is a demo page - Edit contents and preview changes before publishing.
                        </p>
                    </Box>
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
                            <ColorPicker 
                                color={backgroundColor}
                                handleColorChange={handleColorChange}
                            />
                         <Button onClick={() => saveTempSiteSettings()} sx={{
                            background: '#d4d41e',
                            color: '#fff',
                            marginRight: '1rem',
                            borderRadius: '8px',
                        }} >
                            SAVE ✎
                        </Button>
                        <Button onClick={() => saveTempSiteSettings()} sx={{
                            background: '#4caf50',
                            color: '#fff',
                            marginRight: '1rem',
                            borderRadius: '8px',
                        }} >
                            PUBLISH ✔︎
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
        </div>
    )
}