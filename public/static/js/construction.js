function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("img").src = images[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById("img").src = images[x];
}

function startTimer() {
    setInterval(displayNextImage, 500);
}

var images = [], x = -1;
images[0] = "/images/images-1.png";
images[1] = "/images/images-2.png";
images[2] = "/images/images-3.png";