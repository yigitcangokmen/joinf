
const UserProfile = ({ uProfPic, uDisName, uWalletAdd }) => {
  return (
    <div className="rounded-lg bg-gradient-to-b from-green-50 to-white shadow w-96">
            <div className="flex flex-col space-y-5 p-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-center">
                    <img className="object-cover h-14 w-14 rounded-full" src={uProfPic} alt="" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="font-clashg text-base font-medium text-center text-stone-900">{uDisName}</p>
                    <p className="font-archivo text-xs font-normal leading-loose text-center text-stone-500">{uWalletAdd}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default UserProfile