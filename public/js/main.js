class LangtonAntCanvas {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");

    this.blocks = [];
    this.blockSize = 5;

    this.ant = {
      x: 500,
      y: 250,
      currentDirection: "left",
      directions: ["up", "right", "down", "left"],
    };
  }

  init = (width, height, backgroundColor) => {
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.backgroundColor = backgroundColor;
  };

  render = () => {
    this.clearCanvas();
    this.renderAnt();
    this.rerenderBlocks();
    this.moveAnt();
    requestAnimationFrame(this.render);
  };

  initBlocks = () => {
    for (let x = 0; x < this.canvas.width; x += this.blockSize) {
      for (let y = 0; y < this.canvas.height; y += this.blockSize) {
        this.blocks.push({ x, y, color: "white" });
        this.ctx.rect(x, y, this.blockSize, this.blockSize);
      }
    }
  };

  rerenderBlocks = () => {
    for (let i = 0; i < this.blocks.length; i++) {
      this.draw(() => {
        this.ctx.rect(
          this.blocks[i].x,
          this.blocks[i].y,
          this.blockSize,
          this.blockSize
        );
      }, this.blocks[i].color);
    }
  };

  renderAnt = () => {
    this.draw(() => {
      this.ctx.rect(this.ant.x, this.ant.y, this.blockSize, this.blockSize);
    }, "red");
  };

  moveAnt = () => {
    this.moveAntByColor();
    this.moveAntByCurrentDirection();
  };

  moveAntByColor = () => {
    const { currentBlock, currentBlockIndex } =
      this.returnCurrentBlockWithItsIndex();

    switch (currentBlock.color) {
      case "white":
        this.blocks[currentBlockIndex].color = "black";
        this.changeDirection();
        break;
      case "black":
        this.blocks[currentBlockIndex].color = "white";
        this.changeDirectionReverse();
        break;
    }
  };

  moveAntByCurrentDirection = () => {
    switch (this.ant.currentDirection) {
      case "right":
        this.ant.x += this.blockSize;
        break;
      case "left":
        this.ant.x -= this.blockSize;
        break;
      case "up":
        this.ant.y -= this.blockSize;
        break;
      case "down":
        this.ant.y += this.blockSize;
        break;
    }
  };

  returnCurrentBlockWithItsIndex = () => {
    const currentBlock = this.blocks.find((block) => {
      return block.x === this.ant.x && block.y === this.ant.y;
    });

    const currentBlockIndex = this.blocks.findIndex((block) => {
      return block === currentBlock;
    });

    return { currentBlock, currentBlockIndex };
  };

  changeDirection() {
    const changedDirection =
      this.ant.directions[this.returnDirectionIndex() + 1];

    this.ant.currentDirection = changedDirection
      ? changedDirection
      : this.ant.directions[0];
  }

  changeDirectionReverse() {
    const changedDirection =
      this.ant.directions[this.returnDirectionIndex() - 1];

    this.ant.currentDirection = changedDirection
      ? changedDirection
      : this.ant.directions[this.ant.directions.length - 1];
  }

  returnDirectionIndex() {
    return this.ant.directions.findIndex((direction) => {
      return direction === this.ant.currentDirection;
    });
  }

  draw = (func, color) => {
    this.ctx.beginPath();
    func();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  };

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
}

const langtonAntCanvas = new LangtonAntCanvas();

langtonAntCanvas.init(1000, 600, "white");
langtonAntCanvas.initBlocks();
langtonAntCanvas.render();
