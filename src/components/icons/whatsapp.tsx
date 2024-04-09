import React, {FC, SVGProps} from 'react';

const WhatsappIcon: FC<SVGProps<any>> = ({...props}) => {
    return (
        <svg {...props} viewBox="0 0 39 39" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M32.7188 6.20636C30.9998 4.46997 28.9522 3.09324 26.6956 2.15646C24.4389 1.21968 22.0183 0.7416 19.575 0.750112C9.3375 0.750112 0.99375 9.09386 0.99375 19.3314C0.99375 22.6126 1.85625 25.8001 3.46875 28.6126L0.84375 38.2501L10.6875 35.6626C13.4063 37.1439 16.4625 37.9314 19.575 37.9314C29.8125 37.9314 38.1563 29.5876 38.1563 19.3501C38.1563 14.3814 36.225 9.71261 32.7188 6.20636ZM19.575 34.7814C16.8 34.7814 14.0813 34.0314 11.7 32.6251L11.1375 32.2876L5.2875 33.8251L6.84375 28.1251L6.46875 27.5439C4.92702 25.0819 4.10839 22.2362 4.10625 19.3314C4.10625 10.8189 11.0438 3.88136 19.5563 3.88136C23.6813 3.88136 27.5625 5.49386 30.4688 8.41886C31.9078 9.85129 33.0482 11.5551 33.8239 13.4315C34.5995 15.308 34.9951 17.3197 34.9875 19.3501C35.025 27.8626 28.0875 34.7814 19.575 34.7814ZM28.05 23.2314C27.5813 23.0064 25.2938 21.8814 24.8813 21.7126C24.45 21.5626 24.15 21.4876 23.8313 21.9376C23.5125 22.4064 22.6313 23.4564 22.3688 23.7564C22.1063 24.0751 21.825 24.1126 21.3563 23.8689C20.8875 23.6439 19.3875 23.1376 17.625 21.5626C16.2375 20.3251 15.3188 18.8064 15.0375 18.3376C14.775 17.8689 15 17.6251 15.2438 17.3814C15.45 17.1751 15.7125 16.8376 15.9375 16.5751C16.1625 16.3126 16.2563 16.1064 16.4063 15.8064C16.5563 15.4876 16.4813 15.2251 16.3688 15.0001C16.2563 14.7751 15.3188 12.4876 14.9438 11.5501C14.5688 10.6501 14.175 10.7626 13.8938 10.7439H12.9938C12.675 10.7439 12.1875 10.8564 11.7563 11.3251C11.3438 11.7939 10.1438 12.9189 10.1438 15.2064C10.1438 17.4939 11.8125 19.7064 12.0375 20.0064C12.2625 20.3251 15.3188 25.0126 19.9688 27.0189C21.075 27.5064 21.9375 27.7876 22.6125 27.9939C23.7188 28.3501 24.7313 28.2939 25.5375 28.1814C26.4375 28.0501 28.2938 27.0564 28.6688 25.9689C29.0625 24.8814 29.0625 23.9626 28.9313 23.7564C28.8 23.5501 28.5188 23.4564 28.05 23.2314Z"
            />
        </svg>

    );
};

export default WhatsappIcon;