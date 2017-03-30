let showTopTen = () => {
    document.getElementById("vote").style.display = "none";
    document.getElementById("topTen").style.display = "flex";
}

let vote = () => {
    document.getElementById("vote").style.display = "flex";
    document.getElementById("topTen").style.display = "none";
}
