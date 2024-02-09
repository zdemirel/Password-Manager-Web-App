import { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import generatePassword from "@/hooks/generatePassword";
import Header from "@/components/Header";

const Generator = () => {
  const [generatedPassword, setGeneratedPassword] = useState(""); 
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(); 
    setGeneratedPassword(newPassword); 
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const divStyle80 = {
    marginTop: '80px',
  };

  const divStyle30 = {
    marginTop: '30px',
  };

  const divStyle = {
    height: 668,
    width: 1150
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('/api/passwordgenerator/generator', {
        website,
        username,
        password: generatedPassword,
      });

      toast.success('Account created.');
    } catch (error) {
      toast.error('Something went wrong');
    } 
  };

  return (
    <>
      <title> Password Manager </title>
      <Header showBackArrow label="Şifre Oluşturucu" />
      <div className=" flex items-center justify-center" style={divStyle}>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex justify-center mb-6">
              <span className="inline-block bg-gray-400 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
              </span>
          </div>
          <h2 className="text-gray-400 text-2xl font-semibold text-center mb-4">Hesabın için Şifre Oluştur</h2>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5" style={divStyle30}>
              <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Website URL
              </label>
              <input
                type="text"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="https://www.xyz.com"
                required
              />
            </div>
            <div className="mb-5" style={divStyle30}>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <button
              onClick={handleGeneratePassword}
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '}"
            >
              Şifre Oluştur
            </button>
            <div className="max-w-sm" style={divStyle80}>
              <label className="block text-sm mb-2 dark:text-white">Oluşturulan Şifre</label>
              <div className="relative">
                <input
                  id="hs-toggle-password"
                  type={showPassword ? 'text' : 'password'}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:focus:ring-gray-600"
                  value={generatedPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  readOnly
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-gray-600"
                  data-hs-toggle-password='{"target": "#hs-toggle-password"}'
                >
                  {!showPassword ? (
                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"/>
                  </svg>
                  ) : (
                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-gray-200 dark:text-neutral-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path className="hs-password-active:hidden" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                      <circle className="hs-password-active:hidden" cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Generator;
