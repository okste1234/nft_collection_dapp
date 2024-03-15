import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/providers";


const useNewOwner = () => {
    const [address, setAddress] = useState("");


    const eventListerner = useCallback((log) => {
        console.log("eventAA", log.topics[2]);

        const result = String(log.topics[2])

        console.log("testing event: ", result);


        const de = ethers.AbiCoder.defaultAbiCoder().decode(["address"], result)
        console.log("decodedResponses: ", de);
        setAddress("")
    }, []);


    useEffect(() => {
        const filter = {
            address: import.meta.env.VITE_contract_address,
            topics: [ethers.id("Transfer(address,address,uint256)")],
        };
        wssProvider
            .getLogs({ ...filter, fromBlock: 5465128 })
            // eslint-disable-next-line no-unused-vars
            .then((events) => {
                console.log("events: ", events);
            });

        const wssProvider2 = new ethers.WebSocketProvider(
            import.meta.env.VITE_wss_rpc_url
        );
        wssProvider2.on(filter, eventListerner);

        return () => wssProvider2.off(filter, eventListerner);
    }, [eventListerner]);


    return address;
};

export default useNewOwner;