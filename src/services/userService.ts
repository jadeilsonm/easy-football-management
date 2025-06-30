import api from './api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  urlImage?: string;
}

export interface UpdateUserProfileData {
  name: string;
  phone?: string | null;
}

export const userService = {
  async getUserProfile(): Promise<UserProfile> {
    const response = await api.get(`/api/v1/users`);
    return response.data;
  },

  async updateUserProfile(data: Omit<UserProfile, 'id'>): Promise<UserProfile> {
    console.log('Updating user profile with data:', data);
    const response = await api.put(`/api/v1/users`, data);
    return response.data;
  },

  async uploadProfileImage(file: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/v1/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { imageUrl: response.data };
  },

  validateImageFile(file: File): { valid: boolean; error?: string } {
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'Por favor, selecione apenas arquivos de imagem' };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, error: 'A imagem deve ter no máximo 5MB' };
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Formato não suportado. Use JPG, PNG, GIF ou WebP' };
    }

    return { valid: true };
  },

  formatPhoneNumber(phone: string): string {
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length === 11) {
      return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    if (cleanPhone.length === 10) {
      return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone;
  },

  validatePhoneNumber(phone: string): { valid: boolean; error?: string } {
    if (!phone || phone.trim() === '') {
      return { valid: true }; 
    }

    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return { valid: false, error: 'Número de telefone deve ter 10 ou 11 dígitos' };
    }

    if (cleanPhone.length === 11 && cleanPhone[2] !== '9') {
      return { valid: false, error: 'Número de celular deve começar com 9 após o DDD' };
    }

    return { valid: true };
  }
};

export default userService;
