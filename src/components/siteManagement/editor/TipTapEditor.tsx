import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import { useEffect, useState } from 'react';
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';
import { Box, Button, IconButton, Collapse } from '@mui/material';
import Strike from '@tiptap/extension-strike';
import { FormatBold, FormatItalic, StrikethroughS } from '@mui/icons-material';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontFamilySelector from './FontFamilySelector';
import './EditorStyles.css'; // Import custom CSS for styling

type Props = {
  sectionName: string;
};

const TipTapEditor = (props: Props) => {
  const { sectionName } = props;

  // CONTEXT vars
  const { getSection, sectionsLoading, sectionErrs, editSection } = useSiteManagement()
  const isLoading = sectionsLoading[sectionName]
  const err = sectionErrs[sectionName]
  const sectionObject = getSection(sectionName)


  // ############### LOCAL STATE ###############
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false); // To track focus state


  // ############### UPDATES EDITOR CONTENT ON LOAD ###############
  const editor = useEditor({
    extensions: [
      StarterKit, 
      Bold, Italic, Heading, Strike,
      TextStyle,  // Required for handling inline text styles
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
  const updateEditorContent = (newContent: string) => {
    setContent(newContent);
    if (editor) {
      editor.commands.setContent(newContent);
    }
  };
  useEffect(() => {
    if (sectionObject) {
      updateEditorContent(sectionObject.content)
    }
  }, [ sectionObject?.content ]);

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
  const handleSave = async () => {
    try {
      const htmlContent = editor?.getHTML() || '';
      await editSection({ content: `${htmlContent}`, name: sectionName, enabled: true })
    } catch (error) {
      console.error('Error saving content:', error)
    }
  }

  // Delete function
  const handleDelete = () => {
    // just sets enabled to false and saves
    editSection({ content, name: sectionName, enabled: false })
  };


  return (
    <div
      onBlur={() => isFocused ? setIsFocused(false) : undefined}
      onFocus={() => !isFocused && setIsFocused(true)}
    >
      <Box
        sx={{ backgroundColor: 'lightgray', marginBottom: '.5rem', padding: '1rem', position: 'relative' }}
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
              padding: '10px',            // Inner padding for the editor content
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

        </Box>
        <Box mt={2}>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Content
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="secondary" sx={{ ml: 2 }}>
            Delete Content
          </Button>
        </Box>
        </Collapse>

        {err && <div>{err}</div>}

      </Box>
    </div>
  );
};

export default TipTapEditor;
