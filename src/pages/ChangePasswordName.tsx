import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../services/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronLeft } from 'lucide-react';

// Define el esquema de validación usando Zod
const schema = z.object({
  currentPassword: z.string()
    .min(6, { message: "La contraseña actual debe tener al menos 6 caracteres" })
    .nonempty({ message: "La contraseña actual es obligatoria" }),
  newPassword: z.string()
    .min(8, { message: "La nueva contraseña debe tener al menos 8 caracteres" })
    .regex(/[A-Z]/, { message: "La nueva contraseña debe contener al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "La nueva contraseña debe contener al menos una letra minúscula" })
    .regex(/[0-9]/, { message: "La nueva contraseña debe contener al menos un número" })
    .regex(/[@$!%*?&]/, { message: "La nueva contraseña debe contener al menos un carácter especial" })
    .nonempty({ message: "La nueva contraseña es obligatoria" }),
  confirmPassword: z.string()
    .min(8, { message: "La confirmación de la contraseña debe tener al menos 8 caracteres" })
    .nonempty({ message: "La confirmación de la contraseña es obligatoria" })
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "La nueva contraseña y la confirmación deben coincidir",
  path: ['confirmPassword']
});

type FormData = z.infer<typeof schema>;

const FIXED_USER_ID = 1;

const ChangePasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Simulación de carga de datos si es necesario
    setLoading(false);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await api.patch(`/api/users/${FIXED_USER_ID}/change-password`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      setSuccessMessage('Contraseña actualizada correctamente.');
      setError(null);
    } catch (err) {
      setError('Error al actualizar la contraseña');
      setSuccessMessage(null);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto flex flex-col flex-grow">
        <Card className="flex flex-col flex-grow bg-white shadow-lg rounded-lg p-6">
          <div className="relative flex flex-col flex-grow">
            <button
             className="absolute top-0 left-1 p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              onClick={() => window.history.back()}
              aria-label="Regresar"
            >
              <ChevronLeft className="h-6 w-6 text-gray-500" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">Cambiar Contraseña</h2>
            {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña Actual
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  {...register('currentPassword')}
                  className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...register('newPassword')}
                  className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
              <div className="mt-auto">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-colors duration-300"
                >
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
