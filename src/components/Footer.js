import React, { useEffect, useState } from "react";
import Link from "next/link";

const Footer = () => {
	const [hideAppPopup, setHideAppPopup] = useState(true);

	useEffect(() => {
		if (localStorage) {
			setHideAppPopup(localStorage.getItem('hide_app_popup'))
		}
	}, [])

	const closeAppPopup = () => {
		localStorage.setItem('hide_app_popup', true)
		setHideAppPopup(true)
	}

	return !hideAppPopup && <>
		<div className="app-modal bg-primary">
			<div className="flex" style={
				{
					"width":"100%"
				}
			}>
				<div className="flex-none w-14 h-14">
					<Link href="https://play.google.com/store/apps/details?id=com.inovasiaktif.twa">
						<img src="/images/logo.png" className="m-1" style={{
							"width": "40px", "height": "40px", "objectFit": "cover", "borderRadius": "5px"
						}} />
					</Link>
				</div>
				<div className="flex-initial w-64 pl-2 mt-0" style={
					{
						"width":"100%"
					}
				}>
					<Link href="https://play.google.com/store/apps/details?id=com.inovasiaktif.twa">
						<div><b>Inovasi Aktif App</b></div>
						<span style={{ "fontSize": "10px" }}>Solusi untuk berbagai kebutuhanmu</span>
					</Link>
				</div>
				<div className="flex-initial w-64 pl-2 mt-0" style={
					{
						"width":"70%"
					}
				}>
					<Link href="https://play.google.com/store/apps/details?id=com.inovasiaktif.twa">
						<img src="/images/google-play-badge.png" style={{
							"width": "100px", "objectFit": "cover", "borderRadius": "5px"
						}} />
					</Link>
				</div>
				<div className="flex-initial w-32 mr-1" style={
					{
						"width":"10px"
					}
				} onClick={closeAppPopup}>
					X
				</div>
			</div>
			{/* <div>
				<img src="/images/google-play-badge.png" className="m-1" style={{
					"width": "40px", "height": "40px", "objectFit": "cover", "borderRadius": "5px"
				}} />
			</div> */}
		</div>
		{/* <div className='app-modal'>
			<div className="col" style={{ "width": "40px", "flex": "0 0 auto", "color": "white", "padding": 0 }}>
				
			</div>
			<div className="col" style={{ "width": "70%", "flex": "0 0 auto", "color": "white" }}>
				<div style={{ "marginTop": "2px" }}><b>Inovasi Aktif</b></div>
				<span style={{ "fontSize": "10px" }}>Inovasi untuk kemudahan online</span>
			</div>
			<div className="col" style={{ "width": "10px", "flex": "0 0 auto", "color": "white" }} onClick={closeAppPopup}>
				<div style={{ "marginTop": "2px" }}><b>X</b></div>
			</div>
			<div style={{ "color": "white", "paddingBottom": "10px", "paddingTop": "5px" }}>Aplikasi Inovasi Aktif sudah tersedia di <b>Play Store</b></div>
			<div className='color-primary'>
				<a target="_blank" href="https://play.google.com/store/apps/details?id=com.inovasiaktif.twa" className='button' style={{ "background": "white", "fontWeight": "500", "width": "100%" }}>Install Sekarang</a>
			</div>
		</div> */}
	</>
	// <div className="footer bg-gray-800 p-6 text-white">
	// 	<div className="container mx-auto">
	// 		<div className="footer-text flex-none md:flex items-center justify-between">
	// 			<p>© Codeytek Academy 2020</p>
	// 			<p className="text-gray">Learn the latest tech skills</p>
	// 			<span className="text-gray">Follow on social links to support the work</span>
	// 		</div>
	// 		<ul className="social-links mt-8 flex align-center">
	// 			<li><a href="https://www.facebook.com/codeytek" className="fa fa-facebook" target="_blank"><Facebook/></a></li>
	// 			<li className="ml-2 mt-1"><a href="https://twitter.com/codeytek" target="_blank"><Twitter/></a></li>
	// 			<li className="ml-2 mt-1"><a href="https://youtube.com/ImranSayedDev" className="fa fa-youtube" target="_blank"><Youtube/></a></li>
	// 			<li className="ml-2"><a href="https://www.instagram.com/codeytek_academy/" className="fa fa-instagram" target="_blank"><Instagram/></a></li>
	// 		</ul>
	// 	</div>
	// </div>
}

export default Footer;
