import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import Button from './Button';
import Header from './Header';


const Form: React.FC = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  
  return (
    <div>
      {currentUser ? (
        <div>
            <Header label="Password Manager"></Header>
        </div>
      ) : (
        <div className="pt-40">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
            Benzersiz ve 
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            Güçlü 
            </mark> 
            Şifre 
            <br></br> 
            Oluşturmak İçin
            </h1>
          <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white text-center">Şimdi <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"> Password Manager&apos;a </span> Kaydol </h2>
          <div className="flex flex-row items-center justify-center gap-4 pt-10">
            <Button label="Kayıt Ol" onClick={registerModal.onOpen} secondary />
          </div>
          <div className="flex flex-row items-center justify-center py-2" style={{ marginBottom: '160px' }}>
          <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                </svg>
                Google ile Kaydolun
            </button>

            <div className="border-t sm:border-t-0 sm:border-s border-gray-200 dark:border-gray-700">||</div>

            <button type="button" className="text-white bg-[#111] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
                <svg className="w-6 h-6 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                Apple ile Kaydolun
            </button>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p className="mb-4 text-4xl font-medium leading-none tracking-tight text-gray-900 md:text-4xl lg:text-xl dark:text-white text-center">Zaten bir hesabın var mı? </p>
            <div className="border-t sm:border-t-0 sm:border-s border-gray-200 dark:border-gray-700">||</div>
            <Button label="Giriş Yap" onClick={loginModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
