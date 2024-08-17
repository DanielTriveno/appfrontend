import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { cn } from '../lib/utils';
import { ChevronRight } from 'lucide-react';
import { getUser } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const userId = 1; // Cambia esto por el ID real del usuario o por un valor dinámico

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener el usuario', error);
      }
    };

    fetchUser();
  }, [userId]);

  const cards = [
    { label: 'Name', value: user?.name || 'N/A', route: '/update-name' },
    { label: 'Username', value: user?.userName || 'N/A', route: '/update-username' },
    { label: 'Email', value: user?.email || 'N/A', route: '/update-email' },
    { label: 'Phone Number', value: user?.phone || 'N/A', route: '/update-phone' },
    { label: 'Change Password', value: '********', route: '/change-password' },
    { label: 'Delete My Account', value: '', route: '/delete-account' },
  ];

  return (
    <div className="space-y-2 p-4 w-full max-w-md mx-auto bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Profile Settings</h1>
      {cards.map((card, index) => (
        <Card
          key={index}
          className={cn(
            'rounded-xl overflow-hidden group hover:shadow-2xl bg-background p-4 h-24',
            index === cards.length - 1 ? 'mb-8' : 'mb-2' // Separación específica para el último card
          )}
        >
          <div className="flex justify-between items-center h-full">
            <div className="flex flex-col">
              <span className="text-left font-bold">{card.label}</span>
              <span className="text-left text-sm">{card.value}</span>
            </div>
            <button
              onClick={() => navigate(card.route)}
              className="text-right transition duration-300 ease-in-out"
            >
              <ChevronRight className="h-6 w-6 transition-transform transform group-hover:translate-x-1" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
