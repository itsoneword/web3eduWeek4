export const NFTCard = ({ nft }) => {

    return (
        <div className="flex flex-col w-1/4 px-4">
            <div className="rounded-md">
                <img className=" object-cover h-128 rounded-t-md items-center" src={nft.media[0].gateway} ></img>
            </div>
            <div className=" flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md  h-150 ">
                <div className="">
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    <p className="text-blue-500">Id: {nft.id.tokenId.substr(-4)}</p>



                    <button onClick={() => { navigator.clipboard.writeText(`${nft.contract.address}`) }}
                        className="text-blue-500" >
                        Address:{nft.contract.address.substr(0, 6)} ... {nft.contract.address.substr(-4)}</button>

                </div>

                <div className="flex mt-2">
                    <p className="text-gray-600">{nft.description?.substr(0, 150)}...</p>
                </div>
                <div className="flex mt-2">
                    <a target="_blank" className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 first-letter: py-2 mt-3 rounded-full"}
                        href={`https://etherscan.io/address/${nft.contract.address}`}>Look at Etherscan</a>
                </div>
            </div>

        </div>
    )
}