import React from 'react';
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Editor } from '@tiptap/react';

const TextAlignButtons = ({ editor }: { editor: Editor | null }) => {
    return (
      <div>
        <IconButton onClick={() => // @ts-ignore
            editor?.chain().focus().setTextAlign('left').run()}>
          <FormatAlignLeft />
        </IconButton>
        <IconButton onClick={() => // @ts-ignore
              editor?.chain().focus().setTextAlign('center').run()}>
          <FormatAlignCenter />
        </IconButton>
        <IconButton onClick={() =>  // @ts-ignore
            editor?.chain().focus().setTextAlign('right').run()}>
          <FormatAlignRight />
        </IconButton>
      </div>
    );
  };

export default TextAlignButtons;