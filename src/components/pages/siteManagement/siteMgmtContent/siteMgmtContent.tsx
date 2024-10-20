// on load it gets the full siteSettings object given the user.organisation._id
// then it loads each siteSection in an editor that allows the user to edit the content of the site given the section name

import React, { useEffect, useState } from 'react'
import { useSiteManagement } from '../../../../contexts/siteManagement/siteManagementContext';
import TipTapEditor from '../editor/TipTapEditor';
import AddSection from './AddWidget';
import DraggableList from '../../../common/lists/DraggableList';

const SiteManagementContent = () => {
    const {
        siteSettingsTemp, setSiteSettingsTemp
    } = useSiteManagement()

    // Updates temp settings content for matched section
    const setContentForATempSection = ({ name, content }: { name: string, content: string }) => {
        if (!siteSettingsTemp) return
        const newSections = siteSettingsTemp.sections.map(section => {
            if (section.name === name) {
                return { ...section, content }
            }
            return section
        })
        setSiteSettingsTemp({ ...siteSettingsTemp, sections: newSections })
    }

    const setBackgroundColorForATempSection = ({ name, backgroundColor }: { name: string, backgroundColor: string }) => {
        if (!siteSettingsTemp) return
        const newSections = siteSettingsTemp.sections.map(section => {
            if (section.name === name) {
                return { ...section, backgroundColor }
            }
            return section
        })

        setSiteSettingsTemp({ ...siteSettingsTemp, sections: newSections }, true)
    }


    // updates the corresponding section in temp settings to enabled and moves it to last in the order
    const onAddWidgetClicked = (option: string) => {
        const sectionToEnable = siteSettingsTemp?.sections.find(section => section.name === option)
        if (!sectionToEnable) return

        // changes the enabled flag to true when the name matches the option
        const newSections = siteSettingsTemp?.sections.map(section => {
            if (section.name === option) {
                return { ...section, enabled: true }
            }
            return section
        }
        ) || []

        setSiteSettingsTemp({ 
            ...siteSettingsTemp, 
            sections: newSections
        }, true)
    }

    const handleReorder = (newOrder: Section[]) => {
        console.log('new Order', newOrder)
        newOrder.forEach((section, index) => {
            setContentForATempSection({ name: section.name, content: section.content })
        })
    }

    const optionsAvailableToAdd = siteSettingsTemp?.sections.filter(section => !section.enabled).map(section => section.name) || []
    const sections = siteSettingsTemp?.sections.filter(section => section.enabled) || []
    return (
        <div>
            
            {
                sections.map((section) => <TipTapEditor 
                    key={section.name} 
                    sectionName={section.name}
                    content={section.content}
                    backgroundColor={section.backgroundColor}
                    setContent={(content) => setContentForATempSection({ name: section.name, content })}
                    setBackgroundColorForATempSection={(backgroundColor) => setBackgroundColorForATempSection({ name: section.name, backgroundColor })}
                />)
            }
            {
                siteSettingsTemp?.sections.find(section => !section.enabled) && <AddSection onOptionClicked={onAddWidgetClicked} options={optionsAvailableToAdd}/>
            }
        </div>
    )
}

export default SiteManagementContent

