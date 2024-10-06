// on load it gets the full siteSettings object given the user.organisation._id
// then it loads each siteSection in an editor that allows the user to edit the content of the site given the section name

import React, { useEffect } from 'react'
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';
import TipTapEditor from '../editor/TipTapEditor';
import defaultSections from '../../../contexts/siteManagement/defaultSections';
import AddSection from './AddWidget';
import DraggableList from '../../lists/DraggableList';

const SiteManagementContent = () => {
    const { siteSettings, onSaveSitSettings, onSaveSitSettingsTemp } = useSiteManagement()
    const sections = siteSettings?.sections.filter(section => section.enabled) || []

    const onAddWidgetClicked = (option: string) => {
        console.log(`Selected option: ${option}`);
    }

    const handleReorder = (newOrder: any) => {
        console.log(newOrder)
    }
    return (
        <div>
 
            <DraggableList
                items={sections}
                onReorder={handleReorder}
                renderItem={(section) => <TipTapEditor key={section.name} sectionName={section.name} />}
            />
            {
                sections.length < defaultSections.length && <AddSection onOptionClicked={onAddWidgetClicked} />
            }
        </div>
    )
}

export default SiteManagementContent

