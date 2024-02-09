import Form from "@/components/Form"
import useCurrentUser from "@/hooks/useCurrentUser"

export default function Home() {

  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <title> Password Manager </title>
      <Form/>

      {currentUser && (
      <div>
        <div className="grid grid-cols-6 gap-4 pt-10">
        <div className="col-start-2 col-span-4 ...">
          <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            <div className="pt-8 md:p-7">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-800">
                Password Manager Nedir?
              </h3>
              <p className="mt-2 text-lg text-gray-300 pt-5">
                Password Manager, hesaplarınız için güçlü şifreler oluşturup bunları sizin için veritabanında güvenli bir şekilde saklar. Böylece karmaşık şifreleri ezberlemenize veya farklı hesaplarınızda aynı şifreyi kullanmanıza gerek kalmadan farklı hesaplarınız için benzersiz ve güçlü şifreler kullanabilirsiniz. 
                <br></br>
                <br></br>
              </p>
            </div>
          </div>
        </div>
        </div>


      <div className="grid grid-cols-6 gap-4 pt-20">
      <div className="col-start-2 col-span-5 ...">
        <ul className="relative flex flex-col md:flex-row gap-2">

          <li className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
            <div className="min-w-[28px] min-h-[28px] flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
              <span className="w-7 h-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white">
                1
              </span>
              <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden dark:bg-gray-700"></div>
            </div>
            <div className="grow md:grow-0 md:mt-3 pb-5">
              <span className="block text-sm font-medium text-gray-800 dark:text-white">
                Şifre Oluşturucu
              </span>
              <p className="text-sm text-gray-500">
                Website URL&apos;ini ve websitesine ait olan kullanıcı adını gir, Password Manager mevcut hesabın için şifre oluşturup veritabanına kaydetsin.
              </p>
            </div>
          </li>

          <li className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
            <div className="min-w-[28px] min-h-[28px] flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
              <span className="w-7 h-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white">
                2
              </span>
              <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden dark:bg-gray-700"></div>
            </div>
            <div className="grow md:grow-0 md:mt-3 pb-5">
              <span className="block text-sm font-medium text-gray-800 dark:text-white">
                Şifreleri Görüntüle
              </span>
              <p className="text-sm text-gray-500">
                Oluşturulan şifreleri istediğin zaman görüntüleyebilirsin. Veriler içinde filtreleme yaparak aradığını daha kolay bulabilirsin.
              </p>
            </div>
          </li>

          <li className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
            <div className="min-w-[28px] min-h-[28px] flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
              <span className="w-7 h-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white">
                3
              </span>
              <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden dark:bg-gray-700"></div>
            </div>
            <div className="grow md:grow-0 md:mt-3 pb-5">
              <span className="block text-sm font-medium text-gray-800 dark:text-white">
                ve Düzenle
              </span>
              <p className="text-sm text-gray-500">
                Oluşturulan şifreleri değiştirme ve  
                <br></br>
                silme işlemlerini gerçekleştirerek verileri
                <br></br>
                istediğin gibi düzenleyebilirsin.
              </p>
            </div>
          </li>

        </ul>
      </div>
      </div>
      </div>
      )}
    </>
  )
} 
