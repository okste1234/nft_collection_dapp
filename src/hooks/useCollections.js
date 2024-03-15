import { useEffect, useState } from "react";
import useNewOwner from "./useNewOwner";

const useCollections = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([]);
    const eventListener = useNewOwner()


    useEffect(() => {
        (async () => {
            const tokenIDs = [...Array.from({ length: 30 })].map(
                (_, index) => index
            );

            const promises = tokenIDs.map((index) =>
                fetch(`${import.meta.env.VITE_token_base_url}${index}`)
            );

            const tokensMetadataResponse = await Promise.all(promises);


            const tokensMetadataJson = [];

            for (let i = 0; i < tokensMetadataResponse.length; i++) {
                const json = await tokensMetadataResponse[i].json();
                tokensMetadataJson.push(json);
            }

            setData(tokensMetadataJson);
        })();
    }, [eventListener]);

    return data;
};

export default useCollections;
