
function doZoom(size) {
	
	document.getElementById('zoomtext').style.fontSize=size+'px';
	
}
function setTab(m,n){
 //var tli=document.getElementById("menu"+m).getElementsByTagName("li");
 var mli=document.getElementById("main"+m).getElementsByTagName("p");
 for(i=0;i<5;i++){
	 
	mli[i].style.display = (i==n) ? "block" : "none";
	
 }
}
 