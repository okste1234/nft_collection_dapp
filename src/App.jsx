import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";
import Popup from "./component/Popup";
import useMint from "./hooks/useMint";
import useNewOwner from "./hooks/useNewOwner";

configureWeb3Modal();



function App() {
    useNewOwner()
    const tokensData = useCollections();
    const { data: { data, addrress }, isMintedId } = useMyNfts();
    const handleMint = useMint();


    const myTokensData = tokensData.filter((x, index) =>
        data.includes(index)
    );


    const tokens = tokensData.map((x, index) => ({
        ...x,
        isMinted: isMintedId.includes(index),
        add: addrress
    }));

    const mytokens = myTokensData.map((x) => ({
        ...x,
        data
    }));


    return (
        <Container>
            <Header />
            <main className="mt-6">
                <AppTabs
                    MyNfts={
                        <Flex align="center" gap="8" wrap={"wrap"}>
                            {myTokensData.length === 0 ? (
                                <Text>No NFT owned yet</Text>
                            ) : (
                                mytokens.map((x, index) => (
                                    <Box key={x.dna} className="w-[20rem]">
                                        <img
                                            src={x.image}
                                            className="w-full object-contain"
                                            alt={x.name}
                                        />
                                        <Text className="block text-2xl">
                                            Name: {x.name}
                                        </Text>
                                        <Text className="block">
                                            Description: {x.description}
                                        </Text>
                                        <Flex direction="column" gap="2" style={{ marginBottom: "2rem" }}>
                                            <a className="px-2 py-1 text-lg mt-2 bg-blue-700 text-white rounded-lg" href={`${import.meta.env.VITE_opeasea_base_url}${x.data[index]}`}>OpeaSea</a>
                                            <Popup className="mt-2"
                                                Transfer={
                                                    <Text>Transfer</Text>
                                                }
                                                id={x.data[index]}
                                            />


                                        </Flex>
                                    </Box>
                                ))
                            )}
                        </Flex>
                    }
                    AllCollections={
                        <Flex align="center" gap="8" wrap={"wrap"}>
                            {tokens.length === 0 ? (
                                <Text>Loading...</Text>
                            ) : (
                                tokens.map((item, index) => (
                                    <Box key={item.dna} className="w-[20rem]">
                                        <img
                                            src={item.image}
                                            className="w-full object-contain"
                                            alt={item.name}
                                        />
                                        <Text className="block text-2xl">
                                            Name: {item.name}
                                        </Text>
                                        <Text className="block">
                                            Description: {item.description}
                                        </Text>
                                        {item.isMinted ?
                                            (
                                                <Flex direction="column" gap="2">
                                                    <a className="px-4 py-2 text-lg mt-2 bg-blue-700 text-white rounded-lg" href={`${import.meta.env.VITE_opeasea_base_url}${index}`}>OpeaSea</a>
                                                    <Text>
                                                        {`${item.add[index]?.slice(0, 7)}...${item.add[index]?.slice(item.add[index].length - 5)}`}
                                                    </Text>
                                                </Flex>
                                            ) : <Button className="px-8 py-2 text-xl mt-2"
                                                onClick={() => handleMint(index)}
                                            >
                                                Mint
                                            </Button>

                                        }
                                    </Box>
                                ))
                            )}
                        </Flex>
                    }
                />
            </main>
        </Container>
    );
}

export default App;
