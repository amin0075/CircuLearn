import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isTouchDevice } from "@src/utils/deviceUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@src/components/ui/card";
import { Typography } from "@src/components/ui/typography";
import { cn } from "@src/lib/utils";

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
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      className={cn(
        "cursor-grab transition-transform active:cursor-grabbing",
        isDragging && "scale-95 opacity-50",
      )}
    >
      <Card
        size="sm"
        className="flex min-h-14 min-w-14 items-center justify-center ring-1 ring-border transition-shadow hover:ring-primary/40"
      >
        <CardContent className="flex items-center justify-center p-3">
          <Typography
            variant="heading-sm"
            as="span"
            fontWeight="semibold"
            className="font-mono"
          >
            {item}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

const DropZone: React.FC<{
  accept: string[];
  onDrop: (index: number) => void;
  children: React.ReactNode;
  slotIndex: number;
}> = ({ accept, onDrop, children, slotIndex }) => {
  const [{ isOver }, ref] = useDrop({
    accept,
    drop: (item: { index: number }) => onDrop(item.index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Card
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      size="sm"
      className={cn(
        "border-2 border-dashed bg-transparent p-1 shadow-none ring-0 transition-colors",
        isOver
          ? "border-primary bg-primary/10"
          : "border-border/80 bg-muted/20",
      )}
      aria-label={`Binary digit position ${slotIndex + 1}`}
    >
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
};

const DragAndDrop: React.FC<{
  items: string[];
  order?: string[];
  correctOrder: string[];
  onDrop: (order: string[]) => void;
}> = ({ items, order, correctOrder: _correctOrder, onDrop }) => {
  const [currentOrder, setCurrentOrder] = useState(order ?? items);

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
      <Card size="sm" className="bg-muted/20">
        <CardHeader className="pb-2">
          <CardDescription>Drag digits to reorder</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {currentOrder.map((item, index) => (
              <DropZone
                key={`${item}-${index}`}
                accept={["item"]}
                onDrop={(draggedIndex) => handleDrop(draggedIndex, index)}
                slotIndex={index}
              >
                <DraggableItem item={item} index={index} />
              </DropZone>
            ))}
          </div>
        </CardContent>
      </Card>
    </DndProvider>
  );
};

export default DragAndDrop;
