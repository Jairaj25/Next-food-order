"use client";
import Link from 'next/link';
import { useRef, useState } from 'react';
import "./index.css";

export default function Home() {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    const toggleMuted = () => {
        setMuted(!videoRef.current.muted);
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
        }
    };

    return (
        <section className="outter option1">
            <section className="video-container">
                <video className="home-video" ref={videoRef} autoPlay loop playsInline muted >
                    <source src="/videos/landing-stcok-footage.mp4" type='video/mp4' />
                </video>
                <div className="callout">
                    <h1>Order Food the easy way</h1>
                    <div className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</div>
                    <Link href='/explore' className="order-button">
                        <div className="inner">ORDER NOW</div>
                    </Link>
                    <div className="audio-toggle-btn-wrapper">
                        <button onClick={toggleMuted} className="audio-toggle-btn">
                            {muted ? 'Audio Off' : 'Audio On'}
                        </button>
                    </div>
                </div>
            </section>
        </section>
    )
}
