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
  name: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres" })
    .nonempty({ message: "El nombre es obligatorio" })
});

type FormData = z.infer<typeof schema>;

const FIXED_USER_ID = 1;

const UpdateNamePage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/users/${FIXED_USER_ID}`);
        setValue('name', response.data.name);
      } catch (err) {
        setError('Error al obtener el usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await api.patch(`/api/users/${FIXED_USER_ID}`, { name: data.name, id: FIXED_USER_ID });
      // Navegar a otra página si es necesario
      // navigate('/home');
    } catch (err) {
      setError('Error al actualizar el nombre');
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
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Name</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
              <div className="mb-6 flex-grow">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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

export default UpdateNamePage;
