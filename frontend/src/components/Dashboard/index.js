import { cidUrl } from "@utils/cidWrapper"
import { contractAbi, contractAddress } from "@utils/contractDetails"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import CreateMembership from "./CreateMembership"
import FeedPost from "./FeedPost"
import TokenCard from "./TokenCard"
import UserProfile from "./UserProfile"

const Dashboard = () => {
    const [cid, setCid] = useState("")
    const [profile, setProfile] = useState("")
    const [isContentCreator, setCreator] = useState(false)

    const { Moralis, isAuthenticated } = useMoralis()
    const { runContractFunction } = useWeb3Contract()

    async function getUserProfile(address) {
        const getUserProfileOptions = {
            abi: contractAbi,
            contractAddress: contractAddress,
            functionName: "getUserProfile",
            params: { _user: address },
        }

        const data = await runContractFunction({
            params: getUserProfileOptions,
            onSuccess: (data) => {
                console.log("Success")
                setCid(data.personalDetailCid)
                setCreator(data.isContentCreator)
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
            }
        }
    }, [cid, profile, isAuthenticated])

    return (
        <div className="">
            <div className="grid grid-cols-[7fr_11fr_6fr]">
                <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
                    {profile && (
                        <UserProfile
                            uProfPic={cidUrl(profile.profileImage)}
                            uDisName={profile.name}
                            uWalletAdd={Moralis.account}
                        />
                    )}
                    <TokenCard />
                </div>
                <div className="border-x py-6 px-3">
                    <div>
                        <div className="sticky top-14  px-6 py-2">
                            <p className="font-clashg text-lg font-semibold">Feed</p>
                        </div>
                        <div className="container my-2">
                            <FeedPost
                                cProfPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwo2WUcswBNMdLmeD_lBqHWz4ZydZ-8qVhpw&s"
                                cDisName="Michelle"
                                cUsername="@michelle"
                                postPic="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                                postTitle="Helloo"
                                postContent="Thankful for every single one of you!!"
                                postDate="May 5, 2022"
                                uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
                            />
                        </div>
                    </div>
                </div>
                <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
                    <CreateMembership />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
