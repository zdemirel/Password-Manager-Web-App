import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({showBackArrow, label }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  
  const [isOpen, setIsOpen] = useState(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleSignOut = async () => {
    await signOut(); 
    window.location.href = '/'; 
  };
  
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack 
            onClick={handleBack} 
            color="white" 
            size={20} 
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "/>
        )}
        <h1 className="text-white text-xl font-semibold">
          {label}
        </h1>  
      </div>
    
      <div className="relative">
          <div className="flex flex-row items-center justify-end">
            <div 
            onClick={toggleOpen}
            className="
              p-4
              md:py-2
              border-[1px] 
              border-neutral-500 
              flex 
              items-center 
              gap-2
              rounded-full 
              cursor-pointer 
              hover:shadow-md 
              hover:bg-gray-700
              transition
              text-white
              absolute top-[-6]
              "
            > 
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/></svg>
              {currentUser?.user}
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <div className="hidden md:block">
                
              </div>
            </div>
          </div>
          {isOpen && (
            <div 
              className="
                absolute top-7
                rounded-xl 
                shadow-md
                w-[40vw]
                md:w-1/5
                bg-white 
                overflow-hidden 
                right-0 
                text-sm
              "
            >
              <div className="flex flex-col cursor-pointer">
                
                  <>
                    <MenuItem 
                      label="Hesap Şifresi Değiştir" 
                      onClick={() => router.push(`/changepassword/${currentUser?.id}`)}
                    />
                    <MenuItem 
                      label="Hesabı Sil" 
                      onClick={() => router.push(`/deleteuser/${currentUser?.id}`)}
                    />
                    
                    <hr />
                    <MenuItem 
                      label="Çıkış Yap" 
                      onClick={handleSignOut}
                    />
                  </>
                
              </div>
            </div>
            )}
          </div>
    </div>
    
  );
}

export default Header;
