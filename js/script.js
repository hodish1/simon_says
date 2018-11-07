var r_array =new Array();//random array.
var u_array=new Array();//user array.
var u_index=0;//user index to compare array's element.
var score=0;// wins.
var sounds=['a0','a1','a2','a3','a4','a5','a6','a7','a8','a9'];//array holds sound.
var is_newGame=false;
var playing_sounds=false;



/**This function starts a new round**/
function start_game()
{   
    
    is_newGame=true;
    document.getElementById('start').style.backgroundImage="url('mobile/start_button-pressed.png')";
    setTimeout(function(){
    document.getElementById('start').style.backgroundImage="url('mobile/start_button-unpressed.png')";
    }, 100);
    score=0;
    u_index=0;
    u_array=[];
    r_array=[];
    document.getElementById("score").innerHTML="Your Score: "+score;
    addRandomToArray();    
    showMoves();
}

/**This function called when the player is playing**/
function in_game()
{  
	playing_sounds=true; 
    addRandomToArray();    
    showMoves();
	
}

/**Adds another random number to r_array**/
function addRandomToArray()
{
    r_array.push(Math.floor(Math.random()*9));
}

/**Let the computer play the array**/
function showMoves() 
{
	
  var i = 0;
  var moves = setInterval(function(){//declare 'moves' to get control on setInterval
    playGame(r_array[i]);
    i++;
    if (i >=r_array.length) {
      clearInterval(moves);
	  playing_sounds=false;
    }
  }, 800)
  
}

/**Play the sounds and change colors**/
function playGame(field) 
{
        document.getElementById(field).style.backgroundImage="url('mobile/button-"+(field+1)+"-on.png')";
        play_sound(field);
        setTimeout(function(){
      document.getElementById(field).style.backgroundImage="url('mobile/button-"+(field+1)+"-off.png')";
  }, 400);
}

/**Play sound**/
function play_sound(num)
{
    document.getElementById(sounds[num]).play();
}


/**User interface and compare users input to r_array**/
function userInput(num)
{
    if(is_newGame&&(!playing_sounds)){
        u_array.push(num);
        if(u_array[u_index]==r_array[u_index])
            {
                playGame(num);
                u_index++;
            }
        else//lose
            {
				show_sheep();
                play_sound(9);
                var changeScore="Loser mheeeeee!";
                document.getElementById("score").innerHTML=changeScore;
				setTimeout(function(){document.getElementById("score").innerHTML="Score: "+ score;},1000);
                is_newGame=false;
          
            }

        if(u_index==r_array.length  && u_index!=0)//win
            {   u_index=0;
                u_array=[];
                score++;
                var changeScore="Your Score: "+score;
                document.getElementById("score").innerHTML=changeScore;
                setTimeout(in_game,300);
            }
    }
	
	else if(playing_sounds)
	{
		document.getElementById("score").innerHTML="Wait for sequence to end.";
	}
    
    else
        document.getElementById("score").innerHTML="Start Game First";
}

/**Show sheep when lose**/
function show_sheep()
{
    $('#_sheep').css('display', 'inline-block');
	setTimeout(function(){$('#_sheep').css('display', 'none');},1000);
}