import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className={`${styles.navbar}`}>
                {/* Vertical side navigation panel */}
                <div className={`mobile-nav ${styles["mobile-nav"]}`}>
                    <ul className={`${styles["mobile-nav__items"]}`}>
                        <li className={`${styles["mobile-nav__item"]}`}>
                            <Link href="/">Connect 4</Link>
                        </li>
                        <li className={`${styles["mobile-nav__item"]}`}>
                            <Link href="/">Contact</Link>
                        </li>
                        <li className={`${styles["mobile-nav__item"]}`}>
                            <Link href="/">About</Link>
                        </li>
                    </ul>
                </div>

                {/*  Horizonal header navigation bar */}
                <div className={`${styles["navbar-left"]}`}>
                    {/* Mobile screen - Hamberger menu*/}
                    <button
                        className={`toggle-button ${styles["toggle-button"]}`}
                    >
                        <span
                            className={`${styles["toggle-button__bar"]}`}
                        ></span>
                        <span
                            className={`${styles["toggle-button__bar"]}`}
                        ></span>
                        <span
                            className={`${styles["toggle-button__bar"]}`}
                        ></span>
                    </button>
                    <div className={`${styles["navbar-left__item"]}`}>
                        <Link
                            className={`${styles["navbar-left__brand"]}`}
                            href="/"
                        >
                            Home
                        </Link>
                    </div>
                </div>

                <div className={`${styles["navbar-right"]}`}>
                    <ul className={`${styles["navbar-right__items"]}`}>
                        <li className={`${styles["navbar-right__item"]}`}>
                            <Link href="/">Connect 4</Link>
                        </li>
                        <li className={`${styles["navbar-right__item"]}`}>
                            <Link href="/">Contact</Link>
                        </li>
                        <li className={`${styles["navbar-right__item"]}`}>
                            <Link href="/">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
