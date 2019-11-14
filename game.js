/******************** GAME ***********************/
var CELL_SIZE = 20;
var FPS = 6;
var WIDTH = 500;
var HEIGHT = 500;
// var MAX_PLAYER_LENGTH = 1000;
// var MAX_COM_LENGTH = 1000;

function Game(canvas_id){    
	var _level = 1;
	var _scores = 0; 
    var _pressedKey;
    var _cols = WIDTH/CELL_SIZE;
    var _rows = HEIGHT/CELL_SIZE;
  
	var _comSnake = new Snake(_cols,_rows,"blue",true);
    var _walls = [];
    var _canvas = document.getElementById(canvas_id);
    // khung
    var _context = _canvas.getContext('2d');
    _context.fillStyle = "black";
	var _fps = FPS;
    
    var _food = {};
    var _running = false;    
    var _timer;
	var _bfs;
    
    this.init = function() {                
        _canvas.width = WIDTH;
        _canvas.height = HEIGHT;
                
        _canvas.onkeydown = function(e) {
            e.preventDefault();
            if(e.keyCode == 13) // Enter key
            {                
                if(!_running)
                    startGame();
                                       
            }
            else if(_running)
            {                    
                _pressedKey = e.keyCode;
            }

            if(e.keyCode==32){
                    	guitin();
                    }     

        };        
	
        // draw the welcome screen
        _context.textAlign = "center";
        _context.font = "36px Arial";
        //_context.fillText("Canvas Snake v1.0",WIDTH/2,HEIGHT/3);
        _context.font = "26px Arial";
        _context.fillText("Press Enter to Start",WIDTH/2,HEIGHT/2);
    }
	
    function createMap(){
		for(var i=0;i<_cols;i+=2)
		{
			
			_walls[i] = [];
			_walls[i+1] = [];
			for(var j=0;j<_rows;j+=2)
			{	
				 var val = (j>4 && Math.floor(Math.random()*20)<2)?1:0;
				
				_walls[i][j] = val;
				_walls[i+1][j] = val;
				_walls[i][j+1] = val;
				_walls[i+1][j+1] = val;
			}
		}
	}
	guitin();
	function guitin(){
	for (var i = 1; i < 7; i++){	
		alert(1);  
		setTimeout(xoatn(), 1000);
	}
	}
	function xoatn(){	
	alert(2);
}
    function startGame() {
        _pressedKey = null;
        clearInterval(_timer);
		
		_comSnake.init();
		createMap();
		
		// this object is used to find the path between two points
		 _bfs = new BreathFirstSearch(_walls,_cols,_rows);
        
		createFood();
        _running = true;
        _timer = setInterval(update,200/_fps);
		
       
		
    }
 
	// }
	function update() {                            
		if(!_running)
			return;
	  
		
		  var ret ;
		if(ret==1) // player eated the food
		{
			
			createFood();
		}
		
			if(!_comSnake.path)
				_comSnake.setPath(_bfs.findPath(_comSnake.data,_comSnake.getHead(),_food),_food);
			
			ret = _comSnake.update(_walls,_food);
			if(ret==1) // com player eated the food
				createFood();
		//}
		draw(); 
		
		   
	}
    function draw(){
        
        _context.beginPath();
        _context.clearRect(0,0,WIDTH,HEIGHT);
        _context.fill();
        _context.lineWidth = CELL_SIZE;
		_context.lineCap = "square";
		_context.lineJoin = "square";


		_context.fillStyle = "gray";
		for(var i=0;i<_cols;i++)
		{
			for(var j=0;j<_rows;j++)
				{

					_context.fillRect(i*CELL_SIZE,j*CELL_SIZE,19,19);

					
						
				}
		}	

		
		_comSnake.draw(_context);
        // draw food
		_context.fillStyle = "red";

        _context.beginPath();
        _context.arc((_food.x*CELL_SIZE)+CELL_SIZE/2, (_food.y*CELL_SIZE)+CELL_SIZE/2, CELL_SIZE/2, 0, Math.PI*2, false);

        _context.fill();     
		
		
	}
    
function createFood() {
	var x = Math.floor(Math.random()*_cols);
	var y;
	do {                
		y = Math.floor(Math.random()*_rows);
	} while(_walls[x][y] || _comSnake.contain(x, y) );
	
	_food = {x: x, y: y};
	// find new path for the com player
	_comSnake.setPath(_bfs.findPath(_comSnake.data,_comSnake.getHead(),_food));
}

};