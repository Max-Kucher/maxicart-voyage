
import Image from "next/image";

export default function CurrencySwitcher() {
    return (
        <div className={"flex items-center font-semibold"}>
            <span className={"block text-black mr-2 text-[20px]"}>USD</span>
            <Image
                src={"/images/flags/us.svg"}
                width={44}
                height={44}
                alt={"US flag"}
            />
        </div>
    );
};
