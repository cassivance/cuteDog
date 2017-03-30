let showTopTen = () => {
    document.getElementById("vote").style.display = "none";
    document.getElementById("topTen").style.display = "block";
}

let vote = () => {
    document.getElementById("vote").style.display = "block";
    document.getElementById("topTen").style.display = "none";    
}