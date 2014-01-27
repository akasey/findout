
 scrambleBox = {
	
	posX:0,
	posY:0,

	width:0,
	height:0,
	
	context:-1,

	correctList: [],

	wordList:[],
	selectedIndex:[],

	score:0,
	total:2,
	dictionary:[],
	
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
	setCorrectAnswer: function(ans){
		this.correctList = ans;
	},
	setDictionary: function(dict){
		this.dictionary = dict;
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
	   if(event.offsetX) {
	        x = event.offsetX;
	        y = event.offsetY;
	    }
	    else if(e.layerX) {
	        x = event.layerX;
	        y = event.layerY;
	    }
    	return [x,y];    	
	},


	checkMouse: function(event)
	{


		pos= this.getXY(event);
		x=pos[0]-this.posX;
		y=pos[1]-this.posY;

		indexX = Math.floor(x/this.width);
		indexY = Math.floor(y/this.height);

		if( (x < 0 || y < 0) || (x > this.width*8 || y > this.height*8) ){
			this.cleanSel();
			return;
		}

		var nowIndex = [indexX, indexY];
		if( !this.inArray(nowIndex, this.selectedIndex) ){

			
			this.selectedIndex.push([indexX,indexY]);

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
		$('#currentAnswer').html("<b>Selection: </b>"+ String(words.join("")) );
		this.selectedIndex=[];
		if (this.correctList.indexOf(String(words.join("")))!=-1){ // check if correct
			$("#correctAnswer").html($("#correctAnswer").html() + 
				"<tr>" +
                "<td><b>" + words.join("") + "</b></td>" +
                "<td><em>" + this.dictionary[words.join("").toLowerCase()] + "</em></td>" +
                "</tr>"
                );

			this.score +=10;

			$("#score").html("Score: <b>"+String(this.score)+"</b>" + " <em style='color:red;'> Scroll down</em>");

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
