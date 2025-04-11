import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

import shirt1 from "../assets/shirts/t-shirt1.png"
import shirt2 from "../assets/shirts/t-shirt2.png"
// import shirt3 from "../assets/shirts/t-shirt3.png"

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} alt="" width={520} height={480} />

        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={shirt2} alt="" width={520} height={480} />

        <footer>
          <strong>Camiseta 2</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      {/* <Product>
        <Image src={shirt3} alt="" width={520} height={480} />

        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product> */}
    </HomeContainer>
  );
}
