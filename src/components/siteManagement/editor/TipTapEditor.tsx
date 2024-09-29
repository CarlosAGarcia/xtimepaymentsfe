import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react';
import { useSiteManagement } from '../../../contexts/siteManagement/siteManagementContext';

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
  useEffect(() => {
    if (sectionObject) {
      setContent(sectionObject.content)
    }
  }, [sectionObject])

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
      <EditorContent editor={editor} />
      <button onClick={handleSave}>Save Content</button>
      {isLoading && <div>Loading...</div>}
      {err && <div>{err}</div>}
    </div>
  );
};

export default TipTapEditor;
