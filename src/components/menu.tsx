import { JSX } from 'react';
import { Logo } from './shared/logo';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/Router';
import { HomeIcon, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';

export interface IMenuItem {
  title: string;
  onClick: () => void;
  path?: string;
  icon: JSX.Element;
}

export const Menu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems: IMenuItem[] = [
    {
      title: 'Dashboard',
      onClick: () => navigate(routes.home.path),
      path: routes.home.path,
      icon: <HomeIcon />,
    },
    {
      title: 'Log Out',
      onClick: () => logout(),
      icon: <LogOut />,
    },
  ];

  return (
    <div className="w-[17rem] h-[100vh] flex flex-col items-center p-4">
      <div className="bg-muted w-[100%] h-[100%] rounded-lg flex flex-col items-start p-4">
        <Logo />
        <div className="flex flex-col gap-2 mt-4 w-[100%] ">
          {menuItems.map((i) => {
            const isActive = i.path === location.pathname;

            return (
              <Button
                className={`w-[100%] flex justify-start gap-2 p-3 h-[2.5rem] ${isActive ? 'bg-white' : 'bg-transparent'} text-foreground shadow-none hover:bg-primary hover:text-white group`}
                onClick={i.onClick}
              >
                <div className="text-[#2ACDBE] group-hover:text-white">
                  {i.icon}
                </div>
                {i.title}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
