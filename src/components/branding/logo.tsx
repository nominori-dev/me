import Image from "next/image";

export const Logo = () => {
    return (
        <Image src={"/logo.png"} alt={"nominori logo"} width={"512"} height={"256"} />
    )
}