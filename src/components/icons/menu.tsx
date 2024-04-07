import React, {FC, SVGProps} from 'react';

const MenuIcon: FC<SVGProps<any>> = ({...props}) => {
    return (
        <svg viewBox="0 0 60 32" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="20" y="26" width="40" height="6" rx="2" />
            <rect x="10" y="13" width="50" height="6" rx="2" />
            <rect width="60" height="6" rx="2" />
        </svg>
    );
};

export default MenuIcon;
