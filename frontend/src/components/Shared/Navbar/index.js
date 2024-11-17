import { Disclosure, Menu } from '@headlessui/react'
import { BellIcon, MenuIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline'
import { cidUrl } from "@utils/cidWrapper"
import { contractAbi, contractAddress } from "@utils/contractDetails"
import { useEffect, useState } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useWeb3Contract } from "react-moralis"
import NavItems from './NavItems'
import ProfileDropdown from './ProfileDropdown'

import { useMoralis } from "react-moralis"

const Navbar = () => {
  const [cid, setCid] = useState('')
  const [profile, setProfile] = useState()
  const [isLoading, setLoading] = useState(true)
  const [profileImg, setProfileImg] = useState(null)
  const { Moralis, authenticate, isAuthenticated } = useMoralis();
  const { runContractFunction } = useWeb3Contract()

  const login = async () => {
      await authenticate({signingMessage: "Log in to JOINF" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  async function getUserProfile(address) {
      const getUserProfileOptions = {
          abi: contractAbi,
          contractAddress: contractAddress,
          functionName: "getUserProfile",
          params: { _user: address }
      }

      const data = await runContractFunction({
          params: getUserProfileOptions,
          onSuccess: (data) => {
              console.log("Success")
              setCid(data.personalDetailCid)
              console.log(data)
              console.log(cid)
          },
          onError: (error) => {
              console.log(error)
          },
      })

      return data
  }

  useEffect(() => {
      setLoading(true)
      if (!cid) {
          getUserProfile(Moralis.account)
      } else {
          console.log(cidUrl(cid))
          if (!profile) {
              fetch(cidUrl(cid))
              .then((res) => res.json())
              .then((data) => {
                  setProfile(data)
              })
          } else {
            setProfileImg(cidUrl(profile.profileImage))
            setLoading(false)
            console.log("loading set to false!")
          }
      }
  }, [cid, profile, profileImg, isLoading])

  console.log("PROFILE IMAGE", profileImg)
  
  return (
    <Disclosure as="nav" className="shadow bg-green-500 text-white sticky top-0 z-30">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12">
            <div className="relative flex h-16 items-center">
              <div className="flex-1 flex justify-start mr-auto">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-stone-800
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="hidden sm:block ">
                    <div className="flex space-x-4">
                      <NavItems/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xl mx-auto font-chillax font-title hidden sm:block">
                JOINF
              </div>
              <div className="flex-1 flex justify-end items-center ml-auto">
                <button
                  className="rounded-full px-1"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
                <div className="border-l-2 ml-3 p-2 h-6 border-silverSnippet"/>
                <Menu as="div" className="relative pr-2 sm:pr-0">
                  <div>
                    {(isAuthenticated && Moralis.account)
                      ? (
                        <Menu.Button className="bg-doctor flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                          {(profileImg) && (<img src={profileImg} className="h-8 w-8 rounded-full"/>)}
                          {(isLoading) &&  (<Jazzicon diameter={32} seed={jsNumberForAddress(Moralis.account)}/>)}
                        </Menu.Button>
                      )
                      : <UserCircleIcon className="h-8 w-8 text-white hover:cursor-pointer" onClick={login}/>
                    }
                  </div>
                  <ProfileDropdown/>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavItems mobile={true}/>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar