import axios from 'axios';
import { N8N_WEBHOOKS } from '../config/constants';

const api = axios.create({
  baseURL: N8N_WEBHOOKS.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // Increase timeout for AI operations
});

export const generateContent = async (data) => {
  try {
    const endpoint = data.mode === 'refine' 
      ? N8N_WEBHOOKS.ENDPOINTS.REFINE 
      : N8N_WEBHOOKS.ENDPOINTS.GENERATE;
      
    const response = await api.post(endpoint, data);
    
    // Handle different response structures
    if (response.data.error) {
      throw new Error(response.data.message || 'Generation failed');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error calling n8n webhook:', error);
    
    // Provide more detailed error information
    if (error.response) {
      throw new Error(error.response.data?.message || error.response.statusText);
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw error;
    }
  }
};

export const approveContent = async (data) => {
  try {
    const response = await api.post(N8N_WEBHOOKS.ENDPOINTS.APPROVAL, data);
    return response.data;
  } catch (error) {
    console.error('Error calling n8n approval webhook:', error);
    throw error;
  }
};

export const testConnection = async () => {
  try {
    const response = await api.get(N8N_WEBHOOKS.ENDPOINTS.TEST);
    return response.data;
  } catch (error) {
    console.error('Error testing n8n connection:', error);
    throw error;
  }
};
