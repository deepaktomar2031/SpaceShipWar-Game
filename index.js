window.onload = function () {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

    /* Ship */
    var shipWidth = 20;
    var shipHeight = 15;
    var shipX1 = (canvas.width - shipWidth) / 2;
    var shipX2 = (canvas.width + shipWidth) / 2;
    var topX = canvas.width / 2;
    var topY;

    var delta = 0;
    var bulletRadius = 1;
    var bulletX, dx;
    var bulletY, dy = 10;

    var leftPressed = false;
    var rightPressed = false;
    var spacepressed = false;
    var spacepressedtime = 0;
    var tempX = canvas.width / 2;
    var tempY;

    var arr = [];
    var index = 0;

    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);
    // window.addEventListener("keyup", keyDownAndUpHandler, false);

    function keyDownHandler(e) {
        if (e.keyCode === 37) {
            leftPressed = true;
        } else if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 32) {
            spacepressed = true;
            arr[index] = 1;
            // console.log("11");
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode === 37) {
            leftPressed = false;
        } else if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 32) {
            // console.log("12");
            arr[index + 1] = 2;
            spacepressed = false;
            console.log(arr);
            console.log(index);
        }
    }

    function drawShip() {
            ctx.beginPath();
            ctx.fillStyle = "#0095DD";
            ctx.moveTo(topX, canvas.height - shipHeight);
            ctx.lineTo(shipX1, canvas.height);
            ctx.lineTo(shipX2, canvas.height);
            ctx.fill();
            ctx.closePath();
    }

    function moveShip() {
        if (leftPressed && shipX1 > 0) {
            shipX1 -= 5;
            shipX2 -= 5;
            topX -= 5;
        }
        if (rightPressed && shipX2 < canvas.width) {
            shipX1 += 5;
            shipX2 += 5;
            topX += 5;
        }
    }

    function createBullet() {
        if (arr[index] == 1 && arr[index + 1] == 2) {
            tempY = canvas.height - shipHeight * index;
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "black";
            ctx.fillStyle = "#0095DD";            
            ctx.arc(topX, tempY, bulletRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            index += 2;
            console.log(tempY);

        }
    }

    function shootBullet() {

        if (tempY < 0) {
            tempY = canvas.height - shipHeight;
        }
        if (arr[index] == 1 && arr[index + 1] == 2) {


            index += 2;
        }
        tempY -= 10;
        
    }

    var shipRowCount = 5;
    var shipColumnCount = 5;
    var shipPadding = 10;
    var shipOffsetTop = 30;
    var shipOffsetLeft = 25;
    var shipColor = "#FF0000";
    var ships = [];

    for (var col = 0; col < shipColumnCount; col++) {
        ships[col] = [];
        for (var row = 0; row < shipRowCount; row++) {
            ships[col][row] = {
                x: 0,
                y: 0,
                status: 1,
                color: shipColor
            };
        }
    }

    function drawEnemies() {
        for (var col = 0; col < shipColumnCount; col++) {
            for (var row = 0; row < shipRowCount; row++) {
                var ship = ships[col][row];
                if (ship.status == 1) {

                    ship.x = 300 + (col * (shipWidth + shipPadding)) + shipOffsetLeft;
                    ship.y = (row * (shipHeight + shipPadding)) + shipOffsetTop;

                    ctx.beginPath();

                    ctx.moveTo(ship.x + shipWidth / 2, ship.y + shipHeight);
                    ctx.lineTo(ship.x, ship.y);
                    ctx.lineTo(ship.x + shipWidth, ship.y);
                    ctx.fillStyle = "#FF0000";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function bulletEnemies() {
        for (var col = 0; col < shipColumnCount; col++) {
            for (var row = 0; row < shipRowCount; row++) {
                var ship = ships[col][row];
                if (ship.status == 1) {

                    ship.x = 300 + (col * (shipWidth + shipPadding)) + shipOffsetLeft;
                    ship.y = (row * (shipHeight + shipPadding)) + shipOffsetTop;

                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "#0095DD";
                    bulletX = ship.x + shipWidth / 2;
                    bulletY = ship.y + shipHeight;
                    ctx.arc(bulletX, bulletY, bulletRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function draw(dt) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawShip();
        drawEnemies();
        bulletEnemies();

        requestAnimationFrame(draw);
        createBullet();
        moveShip();
        // moveBullet();
      
    }
    draw(delta);
}