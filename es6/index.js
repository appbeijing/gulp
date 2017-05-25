
var app=document.querySelector("#app");
var timer;
app.style.cssText="position:absolute; top:0;left:0;margin:0";
timer=setInterval(function(){
		var styles=window.getComputedStyle(app,null);
		var posVal=parseInt(styles.top);
		posVal++;
		if(posVal>100){
			clearInterval(timer)
		}
		app.style.top=posVal+"px";
		app.style.left=posVal+"px";
},30)

app.addEventListener("mouseover",function(){
	clearInterval(timer)
},false);
