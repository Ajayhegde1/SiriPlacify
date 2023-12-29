// DraggableList.js
import TextField from "@/components/InputComponents/TextField";
import React, { Fragment, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

const DraggableItem = ({
  id,
  itemName,
  indextier,
  index,
  content,
  moveItem,
  minCTC,
  maxCTC,
}) => {
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Move the state initialization here
  const user = useSelector((state) => state.user);
  const [, drag] = useDrag({
    type: "ITEM",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const springProps = useSpring({
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "#f8f8f8" : "white",
    boxShadow: isDragging
      ? "0 4px 8px rgba(0, 0, 0, 0.1)"
      : "0 2px 4px rgba(0, 0, 0, 0.1)",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
  });

  const hoverSpringProps = useSpring({
    scale: isHovered ? 1.05 : 1,
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div
      ref={(node) => {
        drag(drop(node));
        setIsDragging(!!node && node.dragging);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",

        marginBottom: "4px",
        cursor: "pointer",

        ...springProps,
        ...hoverSpringProps,
      }}
    >
      <div className="flex" key={index}>
        <div className="col-span-4">
          <TextField
            label={`Minimum CTC of ${itemName} (in Rs.)`}
            placeholder="75,0000.00"
            type="text"
            value={minCTC}
            onChangeHandler={(e) =>
              handleCTCChange(index, "minCTC", e.target.value)
            }
            disabled={
              user === null ? true : user.accType === "0" ? false : true
            }
          />
        </div>
        <div className="col-span-4">
          <TextField
            label={`Maximum CTC of ${itemName} (in Rs.)`}
            placeholder="85,0000.00"
            type="text"
            value={maxCTC}
            onChangeHandler={(e) =>
              handleCTCChange(index, "maxCTC", e.target.value)
            }
            disabled={
              user === null ? true : user.accType === "0" ? false : true
            }
          />
        </div>
        {user === null ? (
          <div></div>
        ) : user.accType === "0" ? (
          <div className="flex justify-end col-span-2">
            <button
              className="my-auto whitespace-nowrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={() => handleDeleteTier(index)}
            >
              Clear Tier
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </animated.div>
  );
};

const DraggableList = ({ key, maxCTC, minCTC, index }) => {
  const [items, setItems] = useState([
    { id: 1, content: "Item 1" },
    { id: 2, content: "Item 2" },
    { id: 3, content: "Item 3" },
    // Add more items as needed
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <DraggableItem
          key={key}
          maxCTC={maxCTC}
          minCTC={minCTC}
          index={index}
          moveItem={moveItem}
        />
      </div>
    </DndProvider>
  );
};

export default DraggableList;
