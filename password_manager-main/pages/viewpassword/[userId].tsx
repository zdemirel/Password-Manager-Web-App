import Header from "@/components/Header";
import axios from 'axios';
import { useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";

interface Account {
  id: string;
  website: string;
  username: string;
  hashedPassword: string;
  showPassword: boolean;
}

const UserView = () => {
  const { data: currentUser } = useCurrentUser();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 8;

  useEffect(() => {
  const fetchData = async () => {
    try {
      if (!currentUser || !currentUser.id) {
        // Eğer currentUser tanımsızsa veya currentUser.id tanımsızsa
        console.error("Current user or user id is undefined.");
        return;
      }
      const userId = currentUser.id;
      const response = await axios.get(`/api/viewpassword/view?userId=${userId}`);
      const fetchedAccounts = response.data.map((account: Account) => ({ ...account }));
      setAccounts(fetchedAccounts);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [currentUser]);


  const divStyle = {
    height: 678,
    width: 1145
  };

  const togglePasswordVisibility = (accountId: string) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === accountId ? { ...account, showPassword: !account.showPassword } : account
      )
    );
  };
  
  const handleCopyPassword = (hashedPassword: string) => {
    navigator.clipboard.writeText(hashedPassword)
      .then(() => {
        toast.success('Password copied');
      })
      .catch(() => {
        toast.error('Unable to copy');
      });
  };
  
  const deleteFunction = async (accountId: string) => {
    try {
      const deleteAccountResponse = await axios.post(`/api/deleteaccount/deleteaccount`, { userId: accountId });
      if (deleteAccountResponse.data.success) {
        setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== accountId));
        toast.success('Account deleted successfully');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // Arama işlevselliği
  const filteredAccounts = accounts.filter(account =>
    account.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sayfalama işlemi için hesaplama yapılması
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

  return (
    <>
      <title>Password Manager</title>
      <Header showBackArrow label="Oluşan Şifreleri Görüntüle" />

        <div className="flex flex-col" style={divStyle}>
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <div className="py-3 px-4">
                  <div className="relative max-w-xs">
                    <label className="sr-only">Search</label>
                    <input
                      type="text"
                      name="hs-table-with-pagination-search"
                      id="hs-table-with-pagination-search"
                      className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Website URL ara"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                      <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        
                        <th scope="col" className="px-14 py-4 text-start text-xs font-medium text-gray-400 uppercase">Website URL</th>
                        <th scope="col" className="px-14 py-4 text-start text-xs font-medium text-gray-400 uppercase">Kullanıcı Adı</th>
                        <th scope="col" className="px-14 py-4 text-start text-xs font-medium text-gray-400 uppercase">Şifre</th>
                        <th scope="col" className="px-5 py-4 text-end text-xs font-medium text-gray-400 uppercase"></th>
                        <th scope="col" className="px-5 py-4 text-end text-xs font-medium text-gray-400 uppercase"></th>
                        <th scope="col" className="px-5 py-4 text-end text-xs font-medium text-gray-400 uppercase"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {currentAccounts.map((account) => (
                        <tr key={account.id}>
                          <td className="px-14 py-3 whitespace-nowrap text-start text-sm font-medium text-gray-800 dark:text-gray-200">{account.website}</td>
                          <td className="px-14 py-3 whitespace-nowrap text-start text-sm text-gray-800 dark:text-gray-200">{account.username}</td>
                          <td className="px-14 py-3 whitespace-nowrap text-start text-sm text-gray-800 dark:text-gray-200">
                            <input
                              id={`hs-toggle-password-${account.id}`}
                              type={account.showPassword ? 'text' : 'password'}
                              className="text-start text-sm text-gray-800 dark:text-gray-200 dark:bg-black"
                              value={account.hashedPassword}
                            /> 
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(account.id)}
                              className="end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-gray-600"
                              data-hs-toggle-password={`{"target": "#hs-toggle-password-${account.id}"}`}
                            >
                              {!account.showPassword ? (
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                  <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                  <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                  <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"/>
                                </svg>
                              ) : (
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-gray-200 dark:text-neutral-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                  <path className="hs-password-active:hidden" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                  <circle className="hs-password-active:hidden" cx="12" cy="12" r="3"/>
                                </svg>
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button 
                              onClick={() => handleCopyPassword(account.hashedPassword)}
                              className="ql-link w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-400 " type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                              </svg>
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none"
                              onClick={() => deleteFunction(account.id)}
                            >Sil</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="py-1 px-4">
                  <nav className="flex items-center space-x-1">
                    {/* Sayfalama butonları */}
                    <button
                      onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                      className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      disabled={currentPage === 1}
                    >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </button>
                    {Array.from({ length: Math.ceil(filteredAccounts.length / accountsPerPage) }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full ${currentPage === index + 1 ? 'bg-gray-800 font-bold' : ''} disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10`}
                        aria-current={currentPage === index + 1 ? "page" : undefined}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredAccounts.length / accountsPerPage)))}
                      className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      disabled={currentPage === Math.ceil(filteredAccounts.length / accountsPerPage)}
                    >
                      <span className="sr-only">Next</span>
                      <span aria-hidden="true">»</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}
 
export default UserView;
