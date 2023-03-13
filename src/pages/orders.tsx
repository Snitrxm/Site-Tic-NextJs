import { HeaderCart } from "@/components/HeaderCart"
import { IProduct } from "@/components/product/dtos"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"  
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { MdOutlineLocalShipping } from "react-icons/md"
import { toast } from "react-toastify"

const Orders: React.FC = () => {
    const router = useRouter()
    const [orders, setOrders] = useState<IProduct[]>([])

    const handleReceivedOrder = (orderId: string) => {
        const newArrayOrders = orders.filter((order) => {
            if(!(order.id === orderId)){
                return order
            }
            return false
        })
        setOrders(newArrayOrders)
        sessionStorage.removeItem("orders")
        sessionStorage.setItem("orders", JSON.stringify(orders))
        toast.success('Produto entrege com sucesso!', {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    useEffect(() => {
        const ordersArray = JSON.parse(sessionStorage.getItem("orders") as string)
        setOrders(ordersArray === null ? [] : ordersArray) 
    }, [])

    return (
        <>
            <HeaderCart title="Orders"/>
            <Flex display="flex" margin="1rem" flexWrap="wrap" gap="1.3rem" justifyContent="center">
                {orders.length === 0 && <Text>Nothing</Text>}
                {orders.map((product) => (
                    <Flex w="300px">
                    <Card maxW='sm' size="sm" border="1px solid #e6e6e6">
                        <CardBody>
                            <Image
                            src={product.image}
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                            <Heading size='md'>{product.name}</Heading>
                            <Text color='blue.600' fontSize='2xl' textDecoration="line-through">
                                €{product.price}
                            </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter display="flex" flexDirection="column">
                            <Flex display="flex" justifyContent="space-between" alignItems="center">
                                <Text color="blue">A Caminho</Text>
                                <MdOutlineLocalShipping size={30} />
                            </Flex>
                            <Flex marginTop="1rem">
                                <Button onClick={() => handleReceivedOrder(product.id)} colorScheme="blue" variant="outline">Chegou? Clique Aqui</Button>
                            </Flex>
                        </CardFooter>
                    </Card>
                </Flex>
                ))}
            </Flex>
            
        </>
    )
}

export default Orders

