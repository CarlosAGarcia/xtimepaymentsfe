// on load it gets the full siteSettings object given the user.organisation._id
// then it loads each siteSection in an editor that allows the user to edit the content of the site given the section name

import React, { useEffect } from 'react'
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';
import TipTapEditor from '../editor/TipTapEditor';

const SiteManagementContent = () => {
    const { siteSettings } = useSiteManagement()
    const sections = [ siteSettings?.sections[0] ] // || []

    return (
        <div>
            {sections.map((section: any) => (
                <TipTapEditor key={section.name} sectionName={section.name} />
            ))}
        </div>
    )
}

export default SiteManagementContent

