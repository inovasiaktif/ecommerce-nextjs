import React, { useContext, useState } from 'react';
import Link from 'next/link';
import ProductMenu from './ProductMenu';
import SubMenu from './SubMenu';
import { AppContext } from './context/AppContext';
import { getWindowSize } from '../functions';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { US, ID } from 'country-flag-icons/react/3x2';

const Menu = ({ isHomepage, menuTitle, pageType, t }) => {
    return (
        <>
            {
                isHomepage ? <HomepageMenu t={t} /> :
                    pageType && pageType == "product" ? <ProductMenu /> :
                        <SubMenu menuTitle={menuTitle} />
            }
        </>
    )
};

const HomepageMenu = ({ t }) => {
    const [cart] = useContext(AppContext);
    const productsCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : '';

    const [width] = getWindowSize();
    const maxWidth = 600;

    let badgesLeft = 520;
    if (width < maxWidth) {
        badgesLeft = (width - 80);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            width: '80%',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement('#__next');

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const router = useRouter();

    const { locales, locale: activeLocale } = router;

    return (
        <>
            <div className="menu flex">
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <div className="text-muted cursor-pointer language-switcher">
                        <h3><b>{t("main.Select language")}:</b></h3>
                        <br />
                        {locales?.map((locale, index) => {
                            const { pathname, query, asPath } = router;
                            return (
                                <div key={index}>
                                    <hr />
                                    <Link href={{ pathname, query }} as={asPath} locale={locale} onClick={closeModal}>
                                        <div className={locale == activeLocale ? "item active" : "item"}>
                                            {locale === "en" ? <>
                                                <US title="United States" /> English
                                            </> : locale === "id" ? <><ID title="United States" style={{ "width": "25px", "display": "inline-block" }} /> Indonesia</> : null}
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </Modal>
                <div className="menu-item" onClick={openModal} style={{ "paddingLeft": "0px", "paddingRight": "20px" }}>
                    {productsCount ? <span style={{ "left": badgesLeft }} className="cart-badges">{productsCount}</span> : ''}
                    {activeLocale == "en" ? <US title="United States" style={{ "width": "25px" }} /> : <ID title="United States" style={{ "width": "25px" }} />}
                </div>
                <div className="menu-item w-full">
                    <input name="q" placeholder={t("main.Search Product or Services") + "..."} className="search-input" type="text" autoComplete="off" />
                </div>
                <div className="menu-item cart-icon-container">
                    <Link href="/cart">
                        {/* <a className="account"> */}
                        {productsCount ? <span style={{ "left": badgesLeft }} className="cart-badges">{productsCount}</span> : ''}
                        <svg style={{ "color": "white" }} viewBox="0 0 24 24" fill="none" width="24" height="24" color="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M0 2.75h3.713l4.065 14.453a.75.75 0 00.722.547H20a.75.75 0 00.721-.544l3-10.5A.75.75 0 0023 5.75H6.115L5.003 1.797 4.85 1.25H0v1.5zm9.068 13.5l-2.531-9h15.469l-2.572 9H9.068zM9.75 22a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm9 0a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" fill="currentColor"></path></svg>
                        {/* </a> */}
                    </Link>
                </div>
                <div className="menu-item user-icon-container">
                    <Link href="/my-account">
                        {/* <a className="account"> */}
                        <svg viewBox="0 0 28 28" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.8166 17.0039531c-1.5729-1.03425-2.6166-2.8161-2.6166-4.82895v-2.1c0-3.17625 2.5977-5.775 5.775-5.775 3.17625 0 5.775 2.59875 5.775 5.775v2.1c0 2.016-1.04685 3.801-2.625 4.8342v-.0042l6.18975 2.667c.3864.1659.63525.546.63525.9639v2.5641c0 .5775-.4725 1.05-1.05 1.05H5.05c-.5775 0-1.05-.4725-1.05-1.05v-2.5641c0-.4179.24885-.798.6342-.9639l6.1908-2.667-.0084-.00105z" stroke="#FFF" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinejoin="round"></path></svg>
                        {/* </a> */}
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Menu;