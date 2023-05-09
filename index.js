// Set up the canvas
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Set up the ball
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
const ballRadius = 10;

// Set up the paddles
const paddleHeight = 100;
const paddleWidth = 10;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 5;

// Set up the scores
let player1Score = 0;
let player2Score = 0;
const winningScore = 3;

// Move the paddles
function movePaddles() {
  if (keyIsDown(87)) {
    player1Y -= paddleSpeed;
  }
  if (keyIsDown(83)) {
    player1Y += paddleSpeed;
  }
  if (keyIsDown(UP_ARROW)) {
    player2Y -= paddleSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player2Y += paddleSpeed;
  }
}

// Update the ball position
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY < ballRadius || ballY > canvas.height - ballRadius) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX < ballRadius || ballX > canvas.width - ballRadius) {
    if (ballY > player1Y && ballY < player1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else if (ballY > player2Y && ballY < player2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      if (ballX < ballRadius) {
        player2Score++;
      } else {
        player1Score++;
      }
      resetBall();
    }
  }
}

// Reset the ball position
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.floor(Math.random() * 10) - 5;
}

// Draw everything on the canvas
function draw() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();

  context.fillStyle = "#FFFFFF";
  context.fillRect(0, player1Y, paddleWidth, paddleHeight);

  context.fillStyle = "#FFFFFF";
  context.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

  context.fillStyle = "#FFFFFF";
  context.font = "30px Arial";
  context.fillText(player1Score, canvas.width / 2 - 50, 50);
  context.fillText(player2Score, canvas.width / 2 + 25, 50);
}

// Check if someone has won
function checkWin() {
  if (player1Score >= winningScore || player2Score >= winningScore) {
    return true;
  } else {
    return false;
  }
}

// Run the game
function runGame() {
  if (checkWin()) {
    // End
    