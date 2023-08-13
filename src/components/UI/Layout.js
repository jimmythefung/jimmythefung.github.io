import Navbar from "./Navbar";
import Footer from "./Footer";
import Script from "next/script";
import styles from "./layout.module.css";

export default function Layout({ children }) {
    return (
        <div className={`${styles["layout"]}`}>
            <div className="top-flexbox">
                <Navbar />
                {children}
            </div>
            <div className="bottom-flexbox">
                <Footer />
            </div>
            <Script src="/shared.js" />
        </div>
    );
}
