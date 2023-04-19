import React, { useEffect, useState } from "react";
import Link from "next/link";

const Footer = ({pageType}) => {
	return pageType != "checkout" && <>
		<AppModal pageType={pageType} />
		{/* <center>
			<hr style={
				{
					"borderColor": "rgb(216 216 216)",
					"width":"90%"
				}
			} />
		</center> */}
		<div className="footer p-6 text-white" style={
			{
				"paddingBottom": "100px"
			}
		}>
			<div className="container mx-auto">
				<div className="footer-text flex-none md:flex items-center justify-between" style={{
					"color":"grey",
					"textAlign":"center",
					"fontSize":"12px"
				}}>
					<div className="pb-8">
						<Link href="/privacy-policy" className="color-primary">Kebijakan Privasi</Link>
						<span style={
							{
								"paddingLeft":"1.25rem"
							}
						}>
							<Link href="/term-conditions" className="color-primary">Syarat dan Ketentuan</Link>
						</span>
					</div>
					<p>Copyright © 2023 Inovasi Aktif. All rights reserved.</p>
				</div>
			</div>
		</div>
		<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8615035709040167" crossorigin="anonymous"></script>
	</>
}

function AppModal({pageType}) 
{
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

	return !hideAppPopup && pageType != "product" && <>
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
						"width":"85%"
					}
				}>
					<Link href="https://play.google.com/store/apps/details?id=com.inovasiaktif.twa">
						<div><b>Inovasi Aktif App</b></div>
						<span style={{ "fontSize": "10px" }}>Dapatkan Hadiah Menarik!</span>
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
		</div>
	</>
}

export default Footer;
