var share_count = document.getElementById('share_count');
var count = share_count.getAttribute('value');
var share_button = document.getElementById('share_button');
share_count.innerHTML = count;
share_button.addEventListener("click",increase_share_count);

function increase_share_count(){
    share_count.innerHTML ++;
}
