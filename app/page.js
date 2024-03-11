import Link from 'next/link';
import "./index.css";

export default function Home() {
    return (
        <section className="outter option1">
            <section className="video-container">
                <video autoPlay loop playsInline muted>
                    <source src="/videos/landing-stcok-footage.mp4" type='video/mp4' />
                </video>
                <div className="callout">
                    <h1>Order Food the easy way</h1>
                    <div className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</div>
                    <Link href='/explore' className="button">
                        <div className="inner">ORDER NOW</div>
                    </Link>
                </div>
            </section>
        </section>
    )
}
