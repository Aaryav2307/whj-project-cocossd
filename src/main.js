img = "";
status =  "";
objects = [];

function preload(){
    img = loadImage('images.jpeg');
}

function setup(){
    canvas = createCanvas(450, 450);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting...";
}

function modelLoaded(){
    console.log("Model loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        objects = results;
    }
}


function draw(){
    image(img, 0, 0, 450, 450);
    
    if(status != ""){
        for(i = 0; i < objects.length; i++){

            document.getElementById("status").innerHTML = "Detected!!!";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y +100, objects[i].width, objects[i].height);
        }
    }
}
