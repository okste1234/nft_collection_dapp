import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { getProvider } from "../constants/providers";
import { getNFTsContract } from "../constants/contracts.js";
import { toast } from "react-toastify"

const useTransfer = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const { address } = useWeb3ModalAccount();


    return useCallback(async (addressTo, id) => {
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getNFTsContract(signer);

        try {
            const transaction = await contract.transferFrom(address, addressTo, id);
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            if (receipt.status) {
                return toast.success("transfer successfull!");
            }

            toast.error("transfer failed!");
        } catch (error) {
            console.log("error :", error);
        }
    }, [address, walletProvider]);
}

export default useTransfer