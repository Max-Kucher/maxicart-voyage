
import appConfig from "@/config/app";

export default function PhoneLink() {
    return (
        <a className={"text-primary text-[20px] font-semibold"} href={`tel:${appConfig.contacts.phone.href}`}>{ appConfig.contacts.phone.display }</a>
    );
};
