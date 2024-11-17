import { PencilAltIcon } from '@heroicons/react/outline'
import { shortenAddress } from '@utils/shortenAddress'
import Link from 'next/link'
const UserProfile = ({ uProfPic, uDisName, uWalletAdd }) => {
  return (
    <div className="rounded-lg bg-gradient-to-b from-green-50 to-white shadow">
            <Link href="/editprofile">
              <div className="flex justify-end hover:cursor-pointer">
                <PencilAltIcon className=" h-5 w-5 mx-4 mt-3 text-stone-600"></PencilAltIcon>
              </div>
            </Link>
            <div className="flex flex-col space-y-5 px-6 pb-6 pt-0">
              <div className="flex items-center justify-center space-x-3">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-center">
                    <img className="object-cover h-14 w-14 rounded-full" src={uProfPic} alt="" />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                      <p className="font-clashg text-base font-medium text-center text-stone-900">{uDisName}</p>
                      <p className="font-archivo text-xs font-normal leading-loose text-center text-stone-500">{shortenAddress(uWalletAdd)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default UserProfile