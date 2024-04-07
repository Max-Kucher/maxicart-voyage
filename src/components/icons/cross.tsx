import React, {FC, SVGProps} from 'react';

const CrossIcon: FC<SVGProps<any>> = ({...props}) => {
    return (
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="37.6895" height="4.52274" rx="2"
                  transform="matrix(0.707105 -0.707108 0.707105 0.707108 0.151367 26.8008)" />
            <rect width="37.6895" height="4.52274" rx="2"
                  transform="matrix(0.707105 0.707108 -0.707105 0.707108 3.19824 0)" />
        </svg>
    );
};

export default CrossIcon;
