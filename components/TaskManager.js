"use client";
import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

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
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText("");
    }
  };

  const handleCompleteTask = (indexNum) => {
    const updatedTasks = [...tasks];
    updatedTasks[indexNum].completed = true;

    const completedTask = updatedTasks[indexNum];
    setTasks(updatedTasks.filter((i) => i !== indexNum));
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const RemoveCompleteTask = (indexNum) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[indexNum].completed = false;
    const taskToBeMoved = updatedCompletedTasks[indexNum];
    setTasks([...tasks, taskToBeMoved]);
    setCompletedTasks(updatedCompletedTasks.filter((i) => i !== indexNum));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="rounded-xl  bg-[#1e293b99] shadow-1 border-general border border-gray-300 dark:border-gray-600 p-8 mb-8">
        <DarkModeToggle />
      </div>
      <div className="rounded-xl bg-white dark:bg-[#1e293b99] shadow-sm border border-gray-300 dark:border-gray-600 p-8 mb-8">
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
        <div className="rounded-xl bg-white  dark:bg-[#1e293b99] shadow-1 border-general border border-gray-300 dark:border-gray-600 p-8">
          <h2 className="text-xl text-black dark:text-white font-bold mb-2">
            Tasks
          </h2>
          {tasks.length > 0 ? (
            <ul className="text-lg list-none text-[#94a3b8]">
              {tasks.map((task, index) => (
                <li key={index}>
                  <div class="flex items-center">
                    <input
                      onChange={() => handleCompleteTask(index)}
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-2"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {" "}
                      {task.text}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#94a3b8]">You have No tasks</p>
          )}
        </div>

        <div className="rounded-xl  bg-[#1e293b99] shadow-1 border-general border border-gray-300 p-8">
          <h2 className="text-xl text-white font-bold mb-2">Completed Tasks</h2>
          {completedTasks.length > 0 ? (
            <ul className="text-lg list-none text-[#94a3b8]">
              {completedTasks.map((task, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    className="mr-2"
                    onChange={() => RemoveCompleteTask(index)}
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
