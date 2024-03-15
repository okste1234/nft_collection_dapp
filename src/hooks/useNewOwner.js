import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { wssProvider } from "../constants/providers";

const useNewOwner = () => {
    const [address, setAddress] = useState("");

    const eventListerner = (log) => {
        console.log("testing event: ", log);
        setAddress("")
    };

    useEffect(() => {
        const filter = {
            address: import.meta.env.VITE_contract_address,
            topics: [ethers.id("Transfer(address,address,uint256)")],
        };
        wssProvider
            .getLogs({ ...filter, fromBlock: 5465128 })
            .then((events) => {
                console.log("events: ", events);
                // setAddress(events);
            });

        const wssProvider2 = new ethers.WebSocketProvider(
            import.meta.env.VITE_wss_rpc_url
        );
        wssProvider2.on(filter, eventListerner);

        return () => wssProvider2.off(filter, eventListerner);
    }, []);


    return address;
};

export default useNewOwner;