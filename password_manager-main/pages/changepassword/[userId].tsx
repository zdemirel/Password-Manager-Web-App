import { FormEvent, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import toast from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";

const ChangePassword = () => {
  const { data: currentUser } = useCurrentUser();
  const [currentPassword, setCurrentHashedPassword] = useState("");
  const [newHashedPassword, setNewHashedPassword] = useState("");
  const [confirmNewHashedPassword, setConfirmNewHashedPassword] = useState("");

  const divStyle40 = {
    marginTop: '40px',
  };

  const divStyle = {
    height: 668,
    width: 1150
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newHashedPassword !== confirmNewHashedPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const _id = currentUser.id
      
      const checkPasswordResponse = await axios.post('/api/changepassword/check', {
        currentPassword,
      });

      if (checkPasswordResponse.data.success) {
        const changePasswordResponse = await axios.post('/api/changepassword/change', {
          _id,
          newHashedPassword,
        });

        if (changePasswordResponse.data.success) {
          toast.success('Password changed successfully');
          setCurrentHashedPassword('');
          setNewHashedPassword('');
          setConfirmNewHashedPassword('');
          
        } else {
          toast.error('Something went wrong');
        }
      } else {
        toast.error('Wrong password');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <title>Password Manager</title>
      <Header showBackArrow label="Hesap Şifresini Değiştir" />
      <div className=" flex items-center justify-center" style={divStyle}>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex justify-center mb-6">
              <span className="inline-block bg-gray-400 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
              </span>
          </div>
          <h2 className="text-gray-400 text-2xl font-semibold text-center mb-4">Hesap Şifresini Değiştir</h2>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5" style={divStyle40}>
              <label htmlFor="currentHashedPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mevcut Şifre
              </label>
              <input
                type="password"
                id="currentHashedPassword"
                value={currentPassword}
                onChange={(e) => setCurrentHashedPassword(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-5" style={divStyle40}>
              <label htmlFor="newHashedPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Yeni Şifre
              </label>
              <input
                type="password"
                id="newhashedPassword"
                value={newHashedPassword}
                onChange={(e) => setNewHashedPassword(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-5" style={divStyle40}>
              <label htmlFor="confirmNewHashedPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Yeni Şifreyi Tekrar Girin
              </label>
              <input
                type="password"
                id="confirmNewHashedPassword"
                value={confirmNewHashedPassword}
                onChange={(e) => setConfirmNewHashedPassword(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '}"
            >
              Şifreyi Değiştir
            </button>
            
            
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
