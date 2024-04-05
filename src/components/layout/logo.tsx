import { Link } from "@/navigation";
import Image from "next/image";

export default function Logo() {
    return (
        <Link href="/">
            <Image
                alt="Voyage Logo"
                width={169}
                height={57}
                src="/voyage-logo.svg"
            />
        </Link>
    );
};
