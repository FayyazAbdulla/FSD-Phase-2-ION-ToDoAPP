// utils/logout.js
export const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust token key if necessary
        },
      });
  
      localStorage.removeItem('token'); // Remove JWT from local storage
      // You can also return a value or throw an error if needed
      return true; // Indicate successful logout
    } catch (error) {
      console.error('Logout failed:', error);
      return false; // Indicate failure
    }
  };
  