export const fetchTodos = async (API_URL: string) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        console.error("Failed to fetch todos:", response.statusText);
        return [];
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };
  
  export const addOrUpdateTodo = async (
    API_URL: string,
    isEditing: boolean,
    todo: { title: string; description: string },
    currentTodoId: number | null
  ) => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${currentTodoId}` : API_URL;
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
  
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error("Error adding/updating todo:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error during add/update operation:", error);
      return null;
    }
  };
  
  export const deleteTodo = async (API_URL: string, id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        return true;
      } else {
        console.error("Failed to delete todo:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      return false;
    }
  };
  