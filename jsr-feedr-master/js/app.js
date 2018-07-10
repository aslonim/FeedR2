/*
  Please add all Javascript code to this file.
*/

/*jslint es6:true*/ 
var url1 = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=be26272772cc4cde923a71f71551a530'
var req1 = new Request(url1);
fetch(req1)
    .then(function(response) {
        console.log(response.json());
    })
	
	
	
	
	
var url2 = 'https://content.guardianapis.com/search?api-key=7042ce27-f412-46bd-9b1c-7e2518dbee0c'

var req2 = new Request(url2);
fetch(req2)
    .then(function(response) {
        console.log(response.json());
    })
	
var url3 = 'https://newsapi.org/v2/top-headlines?sources=new-york-magazine&apiKey=be26272772cc4cde923a71f71551a530'
var req3 = new Request(url3);
fetch(req2)
    .then(function(response) {
        console.log(response.json());
    })
	
function getResults(jsonObject) {
	try {data = jsonObject.response.results
		console.log("I am inside getReults", data[0]);
	
	}
	catch(error) {
		try {data = jsonObject.articles}
		catch(error) {
			console.log("You messed it up");
		}
	console.log("Iam also inside getResults", data) 
	
	}
	return data;
}


function storeData(something, index) {
	var storedData = something.responseText;
	//console.log("I am inside storeData " , something.responseText);
	return getResults(storedData, index);
	
	
}

function returnPromiseData(url, templateData) {
  var promise = new Promise( function(resolve, reject) {
	var httpRequest = new XMLHttpRequest();
	console.log(url);
	httpRequest.open('GET', url);
	httpRequest.send();
	httpRequest.onload = () => resolve(getResults(JSON.parse(httpRequest.responseText)));
	httpRequest.onerror = () => reject(httpRequest.statusText);
  //console.log(httpRequest.responseText);
 // var api1 = JSON.parse(httpRequest.responseText);
  //getResults(api1, 0);
  //console.log(getResults(api1, 0));
 	  
})
promise.then(function(respondedText){
	console.log("Inside the promise" , respondedText);
	$('#main').empty();
	postBackData(respondedText, templateData);
}); 



}	
//woo so we grabbed the right info. 
//var fstGuardData = returnPromiseData(url2, 0);
//var scndGuardData = returnPromiseData(url2, 2);

//now we have to postback the data 

function postBackData(returnedData, template) {
	console.log("I am the indexted Data", returnedData[0].webTitle);
	for(var i = 0; i < 5; i++) {
	var returnedTemplate = template(returnedData[i]);
	$('#main').append(returnedTemplate)
	}
	var articleContents = document.getElementsByClassName("articleContent")
	console.log("I am article Content inside postBackData" , articleContents);
	for(var i = 0; i < articleContents.length; i++) {  
	articleContents[i].addEventListener('click', openArticle); 

};

	
	
}


var closure = document.getElementsByClassName("closePopUp");
closure[0].addEventListener("click", closeArticle); 

var readSource = document.getElementsByClassName("popUpAction");
readSource[0].addEventListener("click", goToArticle);

function goToArticle() {
	//I'm not sure what data I'm supposed to be getting from the HTML, I know it's the line " 
	//<a href="#" class="popUpAction" target="_blank">Read more from source</a>
	//but am not sure how to retrieve the "read more from source" 
	//I think it would be readSource.target but that doesn't appear to work 
	

	readSource.target = "www.google.com";
	//the above line should change the target from "_blank" to "www.google.com" which
	// the google is only a temp system it would change based on the URL of the article, which would be retrieved from teh template. 
	//google is just checkign to make i t work. 
	
	
	
	$("Read more from source").click(function(){
		window.location = returnedData.url;
		
		
	});
	//alternatively, the above anonymouse function should resulve it but doesn't. I'm really not sure how to correct this. 
}




function openArticle() {
	console.log("the current article is" , event.target); 
	var popUpContainer = document.getElementById("popUp").getElementsByClassName("container")[0];
	var popUp = document.getElementById("popUp");
	//var x = document.getElementById('footer').getElementById('copyright');
	popUpContainer.getElementsByTagName('h1')[0].innerHTML = event.target.innerHTML;
	popUp.classList.remove("hidden");
	popUp.classList.remove("loader");
	var popUpArticle = document.getElementsByClassName("container")[0].getElementsByTagName("p");
	popUpArticle.innerHTML = event.target; 
	
	
}

function closeArticle() {
	console.log("the current article is" , event.target); 
	var popUpContainer = document.getElementById("popUp").getElementsByClassName("container")[0];
	var popUp = document.getElementById("popUp");
	//var x = document.getElementById('footer').getElementById('copyright');
	popUpContainer.getElementsByTagName('h1')[0].innerHTML = event.target.innerHTML;
	popUp.classList.add("hidden");
	popUp.classList.add("loader");
	
	
}


function returnGuardianTemplate(returnedData){
	//console.log("I am inside Template", returnedData);
	var template = `<article class="article">\
		<section class="featuredImage">\
		  <img src="images/article_placeholder_1.jpg" alt="" />\
		</section>\
		<section class="articleContent">\
			<a href="#"><h3>${returnedData.webTitle}</h3></a>\
			<h6>${returnedData.sectionName}</h6>\
		</section>\
		<section class="impressions">\
		  526\
		</section>\
		<div class="clearfix"></div>\
	  </article>
`;
	return template;
	
	
}

function returnNewYorkTemplate(returnedData){
	//console.log("I am inside Template", returnedData);
	var template = `<article class="article">\
		<section class="featuredImage">\
		  <img src="images/article_placeholder_1.jpg" alt="" />\
		</section>\
		<section class="articleContent">\
			<a href="#"><h3>${returnedData.title}</h3></a>\
			<h6>${returnedData.author}</h6>\
		</section>\
		<section class="impressions">\
		  526\
		</section>\
		<div class="clearfix"></div>\
	  </article>
`;
	return template;
}


function returnBBCTemplate(returnedData) {
		var template = `<article class="article">\
		<section class="featuredImage">\
		  <img src="images/article_placeholder_1.jpg" alt="" />\
		</section>\
		<section class="articleContent">\
			<a href="#"><h3>${returnedData.title}</h3></a>\
			<h6>${returnedData.author}</h6>\
		</section>\
		<section class="impressions">\
		  526\
		</section>\
		<div class="clearfix"></div>\
	  </article>
	  `;
	return template;
	
}


function tempTester(urlVar, templateData) {
	//forLoop(returnPromiseData(i < numties+1)
	returnPromiseData(urlVar, templateData);

	
	
	
	
}






// LINE BREAK ******************************************************************

var sources = document.getElementById("sourceChanger");
sources.addEventListener("click", changeSource); 
function changeSource() {
	console.log("the current source is" , event.target.dataset.sourceurl); 
	var desiredSource = event.target.dataset.sourceurl;
	switch(desiredSource) {
		case "url1" : 
		//"BBC"
			tempTester(url1, returnBBCTemplate);
			break; 
		case "url2" : 
		//"Guardian" :
			tempTester(url2, returnGuardianTemplate);
			break;
		 
		case "url3" :
		//"New York Magazine"
			tempTester(url3, returnNewYorkTemplate);
			break; 
		
	}
	
	
	
	
	
}



tempTester(url2, returnGuardianTemplate);
/**
1, get 5 points of data all processed
2. post all 5 back. 
3. implement for 2 other apis



*/
