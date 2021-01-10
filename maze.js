
function Position(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Position.prototype.toString = function() {
    return this.x + ":" + this.y;
  };
  
  function Mazing(id) {
  
    // bind to HTML element
    this.mazeContainer = document.getElementById(id);
  
    this.mazeScore = document.createElement("div");
    this.mazeScore.id = "maze_score";
  
    this.mazeMessage = document.createElement("div");
    this.mazeMessage.id = "maze_message";
  
    this.heroScore = this.mazeContainer.getAttribute("data-steps") - 2;
    this.initScore = this.heroScore;
  
    this.maze = [];
    this.heroPos = {};
    this.heroHasKey = false;
    this.childMode = false;
  
    for(i=0; i < this.mazeContainer.children.length; i++) {
      for(j=0; j < this.mazeContainer.children[i].children.length; j++) {
        var el =  this.mazeContainer.children[i].children[j];
        this.maze[new Position(i, j)] = el;
        if(el.classList.contains("entrance")) {
          // place hero at entrance
          this.heroPos = new Position(i, j);
          this.maze[this.heroPos].classList.add("hero");
        }
      }
    }
    this.initHeroPos = this.heroPos;

    var mazeOutputDiv = document.createElement("div");
    mazeOutputDiv.id = "maze_output";
  
    mazeOutputDiv.appendChild(this.mazeScore);
    mazeOutputDiv.appendChild(this.mazeMessage);
  
    mazeOutputDiv.style.width = this.mazeContainer.scrollWidth + "px";
    this.setMessage("first find the key");
  
    this.mazeContainer.insertAdjacentElement("afterend", mazeOutputDiv);
  
    // activate control keys
    this.keyPressHandler = this.mazeKeyPressHandler.bind(this);
    document.addEventListener("keydown", this.keyPressHandler, false);

  };
  
  
  Mazing.prototype.setMessage = function(text) {
    this.mazeMessage.innerHTML = text;
    this.mazeScore.innerHTML = this.heroScore;
  };
  
  Mazing.prototype.heroTakeKey = function() {
    this.maze[this.heroPos].classList.remove("key");
    this.heroHasKey = true;
    this.heroScore += 20;
    this.mazeScore.classList.add("has-key");
    this.setMessage("you now have the key!");
  };
  
  Mazing.prototype.gameOver = function(text) {
    // de-activate control keys
    document.removeEventListener("keydown", this.keyPressHandler, false);
    this.setMessage(text);
    this.mazeContainer.classList.add("gameover");
  };
  
  Mazing.prototype.WinGame = function(text) {
    // de-activate control keys
    document.removeEventListener("keydown", this.keyPressHandler, false);
    this.setMessage(text);
    this.mazeContainer.classList.add("finished");
  };

  Mazing.prototype.heroWins = function() {
    this.mazeScore.classList.remove("has-key");
    this.maze[this.heroPos].classList.remove("door");
    this.WinGame("you finished !!!");
  };
  
  Mazing.prototype.tryMoveHero = function(pos) {

    if("object" !== typeof this.maze[pos]) {
      return;
    }
  
    var nextStep = this.maze[pos].className;
  
    // before moving
    if(nextStep.match(/wall/)) {
      return;
    }
    if(nextStep.match(/exit/)) {
      if(this.heroHasKey) {
        this.heroWins();
      } else {
        this.setMessage("you need a key to unlock the door");
        return;
      }
    }
  
    // move hero one step
    this.maze[this.heroPos].classList.remove("hero");
    this.maze[pos].classList.add("hero");
    this.heroPos = pos;
  
    // after moving
    
    if(nextStep.match(/key/)) {
      this.heroTakeKey();
      return;
    }
    if(nextStep.match(/exit/)) {
      return;
    }
    if(this.heroScore >= 1) {
      this.heroScore--;
      
      if(this.heroScore <= 0) {
        this.gameOver("sorry, you didn't make it");
      } else {
        this.setMessage("...");
      }
    }
  };
  
  Mazing.prototype.mazeKeyPressHandler = function(e) {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    switch(e.keyCode)
    {
      case 37: // left
        this.mazeContainer.classList.remove("face-right");
        tryPos.y--;
        break;
  
      case 38: // up
        tryPos.x--;
        break;
  
      case 39: // right
        this.mazeContainer.classList.add("face-right");
        tryPos.y++;
        break;
  
      case 40: // down
        tryPos.x++;
        break;
  
      default:
        return;
  
    }
    this.tryMoveHero(tryPos);
    e.preventDefault();
  };
  
  