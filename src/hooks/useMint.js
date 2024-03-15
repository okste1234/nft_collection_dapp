import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { getProvider } from "../constants/providers";
import { getNFTsContract } from "../constants/contracts.js";
import { toast } from "react-toastify"
import { ethers } from "ethers";

const useMint = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const { address } = useWeb3ModalAccount();

    return useCallback(async (id) => {
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
        const amount = ethers.parseEther("0.01")
        console.log(amount);

        const contract = getNFTsContract(signer);

        try {
            const transaction = await contract.safeMint(address, id, {
                value: amount
            });
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            if (receipt.status) {
                return toast.success("Minted successfully!");
            }

            toast.error("Minting failed!");
        } catch (error) {
            console.log("error :", error);
        }
    }, [address, walletProvider]);
}

export default useMint