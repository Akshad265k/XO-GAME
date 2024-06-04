document.addEventListener("DOMContentLoaded", () => {
    let turn = "X";
    let gameOver = false;

    const changeTurn = () => {
        return turn === "X" ? "O" : "X";
    };

    const boxes = document.querySelectorAll(".box");

    const resetGame = () => {
        boxes.forEach((box) => {
            box.innerText = "";
        });
        turn = "X";
        gameOver = false;
        document.querySelector(".game").innerHTML = `
            <button class="box"></button>
            <button class="box"></button>
            <button class="box"></button>
            <button class="box"></button>
            <button class="box"></button>
            <button class="box"></button>
            <button class="box"></button>
            <button class="box"></button>
            <button class="box"></button>
        `;
        initializeGame();
    };

    const checkWin = () => {
        let boxText = document.getElementsByClassName("box");
        let wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let index = 0; index < wins.length; index++) {
            const [a, b, c] = wins[index];
            if (
                boxText[a].innerText === boxText[b].innerText &&
                boxText[a].innerText === boxText[c].innerText &&
                boxText[a].innerText !== ""
            ) {
                return boxText[a].innerText;
            }
        }
        return false;
    };

    const checkDraw = () => {
        let draw = true;
        boxes.forEach((box) => {
            if (box.innerText === "") {
                draw = false;
            }
        });
        return draw;
    };

    const initializeGame = () => {
        document.querySelectorAll(".box").forEach((box) => {
            box.addEventListener("click", () => {
                if (!box.innerText && !gameOver) {
                    box.innerText = turn;
                    let winner = checkWin();
                    if (winner) {
                        document.querySelector(".game").innerHTML = `<h1>Winner is ${winner}</h1>`;
                        gameOver = true;
                    } else if (checkDraw()) {
                        document.querySelector(".game").innerHTML = `<h1>It's a Draw!</h1>`;
                        gameOver = true;
                    } else {
                        turn = changeTurn();
                    }
                }
            });
        });
    };

    initializeGame();

    document.getElementById("new").addEventListener("click", resetGame);
});
