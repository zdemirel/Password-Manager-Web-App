import { useRouter } from "next/router";
import { PiPasswordBold } from "react-icons/pi";

const SidebarLogo = () => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push('/')}
      className="
      rounded-full 
      h-14
      w-140
      p-4 
      flex 
      items-center
      hover:bg-blue-300 
      hover:bg-opacity-10
      cursor-pointer
    "
    style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', marginTop: '7px' }}
    
    >
      <PiPasswordBold size={32} color="white" />
      <span style={{ marginLeft: '20px', color: 'white' }}>Password Manager</span>
    </div>
  );
};

export default SidebarLogo;
