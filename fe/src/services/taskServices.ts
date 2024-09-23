import { Task } from "src/interfaces";

const getTasks = async () => {
    try {
        const response = await fetch("http://localhost:3002/v1/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
}

const addTask = async (task: Task) => {
    try {
        const response = await fetch("http://localhost:3002/v1/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        return data        
      } catch (error) {
        console.error("Error adding task:", error);
      }
}

const updateTask = async (data: Task) => {
    try {
        const response = await fetch(
          `http://localhost:3002/v1/tasks/${data._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
       
      } catch (err) {
        console.error(err);
      }
}

const deleteTask = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3002/v1/tasks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error delete task:", error);
      }
}

const completeTask = async (data: Task) => {
    try {
        const response = await fetch(
          `http://localhost:3002/v1/tasks/complete/${data._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              complete: true,
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
      } catch (err) {
        console.error(err);
      }
}

const addTaskChild = async (parentId: string, childTask: Task) => {
    try {
        const childTaskWithParentId = {
          ...childTask,
          parentId,
        };
        const response = await fetch("http://localhost:3002/v1/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(childTaskWithParentId),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        // Parse and log the response JSON
        const data = await response.json();
        console.log("Task added successfully:", data);
        
      } catch (error) {
        console.error("Error adding task:", error);
      }
}
export { addTask, addTaskChild, completeTask, deleteTask, getTasks, updateTask };

