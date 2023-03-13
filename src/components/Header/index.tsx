import { Divider, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FiShoppingCart } from "react-icons/fi"

export const Header: React.FC = () => {
    const router = useRouter()

    return (
        <>
            <Flex 
                display="flex" 
                justifyContent="space-between" 
                height="4rem"
                alignItems="center"
            >
                <Flex marginLeft="1.5rem">
                    <Text fontSize="1.3rem" color="blue">E-commerce</Text>
                </Flex>
                <Flex marginRight="1.5rem" display="flex" gap="1rem">
                    <FiShoppingCart size="1.5rem" cursor="pointer" onClick={() => router.push("/cart")}/>
                </Flex>
            </Flex>
            <Divider orientation="horizontal" borderColor="#000"/>
        </>
        
    )
}