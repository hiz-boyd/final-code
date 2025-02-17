const apiRequest = async (endpoint, data) => {
    try {
      console.log('Making API request to:', endpoint);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log('API response status:', response.status);
  
      if (!response.ok) {
        // Handle non-JSON responses (e.g., HTML error pages)
        const text = await response.text();
        console.error('API request failed with response:', text);
        throw new Error('API request failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error in apiRequest:', error);
      throw error;
    }
  };
  
  export const register = async (userData) => {
    return apiRequest('/api/register/', userData); // Use '/api/register' as the endpoint
  };
  export const login = async (credentials) => {
    return apiRequest('/api/login/', credentials); // Ensure trailing slash
  };

