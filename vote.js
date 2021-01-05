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
var rates = [3,2,2,10,5]
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

