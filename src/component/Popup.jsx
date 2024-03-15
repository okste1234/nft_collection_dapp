import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useTransfer from "../hooks/useTransfer";



const Popup = ({ Transfer, id }) => {
    const [address, setAddress] = useState("0x00......")
    const hadleTransfer = useTransfer()


    return (<Dialog.Root>
        <Dialog.Trigger className="bg-blue-600 w-full text-white text-center text-lg py-2">
            <Button>{Transfer}</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Paste Receiver Address</Dialog.Title>

            <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Valid Address
                    </Text>
                    <TextField.Input
                        defaultValue={address}
                        placeholder="Enter receiver's address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button variant="soft"
                        color="blue"
                        onClick={() => hadleTransfer(address, id)}
                    >Transfer</Button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>)
};
export default Popup;