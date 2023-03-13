import { IProduct } from "@/components/product/dtos"
import { useEffect, useMemo, useState } from "react"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { HeaderCart } from "@/components/HeaderCart"
import { toast } from "react-toastify"
import { useRouter } from "next/router"


const Cart: React.FC = () => {
    const router = useRouter()
    const [productsInCart, setProductsInCart] = useState<IProduct[]>([])

    const handleRemoveProduct = (productId: string) => {
        const newProductArray = productsInCart.filter((product) => {
            if(product.id === productId){
                return false
            }   
            return product
        })
        sessionStorage.setItem("cart", JSON.stringify(newProductArray))
        setProductsInCart(newProductArray)
        toast.error('Produto retirado do carinho.', {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    const handleCheckout = () =>  {
        if(productsInCart.length === 0){
            return toast.error('Voce nao tem nada no carrinho.', {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }

        router.push("/checkout")
    }

    const priceCart = useMemo(() => {
        let total = 0
        productsInCart.forEach(product => {
            total += product.price
        })
        return total
    }, [productsInCart])

    useEffect(() => {
        const products = sessionStorage.getItem("cart") as string
        const productArray: IProduct[] = JSON.parse(products)

        setProductsInCart(productArray === null ? [] : productArray) 
    }, [])

    return (
        <>
            <HeaderCart title="My Cart" />
            <Flex display="flex" margin="1rem" flexWrap="wrap" gap="1.3rem" justifyContent="center">
                {productsInCart.length === 0 && <Text>Nothing</Text>}
                {productsInCart.map((product) => (
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
                            <Text color='blue.600' fontSize='2xl'>
                                €{product.price}
                            </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red' onClick={() => handleRemoveProduct(product.id)}>
                                    Remove Product
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </Flex>
                ))}
            </Flex>
            <Flex display="flex" justifyContent="center" gap="1rem" alignItems="center" flexDirection="column">
                <Flex>
                    <Text fontSize="1.2rem">Preço Total: €{priceCart}</Text>
                </Flex>
                <Flex display="flex" gap="10px">
                    <Button variant='solid' colorScheme='blue' onClick={handleCheckout}>
                        Checkout
                    </Button>
                    <Button variant='solid' colorScheme='blue' onClick={() => router.push("/orders")}>
                        Orders
                    </Button>
                </Flex>
            </Flex>
            
        </>
    )
}

export default Cart