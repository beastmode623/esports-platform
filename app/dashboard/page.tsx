import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardView from '@/components/DashboardView';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('next-auth.session-token') || cookieStore.get('__Secure-next-auth.session-token');
  
  // Если нет сессии - показываем тестовые данные
  if (!sessionCookie) {
    const mockSession = {
      user: {
        name: 'Тестовый Игрок',
        image: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cd6_full.jpg',
        id: '76561198012345678',
      },
    };
    return <DashboardView session={mockSession} />;
  }

  // Если есть сессия - декодируем её
  try {
    const sessionData = JSON.parse(decodeURIComponent(sessionCookie.value));
    return <DashboardView session={sessionData} />;
  } catch (error) {
    const mockSession = {
      user: {
        name: 'Тестовый Игрок',
        image: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cd6_full.jpg',
        id: '76561198012345678',
      },
    };
    return <DashboardView session={mockSession} />;
  }
}