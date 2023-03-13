import { Product } from "@/components/product"
import { Header } from "@/components/Header"
import { products } from "@/data"
import { Flex } from "@chakra-ui/react"

export default function Home() {
  return (
    <Flex display="flex" flexDirection="column">
      <Header />
      <Flex display="flex" margin="1rem" flexWrap="wrap" justifyContent="center" gap="1.3rem">
        {products.map((product) => (
          <>
            <Product product={product} key={product.id}/>
          </>
        ))}
      </Flex>
    </Flex>
    
  )
}
