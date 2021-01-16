window.addEventListener("DOMContentLoaded", function (e) {
    var height = parseInt(document.getElementById('maze_container').getAttribute('height'));
    var width = parseInt(document.getElementById('maze_container').getAttribute('width'));
    let Maze = new MazeBuilder(width, height);
    Maze.placeKey();
    Maze.display("maze_container");

    var maze = new Mazing("maze");

    var tryAgain = document.getElementById('try-again');

        tryAgain.addEventListener("click",tryAgainFunc);

        function tryAgainFunc(){
            maze.heroScore = maze.initScore;
            maze.setMessage("first find the key");

            maze.maze[maze.heroPos].classList.remove("hero");
            maze.mazeContainer.classList.remove("face-right");
            maze.heroPos = maze.initHeroPos;
            maze.maze[maze.initHeroPos].classList.add("hero");

            var keyPos = new Position(Maze.fr, Maze.fc);
            if(!maze.maze[keyPos].classList.contains("key")){
                maze.maze[keyPos].classList.add("key");
            };
            maze.mazeScore.classList.remove("has-key");
            document.addEventListener("keydown", maze.keyPressHandler, false);
            maze.mazeContainer.classList.remove("gameover");

        };

        var newGame = document.getElementById('new-game');
        var maze_container = document.getElementById('maze_container');

        newGame.addEventListener("click",newGameFunc);

        function  newGameFunc(){
            while (maze_container.firstChild) {
                maze_container.removeChild(maze_container.lastChild);
            }
            Maze = new MazeBuilder(16, 12);
            Maze.placeKey();
            Maze.display("maze_container");
            maze = new Mazing("maze");
        }      

}, false);

