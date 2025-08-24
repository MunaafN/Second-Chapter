import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/route';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard on home page access
    navigate(ROUTES.DASHBOARD, { replace: true });
  }, [navigate]);

  return null;
}
