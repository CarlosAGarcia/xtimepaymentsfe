import React from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface DraggableListProps<T> {
  items: T[];
  onReorder: (newOrder: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
}

const DraggableList = <T extends { name: string }>({
  items,
  onReorder,
  renderItem,
}: DraggableListProps<T>) => {
  return (
    <Reorder.Group
      axis="y" // Allow vertical dragging
      values={items}
      onReorder={onReorder}
      style={{ position: 'relative', listStyle: 'none', padding: 0 }}
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <Reorder.Item
            key={item.name}
            value={item}
            whileDrag={{ scale: 1.05 }} // Slightly scale the item being dragged
            layout
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            style={{
              marginBottom: '10px',
              borderRadius: '10px',
              background: 'lightgray',
              padding: '0', // Remove padding from the Reorder.Item itself
              position: 'relative',
            }}
          >
            {/* Add a draggable handle at the top left of the item */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                background: 'darkgray',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}
            >
              <IconButton
                style={{ cursor: 'grab', marginRight: '10px' }}
                disableRipple
              >
                <DragIndicatorIcon />
              </IconButton>
            </div>
            <div
              style={{
                padding: '20px',
              }}
            >
              {renderItem(item)}
            </div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default DraggableList;