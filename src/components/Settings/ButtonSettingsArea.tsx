"use client";

import React, { useState } from "react";
import { useSettings } from "contexts/SettingsContext";
import { categoryIconMap } from "types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ソート可能なボタンコンポーネント
function SortableButton({
  button,
  category,
  onToggle,
}: {
  button: { id: string; name: string; isActive: boolean };
  category: { isActive: boolean };
  onToggle: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: button.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(button.id);
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group touch-none">
      <div {...attributes} {...listeners}>
        <button
          className="select-none cursor-move min-w-18 h-[2.7em] py-2 px-3.5 rounded-md whitespace-nowrap bg-(--button-color) text-(--button-text-color) border-3 border-solid border-(--button-border)"
          disabled={!category.isActive}
          type="button"
        >
          {button.name}
        </button>
      </div>
      <button
        onClick={handleCloseClick}
        className="absolute cursor-pointer -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-(--search-bar-bg) border-solid border-3 border-(--button-border) text-(--button-text-color) rounded-full group-hover:opacity-100 transition-opacity duration-200"
        title={`${button.name}を非表示にする`}
        type="button"
      >
        <span className="icon-[mdi--close] w-3 h-3"></span>
      </button>
    </div>
  );
}

export default function ButtonSettingsArea() {
  const {
    categories,
    loading,
    toggleCategory,
    toggleButton,
    updateButtonOrder,
  } = useSettings();
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeCategoryIndex = categories.findIndex((category) =>
        category.list.some((button) => button.id === active.id)
      );

      if (activeCategoryIndex !== -1) {
        const oldIndex = categories[activeCategoryIndex].list.findIndex(
          (button) => button.id === active.id
        );
        const newIndex = categories[activeCategoryIndex].list.findIndex(
          (button) => button.id === over.id
        );

        updateButtonOrder(activeCategoryIndex, oldIndex, newIndex);
      }
    }
  };

  const handleToggleButton = (buttonId: string) => {
    toggleButton(buttonId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-8 max-md:h-[calc(100dvh/2)] h-[calc(100dvh/3)]">
        読み込み中...
      </div>
    );
  }

  const toggleExpanded = (categoryIndex: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryIndex)) {
        newSet.delete(categoryIndex);
      } else {
        newSet.add(categoryIndex);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col justify-center mx-auto pt-4 pb-12 sm:overflow-x-visible overflow-x-auto max-sm:w-full">
      {categories.map((category, categoryIndex) => {
        const inactiveButtons = category.list.filter(
          (button) => !button.isActive
        );
        const hasInactiveButtons = inactiveButtons.length > 0;
        const isExpanded = expandedCategories.has(categoryIndex);

        return (
          <div key={categoryIndex} className="flex flex-col">
            <div
              className={`flex items-center mt-4 max-sm:ml-5 ${
                !category.isActive && "opacity-50"
              }`}
            >
              <button
                onClick={
                  hasInactiveButtons && category.isActive
                    ? () => toggleExpanded(categoryIndex)
                    : undefined
                }
                className={`mr-2 flex items-center justify-center w-[2.7em] h-[2.7em] text-base font-bold text-(--button-text-color) bg-transparent rounded-full flex-shrink-0 ${
                  hasInactiveButtons && category.isActive
                    ? "border-solid border-3 border-(--button-border) cursor-pointer"
                    : "opacity-0"
                }`}
                title={
                  isExpanded ? "非表示のボタンを閉じる" : "非表示のボタンを表示"
                }
              >
                {isExpanded && category.isActive ? (
                  <span className={`icon-[mdi--check] w-5 h-5`}></span>
                ) : (
                  <span className={`icon-[mdi--plus] w-5 h-5`}></span>
                )}
              </button>
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="flex items-center justify-center w-[2.7em] h-[2.7em] mr-2 text-base font-bold text-(--button-text-color) bg-(--button-color) rounded-full flex-shrink-0 cursor-pointer border-solid border-3 border-(--button-border)"
                title={category.name}
              >
                <span
                  className={`${
                    categoryIconMap[category.name] || "mdi:folder-outline"
                  } w-5 h-5`}
                ></span>
              </button>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="flex flex-nowrap sm:flex-wrap max-w-[34rem] whitespace-nowrap items-center gap-2">
                  <SortableContext
                    items={category.list
                      .filter((button) => button.isActive)
                      .map((button) => button.id)}
                    strategy={horizontalListSortingStrategy}
                  >
                    {category.list
                      .filter((button) => button.isActive)
                      .map((button) => (
                        <SortableButton
                          key={button.id}
                          button={button}
                          category={category}
                          onToggle={handleToggleButton}
                        />
                      ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
            {isExpanded && hasInactiveButtons && category.isActive && (
              <div className="flex flex-nowrap max-md:flex-nowrap rounded-md max-w-xl w-full gap-2 mt-2 max-md:ml-5">
                <div className="flex justify-center items-center w-[2.7em] h-[2.7em] text-base font-bold text-(--button-text-color) rounded-full flex-shrink-0">
                  <span className="w-6 h-6"></span>
                </div>
                <div className="flex justify-center items-center w-[2.7em] h-[2.7em] text-base font-bold text-(--button-text-color) rounded-full flex-shrink-0">
                  <span className="icon-[mdi--favorite-add-outline] w-6 h-6"></span>
                </div>
                <div className="flex flex-wrap align-center gap-2">
                  {inactiveButtons.map((button) => (
                    <button
                      key={button.id}
                      onClick={() => handleToggleButton(button.id)}
                      className="h-[2.7em] min-w-18 px-3 py-2 rounded-md whitespace-nowrap cursor-pointer bg-(--button-color) text-(--button-text-color) border-3 border-dashed border-(--button-border) hover:border-solid"
                      title={`${button.name}を有効にする`}
                    >
                      {button.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
