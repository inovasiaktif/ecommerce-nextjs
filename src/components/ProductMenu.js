import React from 'react';
import Link from 'next/link';

const ProductMenu = () => {
    return (
        <>
            <div className="product-menu menu flex">
                <div className="menu-item w-full">
                    <Link href="/">
                        <a className="icon">
                            <svg viewBox="0 0 22 17" role="img" className="stardust-icon stardust-icon-back-arrow osVe+-">
                                <g stroke="none" strokeWidth="1" fillRule="evenodd" transform="translate(-3, -6)">
                                    <path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z">
                                    </path>
                                </g>
                            </svg>
                        </a>
                    </Link>
                </div>
                <div className="menu-item cart-icon-container">
                    <Link href="/cart">
                        <a className="account">
                            <svg style={{ "color": "white" }} viewBox="0 0 24 24" fill="none" width="24" height="24" color="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M0 2.75h3.713l4.065 14.453a.75.75 0 00.722.547H20a.75.75 0 00.721-.544l3-10.5A.75.75 0 0023 5.75H6.115L5.003 1.797 4.85 1.25H0v1.5zm9.068 13.5l-2.531-9h15.469l-2.572 9H9.068zM9.75 22a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm9 0a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" fill="currentColor"></path></svg>
                        </a>
                    </Link>
                </div>
                <div className="menu-item user-icon-container">
                    <Link href="/my-account">
                        <a className="account">
                            <svg viewBox="0 0 28 28" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.8166 17.0039531c-1.5729-1.03425-2.6166-2.8161-2.6166-4.82895v-2.1c0-3.17625 2.5977-5.775 5.775-5.775 3.17625 0 5.775 2.59875 5.775 5.775v2.1c0 2.016-1.04685 3.801-2.625 4.8342v-.0042l6.18975 2.667c.3864.1659.63525.546.63525.9639v2.5641c0 .5775-.4725 1.05-1.05 1.05H5.05c-.5775 0-1.05-.4725-1.05-1.05v-2.5641c0-.4179.24885-.798.6342-.9639l6.1908-2.667-.0084-.00105z" stroke="#FFF" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinejoin="round"></path></svg>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default ProductMenu;