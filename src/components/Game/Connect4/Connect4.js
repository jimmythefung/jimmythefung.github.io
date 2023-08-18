import Board from "./Board";
import Layout from "../../UI/Layout";
import styles from "./connect4.module.css";
import { useEffect, useState } from "react";
// import * as utils from "../../scripts/utils.js";
import * as rules from "../../scripts/c4rules.js";

export default function Connect4({ m, n }) {
    const [currentBoard, setCurrentBoard] = useState(rules.create_board(m, n));
    const [col_select, setColSelect] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(rules.PLAYER1);
    let otherPlayer = get_other_player();
    let isGameOver = rules.check_winner(currentBoard);
    let p1UsesAI = false;

    // Check winner
    if (isGameOver) {
        let msg = "Victory: " + otherPlayer;
        // utils.openModal(msg);
        alert(msg);
    } else {
        // Game continues
        if (currentPlayer === rules.PLAYER1) {
            if (p1UsesAI) {
                handle_ai(500);
            } else {
                handle_p1();
            }
        } else {
            handle_ai(500);
        }
    }

    function handleCellClick(row, column) {
        if (!isGameOver) {
            setColSelect(column);
            place_token_and_end_turn(column);
        }
    }

    function place_token_and_end_turn(column) {
        let newBoard = currentBoard.slice();
        if (rules.place_token(column, newBoard, currentPlayer)) {
            console.log(currentPlayer + " placed column: " + column);
            setCurrentBoard(newBoard);

            // End turn
            setCurrentPlayer(otherPlayer);
            return true;
        }
        return false;
    }

    function handle_p1() {
        if (typeof window !== "undefined") {
            var backdrop = document.querySelector(".backdrop");
            // backdrop.style.display = "none";
        }
    }

    function handle_ai(ai_level) {
        if (typeof window !== "undefined") {
            var backdrop = document.querySelector(".backdrop");
            // backdrop.style.display = "block";
        }

        setTimeout(() => {
            // let column = rules.get_ai_move(currentBoard, currentPlayer, otherPlayer);
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

    return (
        <Layout>
            <div className={`${styles.game}`}>
                <div className={`${styles["game-div"]}`}>
                    <h1>
                        <a href="/">Connect 4</a>
                    </h1>
                </div>

                <div className={`${styles["game-div"]}`}>
                    <Board
                        current_board={currentBoard}
                        onCellClick={handleCellClick}
                    />
                </div>

                <div className={`${styles["game-div"]}`}>
                    <h2>Player Turn: {currentPlayer}</h2>
                </div>

                {/* Not displayed by default */}
                <div className="backdrop"></div>

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
