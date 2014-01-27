
 scrambleBox = {
	
	posX:0,
	posY:0,

	width:0,
	height:0,
	
	context:-1,

	correctList: ["CRONYISM","ABUSE"],

	wordList:[],
	selectedIndex:[],

	score:0,
	total:2,
	
	setParam: function(w,h,x,y)
	{	
		this.width = w;
		this.height = h;

		this.posX = x;
		this.posY = y;
	},

	setWordList: function(wordlist)
	{
		this.wordList=wordlist;
	},
	
	setContext: function(context)
	{
		this.context = context;
	},

	draw: function()
	{	

		for(x=0;x<8;x++)
		{
			for(y=0;y<8;y++)
			{
				this.context.fillStyle="#9e97f1";
				this.context.fillRect(this.posX+x*this.width+1,this.posY+y*this.height+1,this.height-1,this.width-1);			

				this.context.fillStyle="#fff";
				this.context.font= "20px Georgia";
				this.context.fillText(String(wordList[x][y]),this.posX+x*this.width+ (this.width/2) - 3 ,this.posY+y*this.height + (this.height/2) +3);
			}
		}	
	
	},

	removeStr: function(list,word)
	{
		fina =[];

		for(i=0;i<list.length;i++)
		{
			if(list[i] != word)
				fina.push(list[i]);
		}

		return fina;

	},

	getXY: function(event){
    	canvas = document.getElementById("myCanvas");
    	


    	x = event.x;
    	y= event.y;

    	if(x == undefined && y == undefined)
    	{
    		x = event.clientX+document.body.scrollLeft;//+ document.documentElement.scrollLeft;
    		y = event.clientY+document.body.scrollTop;// + document.documentElement.scrollTop;

/*    		x = event.clientX+ document.documentElement.scrollLeft;
    		y = event.clientY+ document.documentElement.scrollTop;*/
    	}

    	x -=canvas.offsetLeft;
    	y -=canvas.offsetTop;
    	//console.log("here: " + x + ", " + y);
    	return [x,y];
	},


	checkMouse: function(event)
	{


		pos= this.getXY(event);
		x=pos[0]-this.posX;
		y=pos[1]-this.posY;

		indexX = Math.floor(x/this.width);
		indexY = Math.floor(y/this.height);
		// console.log("posX: "+x+", posY:"+y);
		// console.log("posX: "+indexX+", posY:"+indexY);
/*		if( this.wordList[indexX][indexY]==undefined ){
			
			return;
		}*/

		if( (x < 0 || y < 0) || (x > this.width*8 || y > this.height*8) ){
			//this.cleanSel();
			//this.calculate();
			this.cleanSel();
			return;
		}



		// console.log("posX: "+pos[0]+", posY:"+pos[1]);
		// console.log(this.wordList[indexX][indexY]);
		var nowIndex = [indexX, indexY];
		if( !this.inArray(nowIndex, this.selectedIndex) ){

			
			this.selectedIndex.push([indexX,indexY]);

			// console.log("SI: "+this.selectedIndex);
			// if(Math.abs(selectedIndex[selectedIndex.length-1][0] - selectedIndex[selectedIndex.length -2 ][0]) )
			if(this.selectedIndex.length<1 && ( Math.abs(this.selectedIndex[this.selectedIndex.length-2][0] - indexX)>1 || Math.abs(this.selectedIndex[this.selectedIndex.length-2][1] - indexY)>1 ) )
			{
				this.selectedIndex.pop();
				this.calculate();

				return;
			}

			this.context.fillStyle="#f19fae";
			this.context.fillRect(this.posX+indexX*this.width+1,this.posY+indexY*this.height+1,this.height-1,this.width-1);			

			this.context.fillStyle="#fff";
			this.context.font= "20px Georgia";
			this.context.fillText(String(wordList[indexX][indexY]),this.posX+indexX*this.width+ (this.width/2) - 3 ,this.posY+indexY*this.height + (this.height/2) +3);



		}

	},

	calculate: function() //main process
	{
		var words=[];
		for (i=0; i<this.selectedIndex.length; i++){
			x=this.selectedIndex[i][0];
			y=this.selectedIndex[i][1];
			words.push(this.wordList[x][y]);
		}
		console.log(words);
		$('#currentAnswer').html("Current: <b>"+ String(words.join("")) + "</b>" );
		this.selectedIndex=[];
		if (this.correctList.indexOf(String(words.join("")))!=-1){ // check if correct
			$("#correctAnswer").html($("#correctAnswer").html() + "<br/>"+words.join("")+"</b>");

			this.score +=10;

			$("#score").html("Score: <b>"+String(this.score)+"</b>");

			this.total -=1;


			this.correctList = this.removeStr(this.correctList,String(words.join("")));

			$("#total").html("Total: <b>"+String(this.total)+"</b>");

		}
	},
	
	cleanSel: function(){
		this.selectedIndex=[];
		this.clear();
		this.draw();
	},
	inArray: function(value, arr){
		for(i=0;i<arr.length;i++)
		{
			if( arr[i][0]==value[0] && arr[i][1]==value[1] )
				return true;
		}

		return false;
	},

	clear: function()
	{
		this.context.fillStyle="#fff";
		this.context.fillRect(0,0,500,800);
	}

};
