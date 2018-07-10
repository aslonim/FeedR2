var articleContent = document.getElementsByClass("articleContent").addEventListener('click', openArticle);





function openArticle() {
	console.log("the current article is" , event.target); 
	
	

	
	
}






document.getElementById('my-list').addEventListener('click', function(event) {
    var clickedEl = event.target;
    if(clickedEl.tagName === 'BUTTON') {
       var listItem = clickedEl.parentNode;
       listItem.parentNode.removeChild(listItem);
    }
});