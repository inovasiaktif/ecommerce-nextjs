import React, { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { HomeOutline, ChatbubblesOutline, PersonOutline, NewspaperOutline } from 'react-ionicons';

const BottomMenu = () => {
    return (
        <>
            <div>
                <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <a href="#" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                            <HomeOutline
                                color={'#00000'}
                                height="25px"
                                width="25px"
                            />
                            <span className="title tab tab-home block text-xs">Home</span>
                        </a>
                        <a href="#" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                            <NewspaperOutline
                                color={'#00000'}
                                height="25px"
                                width="25px"
                            />
                            <span className="title tab tab-explore block text-xs">Artikel</span>
                        </a>
                        <a href="#" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                            <ChatbubblesOutline
                                color={'#00000'}
                                height="25px"
                                width="25px"
                            />
                            <span className="title tab tab-whishlist block text-xs">Chat</span>
                        </a>
                        <a href="#" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                            <PersonOutline
                                color={'#00000'}
                                height="25px"
                                width="25px"
                            />
                            <span className="title tab tab-account block text-xs">Akun Saya</span>
                        </a>
                    </div>
                </section>
            </div>
        </>
    )
};

export default BottomMenu;