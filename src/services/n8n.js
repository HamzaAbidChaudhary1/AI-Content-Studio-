import axios from 'axios';
import { N8N_WEBHOOKS } from '../config/constants';

const api = axios.create({
  baseURL: N8N_WEBHOOKS.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const generateContent = async (data) => {
  try {
    const response = await api.post(N8N_WEBHOOKS.ENDPOINTS.GENERATE, {
      industry: data.industry,
      prompt: data.prompt,
      userId: data.userId || 'anonymous'
    });
    return response.data;
  } catch (error) {
    console.error('Error calling n8n generate webhook:', error);
    throw error;
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
    const response = await api.post(N8N_WEBHOOKS.ENDPOINTS.TEST, {
      industry: 'technology',
      prompt: 'test connection'
    });
    return response.data;
  } catch (error) {
    console.error('Error testing n8n connection:', error);
    throw error;
  }
};
