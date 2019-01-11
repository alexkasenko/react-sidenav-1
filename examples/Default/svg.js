import React from 'react';

const SvgComponent = props => (
    <svg
        width={32} height={32} viewBox="0 0 64 64"
        {...props}
    >
        <g fill="none" fillRule="evenodd">
            <path d="M0 0h64v64H0z" />
            <path
                fill="#6B6B76"
                fillRule="nonzero"
                d="M12 16h40a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4zm12 4v24h28V20H24zm13.382 12.493l-7.262 7.261a.838.838 0 0 1-1.186 0l-.593-.592a.838.838 0 0 1 0-1.186l5.929-5.928-6.106-6.106c-.23-.23-.216-.614.03-.86l.888-.889c.246-.245.63-.259.86-.03l7.47 7.47c.229.23.215.614-.03.86z"
            />
        </g>
    </svg>
);

export default SvgComponent;
