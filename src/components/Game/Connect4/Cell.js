import styles from "./connect4.module.css";
import * as rules from "../../scripts/c4rules.js";

export default function Cell({ text, row, col, clickHandler }) {
    return (
        <div
            className={`
                ${styles.cell} 
                ${text === rules.PLAYER1 ? styles.player1 : ""}
                ${text === rules.PLAYER2 ? styles.player2 : ""}
            `}
            onClick={() => clickHandler(row, col)}
        ></div>
    );
}
