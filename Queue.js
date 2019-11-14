function Queue(){
	var data  = [];

	this.clear = function(){
		data.length = 0;
	}

	this.getLength = function(){
		return data.length;
	}

	this.isEmpty = function(){
		return data.length == 0;
	}
//
//vào 
	this.enqueue = function(item){
		data.push(item);
	}
// ra
	this.dequeue = function(){
		if (data.length == 0) return undefined;
		return data.shift();
	}
// tra về luồng bao gồm các phần tử của queue
	this.peek = function(){
		return (data.length > 0 ? data[0] : undefined);
	}
}
