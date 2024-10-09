// adminHandler.ts

export const fetchTasks = async (setTasks: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const response = await fetch('http://localhost:8000/api/tasks');
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error('Failed to fetch tasks');
    }
  } catch (error) {
    console.error('An error occurred while fetching tasks', error);
  }
};

export const fetchUsers = async (setUsers: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const response = await fetch('http://localhost:8000/api/regusers');
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      console.error('Failed to fetch users');
    }
  } catch (error) {
    console.error('An error occurred while fetching users', error);
  }
};

export const sendMessage = async (message: string, setMessage: React.Dispatch<React.SetStateAction<string>>, fetchMessages: () => void) => {
  if (!message) {
    throw new Error('Message cannot be empty');
  }

  try {
    const response = await fetch('http://localhost:8000/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      setMessage('');
      fetchMessages(); // Call to fetch messages after sending
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('An error occurred while sending the message', error);
  }
};

export const deleteUser = async (userId: number, fetchUsers: () => void) => {
  try {
    const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchUsers(); // Refresh the user list
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error('An error occurred while deleting the user', error);
  }
};
