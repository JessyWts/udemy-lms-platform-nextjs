import Image from "next/image";

const Logo = () => {
    return ( 
        <Image
            height={130}
            width={130}
            priority={true}
            alt="logo"
            src="/logo.svg"
            style={{width: "auto", height: "auto"}}
        />
     );
}
 
export default Logo;