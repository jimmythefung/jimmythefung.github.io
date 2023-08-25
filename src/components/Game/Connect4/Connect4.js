import { useState, useRef } from "react";
import styles from "./connect4.module.css";
import Board from "../Board/Board";
import Spinner from "../Spinner/Spinner";
import Layout from "../../UI/Layout";
import * as rules from "../../scripts/c4rules.js";
import * as utils from "../../scripts/utils.js";

export default function Connect4({ m, n }) {
    const backdropref = useRef(null);
    const [currentBoard, setCurrentBoard] = useState(rules.create_board(m, n));
    const [col_select, setColSelect] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(rules.PLAYER1);

    // History mechanics
    const [history, setHistory] = useState([rules.create_board(m, n)]);
    const [selectedTurn, setSelectedTurn] = useState(0);

    let otherPlayer = get_other_player();
    let isGameOver = rules.check_winner(currentBoard);
    let p1UsesAI = false;

    // Check winner
    if (isGameOver) {
        let msg = "Victory: " + otherPlayer;
        utils.openModal(msg);
        if (backdropref.current) {
            backdropref.current.style.display = "none";
        }
    } else {
        // Game continues
        utils.closeModal();
        if (currentPlayer === rules.PLAYER1) {
            if (p1UsesAI) {
                handle_ai(500);
            } else {
                handle_p1(backdropref);
            }
        } else {
            handle_ai(500);
        }
    }

    const moves = history.map((gameboard, turn) => {
        return (
            <li key={turn}>
                <button
                    onMouseOver={() => jumpToHistory(turn)}
                    style={{
                        backgroundColor: turn % 2 === 1 ? "#FFCCCB" : "#90EE90",
                    }}
                >
                    Turn # {turn}
                </button>
            </li>
        );
    });

    ////////////
    // Helpers
    ////////////
    function handleCellClick(row, column) {
        if (!isGameOver) {
            if (selectedTurn % 2 == 0) {
                setColSelect(column);
                place_token_and_end_turn(column);
            }
        }
    }

    function place_token_and_end_turn(column) {
        let newBoard = currentBoard.slice();
        if (rules.place_token(column, newBoard, currentPlayer)) {
            console.log(currentPlayer + " placed column: " + column);
            setCurrentBoard(newBoard);

            // End turn
            setCurrentPlayer(otherPlayer);
            const nextHistory = [
                ...history.slice(0, selectedTurn + 1),
                rules.copy_board(newBoard),
            ];
            setHistory(nextHistory);
            setSelectedTurn(nextHistory.length - 1);
            return true;
        }
        return false;
    }

    function handle_p1(backdropref) {
        if (backdropref.current) {
            backdropref.current.style.display = "none";
        }
    }

    function handle_ai(ai_level) {
        if (backdropref.current) {
            backdropref.current.style.display = "block";
        }
        setTimeout(() => {
            let column = rules.get_monte_carlo_move_for_p1(
                currentBoard,
                currentPlayer,
                otherPlayer,
                ai_level
            );
            place_token_and_end_turn(column);
        }, 1000);
    }

    function get_other_player() {
        return currentPlayer === rules.PLAYER1 ? rules.PLAYER2 : rules.PLAYER1;
    }

    function jumpToHistory(turn) {
        setSelectedTurn(turn);
        setCurrentBoard(rules.copy_board(history[turn]));
    }

    return (
        <Layout>
            <div className={`${styles.game}`}>
                <div className={`${styles["game-div"]}`}>
                    <h1>
                        <a href="/">Connect 4</a>
                    </h1>
                </div>

                <div
                    className={`${styles["game-div"]} ${styles["game-board"]}`}
                >
                    <Board
                        current_board={currentBoard}
                        onCellClick={handleCellClick}
                    />
                </div>

                <div className={`${styles["game-div"]}`}>
                    <h2>Turn: {selectedTurn}</h2>
                    <h2>
                        Player Turn:{" "}
                        {selectedTurn % 2 === 0 ? rules.PLAYER1 : rules.PLAYER2}
                    </h2>
                </div>

                <div className={`${styles["game-div"]} ${styles["history"]}`}>
                    <ul>{moves}</ul>
                </div>

                {/* Not displayed by default */}
                <div ref={backdropref} className="backdrop">
                    <Spinner />
                </div>

                <div className="modal">
                    <h1 className="modal__title">Game!</h1>
                    <div className="modal__actions">
                        <a href="/" className="modal__action">
                            New game
                        </a>
                        <button
                            className="modal__action modal__action--continue"
                            type="button"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
