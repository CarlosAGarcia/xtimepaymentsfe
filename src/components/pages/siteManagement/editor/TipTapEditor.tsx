import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import { useEffect, useState } from 'react';
import { useSiteManagement } from '../../../../contexts/siteManagement/siteManagementContext';
import { Box, Button, IconButton, Collapse } from '@mui/material';
import Strike from '@tiptap/extension-strike';
import { FormatBold, FormatItalic, StrikethroughS } from '@mui/icons-material';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontFamilySelector from './components/FontFamilySelector';
import './EditorStyles.css'; // Import custom CSS for styling
import FontSizeSelector from './components/FontSizeSelector';
import { FontSize } from './customExtensions/FontSize';

type Props = {
  sectionName: string;
  content: string;
  setContent: (content: string) => void;
};

const TipTapEditor = (props: Props) => {
  const { sectionName, content, setContent } = props;

  // CONTEXT vars
  const { siteSettingsTemp, setSiteSettingsTemp, sectionErrs } = useSiteManagement()
  const err = sectionErrs[sectionName]

  // ############### LOCAL STATE ###############
  const [isFocused, setIsFocused] = useState(false); // To track focus state


  // ############### UPDATES EDITOR CONTENT ON LOAD ###############
  const editor = useEditor({
    extensions: [
      StarterKit, 
      Bold, Italic, Heading, Strike,
      TextStyle,  // Required for handling inline text styles
      FontSize,
      // FontSize.configure({
      //   types: ['textStyle'],  // Ensure it applies to textStyle
      // }),
      FontFamily.configure({
        types: ['textStyle'],  // Ensure it applies to textStyle
      }),
      // TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: content,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    onUpdate: ({ editor }) => {
      // Capture content on every update
      setContent(editor?.getHTML());
    },
  });


  // ############### OVERWRITES TAB KEY TO INSERT SPACES ###############
  useEffect(() => {
    // Function to handle the Tab key press and insert spaces
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        // You can insert a tab (usually 4 spaces) or customize the amount of spaces
        editor?.commands.insertContent('    ');
      }
    };

    // Add the keydown event listener to the editor's DOM element
    const editorElement = document.querySelector('.ProseMirror');
    
    // TypeScript expects an EventListener type, so cast the event to KeyboardEvent
    const listener = (event: Event) => handleKeyDown(event as KeyboardEvent);

    editorElement?.addEventListener('keydown', listener);

    // Clean up the event listener when the component unmounts
    return () => {
      editorElement?.removeEventListener('keydown', listener);
    };
  }, [editor]);


  // ############### ACTION FUNCTIONS - SAVE/DELETE ###############

  // Delete function - memory only
  const handleDelete = () => {
      // just sets enabled to false for the section
      const newSiteSettings = {
        ...siteSettingsTemp,
        sections: siteSettingsTemp?.sections.map(section => {
          if (section.name === sectionName) {
            return { ...section, enabled: false }
          }
          return section
      })
    }

    setSiteSettingsTemp(newSiteSettings, true)
  }


  return (
    <div
      onBlur={() => isFocused ? setIsFocused(false) : undefined}
      onFocus={() => !isFocused && setIsFocused(true)}
    >
      <Box
        sx={{ 
          backgroundColor: 'lightgray', 
          marginBottom: '.5rem', 
          padding: '1rem 1rem 0 1rem', 
          position: 'relative' }}
        tabIndex={-1} // Make the Box focusable
      >

        {/* Tiptap Editor Content */}
        <Box 
          sx={{ 
            padding: 0,                   // Ensure no unwanted padding
            minHeight: '200px',           // Minimum height for the editor area
            display: 'flex',              // Ensure content is flexible
            alignItems: 'stretch',        // Stretch content to fit the container
           }}
        >
          <div className="editor-wrapper">

          <EditorContent
            editor={editor}
            style={{
              width:'100%',                  // Ensure editor fills the container
              flexGrow: 1,                // Ensures editor grows to fit
              // padding: '10px',            // Inner padding for the editor content
              display: 'flex'
            }}
           />
          </div>

        </Box>

        {/* Save/Delete Buttons */}
        <Collapse in={isFocused} orientation="vertical" 
          easing={{ enter: 'ease-out', exit: 'ease-in' }}  // Smooth easing
          sx={{ mt: 2, transition: 'all 0.5s ease' }}  // Smooth transition for the buttons as well
        >
          <Box
            sx={{
            paddingBottom: '1rem',
            }}
          >
            <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    mb: 2,
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                >
                  <IconButton
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    color={editor?.isActive('bold') ? 'primary' : 'default'}
                  ><FormatBold /></IconButton>

                  <IconButton
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    color={editor?.isActive('italic') ? 'primary' : 'default'}
                  ><FormatItalic /></IconButton>

                  <IconButton
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    color={editor?.isActive('strike') ? 'primary' : 'default'}
                  ><StrikethroughS /></IconButton>


                <FontFamilySelector editor={editor} />

                  <FontSizeSelector editor={editor} />
            </Box>
            <Box mt={2}>
              <Button onClick={handleDelete} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                Delete Content
              </Button>
            </Box>
          </Box>
        </Collapse>

        {err && <div>{err}</div>}

      </Box>
    </div>
  );
};

export default TipTapEditor;
