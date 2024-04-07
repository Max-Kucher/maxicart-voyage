
import appConfig from "@/config/app";

export default function PhoneLink({...props}) {
    return (
        <a {...props} href={`tel:${appConfig.contacts.phone.href}`}>{ appConfig.contacts.phone.display }</a>
    );
};
