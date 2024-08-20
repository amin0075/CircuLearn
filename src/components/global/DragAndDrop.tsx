import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isTouchDevice } from "@src/utils/deviceUtils";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import { bgColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";

// Draggable Item
const DraggableItem: React.FC<{ item: string; index: number }> = ({
  item,
  index,
}) => {
  const [{ isDragging }, ref] = useDrag(() => ({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      // @ts-ignore
      ref={ref}
      className={`p-2 w-7 flex items-center justify-center m-2 cursor-pointer transition-transform duration-200 rounded-lg ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <Typography variant="body1">{item}</Typography>
    </div>
  );
};

// Drop Zone
const DropZone: React.FC<{
  accept: string[];
  onDrop: (index: number) => void;
  children: React.ReactNode;
}> = ({ accept, onDrop, children }) => {
  const [, ref] = useDrop({
    accept,
    drop: (item: { index: number }) => onDrop(item.index),
  });

  return (
    <Paper
      // @ts-ignore
      ref={ref}
      className="m-2 flex items-center justify-center dark:!bg-customGrayDark"
    >
      {children}
    </Paper>
  );
};

// Drag and Drop Component
const DragAndDrop: React.FC<{
  items: string[];
  correctOrder: string[];
  onDrop: (order: string[]) => void;
}> = ({ items, correctOrder, onDrop }) => {
  const [currentOrder, setCurrentOrder] = useState(items);

  const handleDrop = (index: number, targetIndex: number) => {
    const newOrder = [...currentOrder];
    const [movedItem] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, movedItem);
    setCurrentOrder(newOrder);
    onDrop(newOrder);
  };

  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <div className="flex flex-row space-x-2">
        {currentOrder.map((item, index) => (
          <DropZone
            key={index}
            accept={["item"]}
            onDrop={(draggedIndex) => handleDrop(draggedIndex, index)}
          >
            <DraggableItem item={item} index={index} />
          </DropZone>
        ))}
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;
