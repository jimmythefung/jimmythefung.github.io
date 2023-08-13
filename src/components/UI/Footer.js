import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <>
            <ul className={`${styles["footer"]}`}>
                <li className={`${styles["footer__item"]}`}>
                    <Link href="/">Support</Link>
                </li>
                <li className={`${styles["footer__item"]}`}>
                    <Link href="/">Terms of Use</Link>
                </li>
            </ul>
        </>
    );
}
