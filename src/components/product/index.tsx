import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { toast } from 'react-toastify';
import { IProduct } from "./dtos"

interface IProps {
    product: IProduct
}

export const Product: React.FC<IProps> = ({ product }: IProps) => {
    const handleAddToCart = (product: IProduct) => {
        const cart = sessionStorage.getItem("cart")
        
        if(!cart){
            sessionStorage.setItem("cart", JSON.stringify([ product ]))
            toast.success('Produto adicionado ao carinho!', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        } else {
            const productsInCart = sessionStorage.getItem("cart") as string
            const productsArray: IProduct[] = JSON.parse(productsInCart)
            
            productsArray.push(product)
            sessionStorage.removeItem("cart")
            sessionStorage.setItem("cart", JSON.stringify(productsArray))
            toast.success('Produto adicionado ao carinho!', {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }

    return (
        <Flex w="300px">
            <Card maxW='sm' size="sm">
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
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue' onClick={() => handleAddToCart(product)}>
                        Add to cart
                    </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Flex>

    )
}