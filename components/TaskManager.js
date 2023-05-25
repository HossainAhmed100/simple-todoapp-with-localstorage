"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskManager = () => {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    const storedCompletedTasks = localStorage.getItem("completedTasks");
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        text: taskText,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  const handleCompleteTask = (taskId) => {
    const taskToBeMoved = tasks.find((task) => task.id === taskId);
    if (!taskToBeMoved) return;

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    const updatedCompletedTasks = [
      ...completedTasks,
      { ...taskToBeMoved, completed: true },
    ];
    setCompletedTasks(updatedCompletedTasks);
  };

  const handleRestoreTask = (taskId) => {
    const taskToBeMoved = completedTasks.find((task) => task.id === taskId);
    if (!taskToBeMoved) return;

    const updatedCompletedTasks = completedTasks.filter(
      (task) => task.id !== taskId
    );
    setCompletedTasks(updatedCompletedTasks);

    const updatedTasks = [...tasks, { ...taskToBeMoved, completed: false }];
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div className="rounded-xl bg-white dark:bg-[#1e293b99] border border-gray-200 dark:border-gray-600 p-8 mb-8">
        <div className="flex justify-center">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-800 text-md rounded-lg  focus:border-blue-500 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white px-6 py-4 mr-2 flex-1"
            placeholder="Enter a task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded px-8 py-2"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="rounded-xl bg-white  dark:bg-[#1e293b99] border-general border border-gray-200 dark:border-gray-600 p-8">
          <h2 className="text-xl text-black dark:text-white font-bold mb-2">
            Tasks
          </h2>
          {tasks.length > 0 ? (
            <ul className="text-lg list-none text-[#94a3b8]">
              {tasks.map((task) => (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={task.completed}
                    onChange={() => handleCompleteTask(task.id)}
                  />
                  {task.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#94a3b8]">You have No tasks</p>
          )}
        </div>

        <div className="rounded-xl bg-white  dark:bg-[#1e293b99] border-general border border-gray-200 dark:border-gray-600 p-8">
          <h2 className="text-xl text-black dark:text-white font-bold mb-2">
            Completed Tasks
          </h2>
          {completedTasks.length > 0 ? (
            <ul className="text-lg list-none text-[#94a3b8]">
              {completedTasks.map((task) => (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="mr-2"
                    onChange={() => handleRestoreTask(task.id)}
                  />
                  {task.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#94a3b8]">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
