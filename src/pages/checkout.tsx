import { HeaderCart } from "@/components/HeaderCart"
import { Button, Flex, Input, Text } from "@chakra-ui/react"
import Image from "next/image"
import chipImage from "../../public/chip.png"
import signalImage from "../../public/signal.png"
import { useState } from "react"
import { formatCardNumber } from "@/utils/formatCardNumber"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const Checkout: React.FC = () => {
    const router = useRouter()
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cardMonth, setCardMonth] = useState("")
    const [cardYear, setCardYear] = useState("") 

    const validateCardNumber = (cardNumberValue: string) => {
        if(cardNumberValue.length <= 16){
            setCardNumber(cardNumberValue)
        }      
    }

    const handlePayment = () => {
        if(cardName === "" || cardNumber === "" || cardMonth === "" || cardYear === ""){
            return toast.error("Todos os campos devem ser prenchidos.", {
                position: toast.POSITION.BOTTOM_LEFT
            });   
        }
        const products = JSON.parse(sessionStorage.getItem("cart") as string)
        sessionStorage.setItem("orders", JSON.stringify(products))     
        sessionStorage.removeItem("cart")

        toast.success('Pagamento efetuado com sucesso!', {
            position: toast.POSITION.BOTTOM_LEFT
        });
        router.push("/orders")
    }

    return (
        <>
            <HeaderCart title="Checkout"/>
            <Flex display="flex" justifyContent="center" alignItems="center" h="calc(100vh - 65px)">
                <Flex w="400px" h="75%" display="flex" alignItems="center" flexDirection="column" gap="15px">
                    <Flex backgroundColor="blue" w="90%" h="170px" justifyContent="space-between" borderRadius="8px" marginTop="0.6rem" display="flex" flexDirection="column">
                        <Flex display="flex" w="100%" h="30px" alignItems="center" justifyContent="end">
                            <Text margin="5px 15px" color="#fff" fontWeight="bold">BANK</Text>
                        </Flex>
                        <Flex display="flex" justifyContent="space-between" marginTop="5px">
                            <Flex marginLeft="45px">
                                <Image src={chipImage} alt="Chip Image" width={40} height={40} />
                            </Flex>
                            <Flex marginRight="35px">
                                <Image src={signalImage} alt="Chip Image" width={40} height={40} />
                            </Flex>                            
                        </Flex>
                        <Flex display="flex" justifyContent="center">
                            <Text color="#fff" letterSpacing="5px" fontSize="1.2rem">{cardNumber === "" ? "0000 0000 0000 0000" : formatCardNumber(cardNumber)}</Text>
                        </Flex>
                        <Flex display="flex" justifyContent="space-between" alignItems="center">
                            <Text padding="10px" color="#fff">{cardName === "" ? "CARDHOLDER NAME" : cardName}</Text>
                            <Text padding="10px" color="#fff">{cardMonth == "" && cardYear === "" ? "12/24" : `${cardMonth}/${cardYear}`}</Text>
                        </Flex>
                    </Flex>
                    <Flex  w="100%" display="flex" flexDirection="column" alignItems="center" gap="10px">
                        <Input placeholder="CARD NUMBER" w="90%" color="#000" type="number" value={cardNumber} onChange={e => validateCardNumber(e.target.value)}/>
                        <Input placeholder="CARDHOLDER NAME" w="90%" color="#000" value={cardName} onChange={e => setCardName(e.target.value)}/>
                        <Flex w="90%" display="flex" gap="15px">
                            <Input placeholder="MM" w="33%" color="#000" value={cardMonth} onChange={e => setCardMonth(e.target.value)}/>
                            <Input placeholder="YY" w="33%" color="#000" value={cardYear} onChange={e => setCardYear(e.target.value)}/>
                            <Input placeholder="CVV" w="33%" color="#000"/>
                        </Flex>
                    </Flex>
                    <Flex w="90%" display="flex" gap="15px">
                        <Button colorScheme="messenger" w="70%" onClick={handlePayment}>PAY NOW</Button>
                        <Button colorScheme="blue" variant="outline" w="30%" onClick={() => router.push("/cart")}>CANCEL</Button>
                    </Flex>
                </Flex>
                
            </Flex>
        </>
    )
}

export default Checkout