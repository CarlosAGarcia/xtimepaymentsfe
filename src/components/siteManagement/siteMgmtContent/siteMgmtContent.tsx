// on load it gets the full siteSettings object given the user.organisation._id
// then it loads each siteSection in an editor that allows the user to edit the content of the site given the section name

import React, { useEffect } from 'react'
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';
import TipTapEditor from '../editor/TipTapEditor';
import defaultSections from '../../../contexts/siteManagement/defaultSections';
import AddSection from './AddWidget';

const SiteManagementContent = () => {
    const { siteSettings } = useSiteManagement()
    const sections = siteSettings?.sections.filter(section => section.enabled) || []

    const onOptionClicked = (option: string) => {
        console.log(`Selected option: ${option}`);
    }

    return (
        <div>
            {sections.map((section: any) => (
                <TipTapEditor key={section.name} sectionName={section.name} />
            ))}
            {
                sections.length < defaultSections.length && <AddSection onOptionClicked={onOptionClicked} />
            }
        </div>
    )
}

export default SiteManagementContent

