import {BiLogOut, BiSolidLock, BiSolidLockOpen} from 'react-icons/bi'
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut(); 
        window.location.href = '/'; 
      };

    const items = [
        {
            label: 'Şifre Oluşturucu',
            href:`/passwordgenerator/${currentUser?.id}`,
            icon: BiSolidLock,
            auth: true
        },
        {
            label: 'Şifreleri Görüntüle ve Düzenle',
            href: `/confirmation/${currentUser?.id}`,
            icon: BiSolidLockOpen,
            auth: true
        }
    ];

    return (
        <div className="col-span-1 h-full pr-4 md:pr-5">
        <div className="flex flex-col items-end">
          <div className="space-y-6 lg:w-[300px]">
            <SidebarLogo />
            {items.map((item) => (
                <SidebarItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    auth={item.auth}
                />    
            ))}
            {currentUser && <SidebarItem onClick={handleSignOut} icon={BiLogOut} label="Çıkış Yap" />}            
          </div>          
        </div>
      </div>
    );
}

export default Sidebar;