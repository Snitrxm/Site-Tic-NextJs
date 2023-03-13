import { Divider, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { AiOutlineHome } from "react-icons/ai"

interface IProps {
    title: string;
}

export const HeaderCart: React.FC<IProps> = ({ title }: IProps) => {
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
                    <Text fontSize="1.3rem">{title}</Text>
                </Flex>
                <Flex marginRight="1.5rem" display="flex" gap="1rem">
                    <AiOutlineHome size="1.5rem" cursor="pointer" onClick={() => router.push("/")}/>
                </Flex>
            </Flex>
            <Divider orientation="horizontal" />
        </>
        
    )
}