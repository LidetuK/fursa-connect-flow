// API Client to replace Supabase calls with NestJS backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fursa-connect-flow-production.up.railway.app/api';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    console.log('🔍 API Client: Making request to:', url);
    console.log('🔍 API Client: Request options:', options);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    console.log('🔍 API Client: Request headers:', headers);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('🔍 API Client: Response status:', response.status);
      console.log('🔍 API Client: Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔍 API Client: Error response body:', errorText);
        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { message: errorText || 'Network error' };
        }
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      const responseText = await response.text();
      console.log('🔍 API Client: Response body:', responseText);
      
      try {
        return JSON.parse(responseText);
      } catch (e) {
        console.error('🔍 API Client: Failed to parse JSON:', e);
        throw new Error('Invalid JSON response');
      }
    } catch (error) {
      console.error('🔍 API Client: Request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ access_token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, firstName?: string, lastName?: string) {
    const requestBody = { email, password, firstName, lastName };
    console.log('🔍 API Client register request body:', requestBody);
    
    return this.request<{ access_token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }

  async getProfile() {
    return this.request<any>('/auth/profile');
  }

  // WhatsApp endpoints
  async testWhatsApp() {
    console.log('🔍 API Client: Making test request');
    const response = await this.request<{ success: boolean; message: string }>('/whatsapp/test');
    console.log('🔍 API Client: test response:', response);
    return response;
  }

  async connectWhatsApp() {
    console.log('🔍 API Client: Making connectWhatsApp request');
    const response = await this.request<{ success: boolean; data: any; error?: string }>('/whatsapp/connect', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    console.log('🔍 API Client: connectWhatsApp response:', response);
    return response;
  }

  async sendWhatsAppMessage(sessionId: string, to: string, message: string) {
    console.log('🔍 API Client: sendWhatsAppMessage called with:', { sessionId, to, message });
    const requestBody = { sessionId, to, message };
    console.log('🔍 API Client: Request body:', requestBody);
    
    return this.request<{ success: boolean; data: any; error?: string }>('/whatsapp/send-message', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }

  async getWhatsAppStatus(sessionId: string) {
    return this.request<{ success: boolean; data: any; error?: string }>(`/whatsapp/status/${sessionId}`);
  }

  async disconnectWhatsApp(sessionId: string) {
    return this.request<{ success: boolean; data: any; error?: string }>('/whatsapp/disconnect', {
      method: 'DELETE',
      body: JSON.stringify({ sessionId }),
    });
  }

  async getWhatsAppSessions() {
    return this.request<{ success: boolean; data: any; error?: string }>('/whatsapp/sessions');
  }

  // Conversations endpoints
  async getConversations() {
    return this.request<any[]>('/conversations');
  }

  async getConversation(id: string) {
    return this.request<any>(`/conversations/${id}`);
  }

  async getMessages(conversationId: string) {
    return this.request<any[]>(`/conversations/${conversationId}/messages`);
  }

  // Integrations endpoints
  async getIntegrations() {
    return this.request<any[]>('/integrations');
  }

  async createIntegration(data: any) {
    return this.request<any>('/integrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateIntegration(id: string, data: any) {
    return this.request<any>(`/integrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteIntegration(id: string) {
    return this.request<void>(`/integrations/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
