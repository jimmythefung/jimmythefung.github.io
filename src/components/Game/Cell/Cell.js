import styles from "./cell.module.css";
import * as rules from "@/components/Scripts/c4rules.js";

export default function Cell({ player, row, col, clickHandler }) {
    return (
        <div
            className={`
                ${styles.cell} 
                ${player === rules.PLAYER1 ? styles.player1 : ""}
                ${player === rules.PLAYER2 ? styles.player2 : ""}
            `}
            onClick={() => clickHandler(row, col)}
        ></div>
    );
}
