// *****************
// Interface
// *****************
let BLANK = "";
export const PLAYER1 = "Red";
export const PLAYER2 = "Green";

export function create_board(m, n) {
    let empty_board = Array.from(Array(m), () => new Array(n).fill(BLANK));
    return empty_board;
}

export function place_token(column, currentBoard, symbol) {
    if (column_is_full(currentBoard, column)) {
        return false;
    }
    // Drop the token to the bottom at the given column
    for (let r = currentBoard.length - 1; r >= 0; r--) {
        if (currentBoard[r][column] === BLANK) {
            // Place the player's token based on the turn
            currentBoard[r][column] = symbol;
            return true;
        }
    }
}

export function check_winner(board) {
    let [m, n] = [board.length, board[0].length];
    let hasWinner = false;
    let symbol = BLANK;
    let hasBlank = false;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            symbol = board[r][c];
            if (symbol != BLANK) {
                hasWinner = check_winner_helper(board, r, c, symbol);
                if (hasWinner) {
                    return true;
                }
            } else {
                hasBlank = true;
            }
        }
    }

    // Can get here when board is fully empty. No winner.
    if (hasBlank) {
        return false;
    }
    // When board is full without winner, consider this draw as a win to trigger game conclusion.
    return true;
}

export function get_ai_move(currentBoard, p1, p2) {
    let newBoard = copy_board(currentBoard);
    let placed = false;
    let column = 0;
    while (!placed) {
        column = Math.floor(Math.random() * 7);
        placed = place_token(column, newBoard, p1);
    }
    return column;
}

export function get_monte_carlo_move_for_p1(
    currentBoard,
    p1,
    p2,
    simulation_counts
) {
    let probabilities = play_n_games_per_column(
        simulation_counts,
        copy_board(currentBoard),
        p1,
        p2
    );
    let prob_str = probabilities.map( (e, i) => ("c"+i + "=" + e) ).join(', ');
    console.log(p1 + ": " + prob_str);
    let column_pick = probabilities.indexOf(Math.max(...probabilities));
    return column_pick;
}

export function copy_board(current_board) {
    let newBoard = current_board.map(function (arr) {
        return arr.slice();
    });
    return newBoard;
}

// *****************
// Helpers
// *****************
function check_winner_helper(board, r, c, symbol) {
    const win_length = 4;
    // const symbol = board[r][c];
    let h = scan_direction(board, r, c, win_length, "h", symbol);
    if (h === win_length) {
        return true;
    }
    let v = scan_direction(board, r, c, win_length, "v", symbol);
    if (v === win_length) {
        return true;
    }
    let dl = scan_direction(board, r, c, win_length, "dl", symbol);
    if (dl === win_length) {
        return true;
    }
    let dr = scan_direction(board, r, c, win_length, "dr", symbol);
    if (dr === win_length) {
        return true;
    }
    return false;
}

function scan_direction(board, r, c, l, direction, symbol) {
    let [m, n] = [board.length, board[0].length];
    // Base case: boundary check
    if (r > m - 1 || r < 0) {
        return 0;
    }
    if (c > n - 1 || c < 0) {
        return 0;
    }
    if (l === 0) {
        return 0;
    }
    if (direction === "v") {
        if (board[r][c] === symbol) {
            return (
                1 + scan_direction(board, r + 1, c, l - 1, direction, symbol)
            );
        } else {
            return 0;
        }
    }
    if (direction === "h") {
        if (board[r][c] === symbol) {
            return (
                1 + scan_direction(board, r, c + 1, l - 1, direction, symbol)
            );
        } else {
            return 0;
        }
    }
    if (direction === "dl") {
        if (board[r][c] === symbol) {
            return (
                1 +
                scan_direction(board, r + 1, c - 1, l - 1, direction, symbol)
            );
        } else {
            return 0;
        }
    }
    if (direction === "dr") {
        if (board[r][c] === symbol) {
            return (
                1 +
                scan_direction(board, r + 1, c + 1, l - 1, direction, symbol)
            );
        } else {
            return 0;
        }
    }
}

function play_n_games_per_column(n, currentBoard, p1, p2) {
    const columns_probability = [];
    const n_columns = currentBoard[0].length;
    for (let col_pick = 0; col_pick < n_columns; col_pick++) {
        if (column_is_full(currentBoard, col_pick)) {
            // -1 signals invalid placement. (Not even a probability of 0).
            columns_probability.push(-1);
        } else {
            let wins = 0;
            for (let count = 0; count < n; count++) {
                if (play_p1_to_finish(currentBoard, col_pick, p1, p2)) {
                    wins++;
                }
            }
            columns_probability.push(wins / n);
        }
    }
    return columns_probability;
}

function play_p1_to_finish(currentBoard, p1_pick, p1, p2) {
    let newBoard = copy_board(currentBoard);
    let n_columns = newBoard[0].length;

    // Board can't be played - already has a winner
    if (check_winner(newBoard)) {
        return false;
    }

    // p1 plays the given column
    let player_turn = p1;
    let placed_ok = place_token(p1_pick, newBoard, player_turn);
    if (!placed_ok) {
        return false;
    }

    // Run the game til the end
    while (!check_winner(newBoard)) {
        if (placed_ok) {
            player_turn = player_turn === p1 ? p2 : p1;
        }
        placed_ok = place_token(
            random_column(n_columns),
            newBoard,
            player_turn
        );
    }

    if (player_turn === p1) {
        return true;
    }
    return false;
}

function random_column(n_columns) {
    return Math.floor(Math.random() * (n_columns + 1));
}

function column_is_full(board, col) {
    return board[0][col] !== BLANK;
}
