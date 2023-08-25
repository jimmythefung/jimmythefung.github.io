import Cell from "@/components/Game/Cell/Cell";
import styles from "./board.module.css";

export default function Board({ current_board, onCellClick }) {
    let m_rows = current_board.length;
    let n_columns = current_board[0].length;

    // Build up a board made of columns
    let full_board = [];
    for (let c = 0; c < n_columns; c++) {
        // Construct a column
        let a_column = [];
        for (let r = 0; r < m_rows; r++) {
            let index = "(" + r.toString() + ", " + c.toString() + ")";
            a_column.push(
                <Cell
                    key={index}
                    player={current_board[r][c]}
                    row={r}
                    col={c}
                    clickHandler={onCellClick}
                />
            );
        }

        // Add column to board
        full_board.push(
            <div key={c} className={`${styles.column}`}>
                {a_column}
            </div>
        );
    }
    return <div className={`${styles.board}`}>{full_board}</div>;
}
