import { ArrowSmRightIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import TokenPreview from './TokenPreview';

const TokenCard = () => {
    return (
        <div className="rounded-lg bg-gradient-to-b from-green-50 to-white shadow">
            <div className="flex flex-col space-y-5 p-4">
                <div className="flex items-center space-x-3">
                    <div className="flex grow flex-col space-y-4">
                        <div className="">
                            <p className="font-clashg text-base font-medium text-stone-900">Your Membership Tokens</p>
                        </div>
                        <div className="container flex flex-col space-y-3">
                            <TokenPreview
                                tokenPic="https://i.pinimg.com/564x/44/60/87/446087c8c1d488b308fa34cc0803a4c8.jpg"
                                tokenName="Livies"
                                tokenNum="#336"
                                cTokProfPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwo2WUcswBNMdLmeD_lBqHWz4ZydZ-8qVhpw&s"
                                cTokDisName="Olivia Rodrigo"
                                cTokTitle="singer"
                            />
                            <TokenPreview
                                tokenPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2V335gN7v7kAYWXvOof5_lt1JopQ8LMPmw&usqp=CAU"
                                tokenName="Swifties"
                                tokenNum="#2347"
                                cTokProfPic="https://thekit.ca/wp-content/uploads/2020/12/evermoreFEAT-1200x1445.jpg"
                                cTokDisName="Taylor Swift"
                                cTokTitle="singer"
                            />
                        </div>
                    </div>
                </div>
                <Link href="/tokencollection">
                    <div className="flex flex-row items-center content-center justify-center space-x-2 border-t-2 border-t-stone-100 pt-4 hover: cursor-pointer">
                        <p className="font-archivo text-sm font-semibold align-middle text-stone-900">View All</p>
                        <div className="">
                            <ArrowSmRightIcon className="text-stone-900 h-4 w-4"></ArrowSmRightIcon>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(TokenCard), { ssr: false });
