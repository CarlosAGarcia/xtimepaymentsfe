import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react';
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';
import { Box, Skeleton } from '@mui/material';

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
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      // Capture content on every update
      setContent(editor.getHTML());
    },
  });



  const handleSave = async () => {
    try {
      await editSection(content, sectionName)
    } catch (error) {
      console.error('Error saving content:', error)
    }
  }

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
        <Box sx={{ minHeight: '100px', backgroundColor: 'lightgray' }}>
          <EditorContent editor={editor} />
          <button onClick={handleSave}>Save Content</button>
          {err && <div>{err}</div>}
        </Box>
      )}
    </div>
  );
};

export default TipTapEditor;
