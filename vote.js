const rating_container = document.querySelector('.rating__');
rating_container.insertAdjacentHTML('beforeend',`<div class="container rating_container">
<span class="heading">User Rating</span>
<span id="rating_button">
	<input type="radio" name="rating" value="1" class="fa fa-star" id="rate_1"></input>
	<input type="radio" name="rating" value="2" class="fa fa-star" id="rate_2"></input>
	<input type="radio" name="rating" value="3" class="fa fa-star" id="rate_3"></input>
	<input type="radio" name="rating" value="4" class="fa fa-star" id="rate_4"></input>
	<input type="radio" name="rating" value="5" class="fa fa-star" id="rate_5"></input>
</span>
<p>
<div id="avg_star" style="display: inline"></div> average based on
<div id="review_nos" style="display: inline"></div> reviews.</p>
<hr style="border:3px solid #f1f1f1">

<div class="row">
	<div class="side">
		<div>5 star</div>
	</div>
	<div class="middle">
		<div class="bar-container">
			<div class="bar-5"></div>
		</div>
	</div>
	<div class="side right">
		<div id="no_rate_5">150</div>
	</div>
	<div class="side">
		<div>4 star</div>
	</div>
	<div class="middle">
		<div class="bar-container">
			<div class="bar-4"></div>
		</div>
	</div>
	<div class="side right">
		<div id="no_rate_4">63</div>
	</div>
	<div class="side">
		<div>3 star</div>
	</div>
	<div class="middle">
		<div class="bar-container">
			<div class="bar-3"></div>
		</div>
	</div>
	<div class="side right">
		<div id="no_rate_3">15</div>
	</div>
	<div class="side">
		<div>2 star</div>
	</div>
	<div class="middle">
		<div class="bar-container">
			<div class="bar-2"></div>
		</div>
	</div>
	<div class="side right">
		<div id="no_rate_2">6</div>
	</div>
	<div class="side">
		<div>1 star</div>
	</div>
	<div class="middle">
		<div class="bar-container">
			<div class="bar-1"></div>
		</div>
	</div>
	<div class="side right">
		<div id="no_rate_1">20</div>
	</div>
</div>

</div>
`);

var radios = document.querySelectorAll('#rating_button input[type=radio]');
var output = document.querySelector('#star_rating output');
var bar1 = document.querySelector('.bar-1');
var bar2 = document.querySelector('.bar-2');
var bar3 = document.querySelector('.bar-3');
var bar4 = document.querySelector('.bar-4');
var bar5 = document.querySelector('.bar-5');
var display_rate1 = document.getElementById('no_rate_1');
var display_rate2 = document.getElementById('no_rate_2');
var display_rate3 = document.getElementById('no_rate_3');
var display_rate4 = document.getElementById('no_rate_4');
var display_rate5 = document.getElementById('no_rate_5');
var avg_star = document.getElementById('avg_star');
var review_nos = document.getElementById('review_nos');

// Initial rating number, user rating
var rates = document.querySelector('.rating__').getAttribute('rates');
var rates = rates.split("-").map(x=>+x);
console.log(rates);
var user_rating = null;

var total_ratings = rates.reduce((a, b) => a + b, 0); 

avg_star.innerHTML = ((rates[0]*1+rates[1]*2+rates[2]*3+rates[3]*4+rates[4]*5)/total_ratings).toFixed(2);

bar1.setAttribute("style", `width: ${(rates[0] / total_ratings)*100}%;`);
bar2.setAttribute("style", `width: ${(rates[1] / total_ratings)*100}%;`);
bar3.setAttribute("style", `width: ${(rates[2] / total_ratings)*100}%;`);
bar4.setAttribute("style", `width: ${(rates[3] / total_ratings)*100}%;`);
bar5.setAttribute("style", `width: ${(rates[4] / total_ratings)*100}%;`);

display_rate1.innerHTML=rates[0];
display_rate2.innerHTML=rates[1];
display_rate3.innerHTML=rates[2];
display_rate4.innerHTML=rates[3];
display_rate5.innerHTML=rates[4];

// Iterate through all radio buttons and add a click
// event listener to the button
Array.prototype.forEach.call(radios, function(el, i){
	// var label = el.nextSibling.nextSibling;
	el.addEventListener("click", function(event){
		var node1 = el;
		var node2 = el.nextElementSibling;
		while(node1!=null){
			node1.classList.add("checked");
			node1 = node1.previousElementSibling;
		}
		while(node2!=null){			
			node2.classList.remove("checked");
			node2 = node2.nextElementSibling;
		}
		if(user_rating!=null){
			rates[user_rating-1]--;
		}
		var rating = el.value;
		user_rating = rating;
		rates[rating-1]++;
		console.log(rates);

		total_ratings = rates.reduce((a, b) => a + b, 0); 
		var rate1 = rates[0] / total_ratings;
		var rate2 = rates[1] / total_ratings;
		var rate3 = rates[2] / total_ratings;
		var rate4 = rates[3] / total_ratings;
		var rate5 = rates[4] / total_ratings;
		
		bar1.setAttribute("style", `width: ${rate1*100}%;`);
		bar2.setAttribute("style", `width: ${rate2*100}%;`);
		bar3.setAttribute("style", `width: ${rate3*100}%;`);
		bar4.setAttribute("style", `width: ${rate4*100}%;`);
		bar5.setAttribute("style", `width: ${rate5*100}%;`);
		
		display_rate1.innerHTML=rates[0];
		display_rate2.innerHTML=rates[1];
		display_rate3.innerHTML=rates[2];
		display_rate4.innerHTML=rates[3];
		display_rate5.innerHTML=rates[4];
		
		avg_star.innerHTML = ((rates[0]*1+rates[1]*2+rates[2]*3+rates[3]*4+rates[4]*5)/total_ratings).toFixed(2);

	});
});

