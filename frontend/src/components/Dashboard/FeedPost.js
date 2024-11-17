
const FeedPost = ({ cProfPic, cDisName, cUsername, postPic, postTitle, postContent, postDate, uProfPic }) => {
    return (
        <div className="mx-6 mb-4 rounded-lg bg-gradient-to-b from-green-50 to-white shadow">
            <div className="flex flex-col space-y-5 p-7">
                <div className="flex items-center justify-start space-x-3">
                    <img className="object-cover h-10 w-10 rounded-full" src={cProfPic} alt="" />
                    <div className="flex flex-col">
                        <p className="font-clashg text-base font-medium text-stone-900">{cDisName}</p>
                        <p className="font-archivo text-xs font-semibold text-stone-500">{cUsername}</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-4 justify-self-end">
                    <img className="object-contain" src={postPic} />
                    <div className="flex flex-col space-y-2">
                        <p className="font-clashg text-base font-medium text-stone-900">{postTitle}</p>
                        <p className="font-archivo text-sm font-normal text-stone-700">{postContent}</p>
                    </div>
                </div>
                <div className="div border-b-2 pb-2  border-stone-100">
                    <p className="font-archivo text-xs font-semibold uppercase text-stone-900">{postDate}</p>
                </div>
                <div className="div">
                    <div className="flex flex-row items-center justify-start space-x-3">
                        <img className="object-cover h-6 w-6 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                        <div className="box-content flex h-7 flex-auto rounded-lg ">
                            <input type="text" className="form-control font-archivo flex flex-auto rounded-lg  bg-clip-padding px-4 py-1 text-xs font-normal text-stone-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none" id="comments" placeholder="Comments (disabled)" aria-label="Comments" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedPost