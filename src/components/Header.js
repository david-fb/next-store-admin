/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
//import { useAuth } from '@hooks/useAuth';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Productos', href: '/dashboard/products', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  //const auth = useAuth();
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: session?.user?.email,
      email: session?.user?.email,
      imageUrl: `https://ui-avatars.com/api/?name=${session?.user?.email}`,
    });
  }, [session]);

  return (
    <>
      <Disclosure as="nav" className="bg-cyan-600">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a href={'/'}>
                      <img
                        className="h-8 w-8 invert"
                        src="https://firebasestorage.googleapis.com/v0/b/test-bc4fd.appspot.com/o/controller.png?alt=media&token=bb29f5b1-58b0-446e-9e6a-3d9249a1d34b"
                        alt="Control"
                      />
                    </a>
                  </div>
                  <div className="hidden md:block">
                    {session?.user && (
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.href === router.pathname ? 'bg-cyan-900 text-white' : 'text-cyan-50 hover:bg-cyan-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.href === router.pathname ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden md:block z-10">
                  <div className="ml-4 flex items-center md:ml-6">
                    {session?.user ? (
                      <>
                        {/* <button
                          type="button"
                          className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button> */}

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img className="h-8 w-8 rounded-full" src={userData.imageUrl} alt="" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a href={item.href} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                              <Menu.Item key={`item.logout`}>
                                {({ active }) => (
                                  <button onClick={signOut} className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}>
                                    Sing out
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    ) : (
                      <a
                        href={'/login'}
                        className={classNames('/login' === router.pathname ? 'bg-cyan-900 text-white' : 'text-cyan-50 hover:bg-cyan-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}
                        aria-current={'/login' === router.pathname ? 'page' : undefined}
                      >
                        Log in
                      </a>
                    )}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-cyan-800 inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              {session && (
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href === router.pathname ? 'bg-cyan-900 text-white' : 'text-cyan-50 hover:bg-cyan-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.href === router.pathname ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              )}
              <div className="pt-4 pb-3 border-t border-cyan-700">
                {session?.user ? (
                  <>
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={userData.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{userData.name}</div>
                        <div className="text-sm font-medium leading-none text-cyan-50">{userData.email}</div>
                      </div>
                      {/* <button
                        type="button"
                        className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      {userNavigation.map((item) => (
                        <Disclosure.Button key={item.name} as="a" href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-cyan-50 hover:text-white hover:bg-cyan-700">
                          {item.name}
                        </Disclosure.Button>
                      ))}
                      <button onClick={signOut} className={'block px-3 py-2 rounded-md text-base font-medium text-cyan-50 hover:text-white hover:bg-cyan-700 w-full text-left'}>
                        Sing out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="px-2">
                    <a
                      href={'/login'}
                      className={classNames(
                        '/login' === router.pathname ? 'bg-cyan-900 text-white' : 'text-cyan-300 hover:bg-cyan-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={'/login' === router.pathname ? 'page' : undefined}
                    >
                      Log in
                    </a>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
