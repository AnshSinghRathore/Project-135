Status = "";
inputObject = "";
Objects = [];

function preload()
{
}

function setup()
{
     canvas = createCanvas(580,480);
     canvas.center();
     video = createCapture(VIDEO);
     video.hide();
}

function start()
{
     objectDetector = ml5.objectDetector("cocossd", modelLoaded);
     document.getElementById("status").innerHTML = "Status : Detecting Objects";
     inputObject = document.getElementById("input").value;
}

function modelLoaded()
{ 
    console.log("Model Loaded");
    Status = true;
}

function gotResults(error, results)
{
    if(error)
    {
     console.error(error);
    }
    else
    console.log(results);
    Objects = results;
}

function draw()
{
     image(video, 0, 0, 580, 480);
     if(Status != "")
     { 
         objectDetector.detect(video, gotResults);
         for(i=0; i<Objects.length; i++)
         {

              fill("#FF0000");
              percent = floor(Objects[i].confidence * 100);
              text(Objects[i].label +" "+ percent +"%", Objects[i].x + 15, Objects[i].y + 15);
              stroke("FF0000");
              noFill();
              rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
              if(Objects[i].label == inputObject)
              {
               video.stop();
               objectDetector.detect(gotResults);
               document.getElementById("status").innerHTML = "Object Found";
               synth = window.SpeechSynthesis;
               utterThis = new SpeechSynthesisUtterance(inputObject + " Found ");
               synth.speak(utterThis);
              }
              else
              {
               document.getElementById("status").innerHTML = "Object Not Found";
              }

         }
     }
}

