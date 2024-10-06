import React from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';

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
              padding: '20px',
              cursor: 'grab',
            }}
          >
            {renderItem(item)}
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default DraggableList;
