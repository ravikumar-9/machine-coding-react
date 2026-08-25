import React from "react";

interface Task {
  id: number;
  title: string;
}

interface column {
  id: number;
  title: string;
  tasks: Task[];
}

interface drageedItem {
  columnId: number;
  task: Task;
}

const Kanban = () => {
  const [columns, setColumns] = React.useState<column[]>([
    {
      id: 1,
      title: "To Do",
      tasks: [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      tasks: [
        { id: 3, title: "Task 3" },
        { id: 4, title: "Task 4" },
      ],
    },
    {
      id: 3,
      title: "Done",
      tasks: [
        { id: 5, title: "Task 5" },
        { id: 6, title: "Task 6" },
      ],
    },
  ]);
  const [dragItem, setDragItem] = React.useState<drageedItem | null>(null);

  const handleDragStart = (columnId: number, task: Task) => {
    console.log("Dragging column:", columnId, task);
    setDragItem({ columnId, task });
  };

  const handleDrop = (columnId: number) => {
    console.log("Dropped on column:", columnId);
    const updatedColumns = [...columns];
    const draggedColum = updatedColumns.find(
      (col) => col.id === dragItem?.columnId
    );
    if (draggedColum) {
      draggedColum.tasks = draggedColum.tasks.filter(
        (task) => task.id !== dragItem?.task.id
      );
    }
    const targetColumn = updatedColumns.find((col) => col.id === columnId);
    if (targetColumn && dragItem) {
      targetColumn.tasks.push(dragItem.task);
    }
    setColumns(updatedColumns);
  };
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
        Kanban Board
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map((column) => (
          <div
            key={column.id}
            className="rounded-xl bg-white shadow-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            {/* Column Header */}

            <div className="flex items-center justify-between rounded-t-xl border-b bg-slate-50 px-5 py-4">
              <h2 className="font-semibold text-slate-700">{column.title}</h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                {column.tasks.length}
              </span>
            </div>

            {/* Tasks */}

            <div className="min-h-112.5 space-y-3 p-4">
              {column.tasks.length > 0 ? (
                column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(column.id, task)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(column.id)}
                    className="cursor-grab rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md active:cursor-grabbing"
                  >
                    <p className="font-medium text-slate-700">{task.title}</p>
                  </div>
                ))
              ) : (
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-slate-400">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
