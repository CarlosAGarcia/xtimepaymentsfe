// on load it gets the full siteSettings object given the user.organisation._id
// then it loads each siteSection in an editor that allows the user to edit the content of the site given the section name

import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';
import { useOrganisation } from '../../../contexts/organisations/organisationContext';

const SiteManagementContent = () => {
    const { organisation } = useOrganisation()
    const { siteSettings } = useSiteManagement()

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
        </div>
    )
}

export default SiteManagementContent

