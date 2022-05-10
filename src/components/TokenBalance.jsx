import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const TokenBalance = ({chain, address, setAmount}) => {
    const [balance, setBalance] = useState(0)
    const { Moralis, account } = useMoralis()
    const options = {chain: chain, address: account, token_addresses: [address]}
    
    const getBalance = async () => {
        let bal = await Moralis.Web3API.account.getTokenBalances(options)
        if(bal.length > 0) {
            setBalance(Moralis.Units.FromWei(bal[0].balance, 5))
        } else {
            setBalance(0)
        }
    }

    useEffect(()=> {
        getBalance()
        console.log(balance)
    }, [balance, account, chain])
  return (
    <div className="flex items-center justify-between">
        <div className="text-[#f8583e]">Your Balance: {balance}</div>
        <div className="text-[#f8583e] cursor-pointer" onClick={() => setAmount(balance)}>Max</div>
    </div>
  )
}

export default TokenBalance