import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react';
import axiosInstance from '../../../contexts/api';
import { useOrganisation } from '../../../contexts/organisations/organisationContext';

const { REACT_APP_API_URL } = process.env

type Props = {
  // Define props here
  section: string;
};

const TipTapEditor = (props: Props) => {
  const { section } = props;

  const { organisation } = useOrganisation()
  // const { } = useSiteManagement()
  const [content, setContent] = useState('<p>Start writing...</p>');
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      // Capture content on every update
      setContent(editor.getHTML());
    },
  });

  const handleSave = async () => {
    // Send the content to your backend
    const response = await axiosInstance.post(`${REACT_APP_API_URL}/api/site/${organisation?._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        content: JSON.stringify({ content }),
        section
      },
    }).then((response: any) => {
      alert('Content saved successfully');
      
    })
      .catch((error: any) => {
        console.error('Error saving content:', error);
      });
  };

  return (
    <div>
      <EditorContent editor={editor} />
      <button onClick={handleSave}>Save Content</button>
    </div>
  );
};

export default TipTapEditor;
