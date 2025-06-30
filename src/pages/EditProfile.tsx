import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import type { NavigationItem } from '../components/Navbar';
import { CameraIcon, UserIcon, PhoneIcon } from '@heroicons/react/24/outline';
import userService, { type UserProfile } from '../services/userService';
import { MdEmail } from 'react-icons/md';

const EditProfile: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    name: '',
    email: '',
    phone: '',
    urlImage: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Gerenciar', href: '/manager', current: false },
    { name: 'Editar Perfil', href: '/profile/edit', current: true },
  ];

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const profileData = await userService.getUserProfile();
      setProfile(profileData);
    } catch (error) {
      addToast('Erro ao carregar dados do perfil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    let formattedValue = value;
    
    if (field === 'phone') {
      formattedValue = userService.formatPhoneNumber(value);
    }
    
    setProfile(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = userService.validateImageFile(file);
    if (!validation.valid) {
      addToast(validation.error!, 'error');
      return;
    }

    try {
      const result = await userService.uploadProfileImage(file);

      console.log('Imagem result:', result);

      setProfile(prev => ({
        ...prev,
        urlImage: result.imageUrl
      }));

      addToast('Imagem de perfil atualizada com sucesso!', 'success');

      console.log('Imagem de perfil atualizada:', profile);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      addToast('Erro ao fazer upload da imagem', 'error');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!profile.name.trim()) {
      addToast('O nome é obrigatório', 'error');
      return;
    }

    if (profile.phone) {
      const phoneValidation = userService.validatePhoneNumber(profile.phone);
      if (!phoneValidation.valid) {
        addToast(phoneValidation.error!, 'error');
        return;
      }
    }

    setSaving(true);
    try {
      await userService.updateUserProfile({
        name: profile.name.trim(),
        email: profile.email.trim(),
        urlImage: profile.urlImage || undefined,
        phone: profile.phone?.trim() || undefined
      });

      addToast('Perfil atualizado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      addToast('Erro ao atualizar perfil', 'error');
    } finally {
      setSaving(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-neutral-850 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-850 pt-20">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-850 shadow-xl rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-900 px-6 py-8">
              <h1 className="text-3xl font-bold text-white">Editar Perfil</h1>
              <p className="text-indigo-100 mt-2">Atualize suas informações pessoais</p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
              {/* Foto de Perfil */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    {profile.urlImage ? (
                      <img
                        src={profile.urlImage}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-800 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
                  >
                    <CameraIcon className="w-5 h-5" />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-400 text-center">
                  Clique no ícone da câmera para alterar sua foto de perfil<br />
                  Formatos aceitos: JPG, PNG, GIF (máximo 5MB)
                </p>
              </div>

              {/* Campos do formulário */}
              <div className="grid grid-cols-1 gap-6">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-700">
                    Nome completo *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-black" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="block text-black w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-700 focus:border-green-600"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>
                </div>

                {/* Email (readonly) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-green-700">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdEmail className="h-5 w-5 text-black" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={profile.email}
                      className="block text-black w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-700 focus:border-green-600"
                      readOnly
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    O email não pode ser alterado
                  </p>
                </div>

                {/* Telefone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-green-700">
                    Número do celular
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-black" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      value={profile.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="block text-black w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-700 focus:border-green-500"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Formato: (11) 99999-9999
                  </p>
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    'Salvar Alterações'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
