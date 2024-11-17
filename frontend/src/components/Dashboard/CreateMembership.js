import { ArrowSmRightIcon } from "@heroicons/react/outline"
import Link from "next/link"

const CreateMembership = () => {
    return (
        <div className="rounded-lg bg-gradient-to-b from-green-50 to-white shadow">
            <div className="flex flex-col space-y-5 p-6">
                <div className="flex items-center justify-start space-x-3">
                    <div className="flex flex-col space-y-4">
                        <p className="font-clashg text-base font-medium text-stone-900">
                            Become a Creator! ✨{" "}
                        </p>
                        <p className="font-archivo text-xs font-normal leading-loose text-stone-600">
                            Create and launch your own membership NFT collection to engage and
                            reward your most dedicated fans with exclusive content.
                        </p>
                    </div>
                </div>
                <Link href="/launch">
                    <div className="flex flex-row items-center content-center justify-center space-x-2 pt-4 hover: cursor-pointer">
                        <p className="font-archivo text-sm font-semibold align-middle text-stone-900">
                            Get started
                        </p>
                        <div className="">
                            <ArrowSmRightIcon className="text-stone-900 h-4 w-4"></ArrowSmRightIcon>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CreateMembership
