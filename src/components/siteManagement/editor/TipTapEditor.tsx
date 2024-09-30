import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import { useEffect, useState } from 'react';
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';
import { Box, Button, Fade, Skeleton, IconButton, Collapse } from '@mui/material';
import Strike from '@tiptap/extension-strike';
// import TextAlign from '@tiptap/extension-text-align';
import { FormatBold, FormatItalic, StrikethroughS } from '@mui/icons-material';

type Props = {
  sectionName: string;
};

const TipTapEditor = (props: Props) => {
  const { sectionName } = props;

  const { getSection, sectionsLoading, sectionErrs, editSection } = useSiteManagement()

  // gets this specific section from the siteSettings object
  const isLoading = sectionsLoading[sectionName]
  const err = sectionErrs[sectionName]
  const sectionObject = getSection(sectionName)

  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false); // To track focus state

  // Function to update the editor content
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

  const editor = useEditor({
    extensions: [
      StarterKit, 
      Bold, Italic, Heading, Strike,
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
    <div>
      {isLoading ? (
        // Skeleton will inherit the dimensions of the child it wraps
        <Skeleton variant="rectangular" animation="wave">
            <EditorContent editor={editor} />
            <button onClick={handleSave}>Save Content</button>
            {err && <div>{err}</div>}
        </Skeleton>
      ) : (
        // Render actual content after loading
<Box
      sx={{ backgroundColor: 'lightgray', marginBottom: '.5rem', padding: '1rem' }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={-1} // Make the Box focusable
    >
      {/* Toolbar */}
            {/* Toolbar (expands upwards) */}
      <Collapse in={isFocused} orientation="vertical" sx={{ width: '100%' }}>
      {isFocused && (
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
          >
            <FormatBold />
          </IconButton>
          <IconButton
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            color={editor?.isActive('italic') ? 'primary' : 'default'}
          >
            <FormatItalic />
          </IconButton>
          <IconButton
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            color={editor?.isActive('strike') ? 'primary' : 'default'}
          >
            <StrikethroughS />
          </IconButton>
          {/* You can add more buttons for additional features like underline, font size, etc. */}
        </Box>
      )}
      </Collapse>

      {/* Tiptap Editor Content */}
      <EditorContent editor={editor} />

      {/* Save/Delete Buttons */}
      {/* Save/Delete Buttons (expands downwards) */}
      <Collapse in={isFocused} orientation="vertical" sx={{ mt: 2 }}>
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

      )}
    </div>
  );
};

export default TipTapEditor;
