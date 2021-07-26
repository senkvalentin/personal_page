/*
Project: map3dto2d
Author:  Valentin Senk
Date:    26.  07. 2021
*/
'use strict';

//-------------------------
window.onload = function(){
  //access canvas and its context
  var canvas = document.getElementById("myCanvas");
  let outputVert = document.getElementById("outputVert");
  var ctx = canvas.getContext("2d");
  
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
  
  //set initial angles for cubes position
  var Qx=Math.PI/4;
  var Qy=Math.PI/3;
  var Qz=Math.PI/4;
  var dx=0;
  var dy=0;
  var dz=0;
  
  //length of the cube edges
  var SIZE=75;
  //array that will hold all the cube vertices
  var vertices=[];
  
  //utility function
  function addPoint(x,y,z) {
    return [x,y,z];
  }
  
  //create the vertices of the cube and put them in their array
  vertices.push(addPoint(SIZE,SIZE,SIZE));
  vertices.push(addPoint(-SIZE,SIZE,SIZE));
  vertices.push(addPoint(-SIZE,-SIZE,SIZE));
  vertices.push(addPoint(SIZE,-SIZE,SIZE));
  
  vertices.push(addPoint(SIZE,SIZE,SIZE));
  vertices.push(addPoint(SIZE,SIZE,-SIZE));
  vertices.push(addPoint(-SIZE,SIZE,-SIZE));
  vertices.push(addPoint(-SIZE,-SIZE,-SIZE));
  
  vertices.push(addPoint(SIZE,-SIZE,-SIZE));
  vertices.push(addPoint(SIZE,SIZE,-SIZE));
  vertices.push(addPoint(SIZE,-SIZE,-SIZE));
  vertices.push(addPoint(SIZE,-SIZE,SIZE));
  
  vertices.push(addPoint(-SIZE,-SIZE,SIZE));
  vertices.push(addPoint(-SIZE,-SIZE,-SIZE));
  vertices.push(addPoint(-SIZE,SIZE,-SIZE));
  vertices.push(addPoint(-SIZE,SIZE,SIZE));
  
  drawCube();
  
  //event listener on the keyboard
  window.addEventListener("keydown", checkIfKeyPressed, false);
  
  //check if up down right left a z keys have been pressed
  //increment or decrement the respective x,y,z rotational parameters
  function checkIfKeyPressed(e) {
    var step=Math.PI/4320;
    
    if (e.keyCode == "39") {//right key
      dy=dy+step;
        
    } else if(e.keyCode == "37") {//left key
      dy=dy-step;
            
    } else if (e.keyCode == "40") {//up key
      dx=dx+step;
            
    } else if(e.keyCode == "38") {//down key
      dx=dx-step;
            
    }  else if (e.keyCode=="65") {//a key
      dz=dz+step;
            
    } else if (e.keyCode=="90") {//z key
      dz=dz-step;
            
    }
    
    e.preventDefault();//in case up down accidentally interpreted for scrolling
    updateCube();
      
      
  
  }
  
  //function that updates the cube 
  function updateCube(){
    var rate=0.999;//this parameter is responsible for the slow dying off effect of rotations
    
    dx=rate*dx;
    Qx=Qx+dx;
    dy=rate*dy;
    Qy=Qy+dy;
    dz=rate*dz;
    Qz=Qz+dz;
    drawCube();
        
    //console.log("Qx,Qy,Qz",Qx,Qy,Qz)
    //console.log("dx,dy,dz",dx,dy,dz)
    
    //key operation to create an animation.  This is what gives the sustaining movement.
    window.requestAnimationFrame(updateCube);
    
  }
  
  //this is the function that projects 3D coordinates to the 2D canvas
  function project3D(x,y,z) {
    var xRotQz=x*Math.cos(Qz)+y*Math.sin(Qz);
    var yRotQz=y*Math.cos(Qz)-x*Math.sin(Qz);
    var zRotQz=z;
    var xRotQzQx=xRotQz;
    var yRotQzQx=yRotQz*Math.cos(Qx)+zRotQz*Math.sin(Qx);
    var zRotQzQx=zRotQz*Math.cos(Qx)-yRotQz*Math.sin(Qx);
    var xRotQzQxQy=xRotQzQx*Math.cos(Qy)+zRotQzQx*Math.sin(Qy);
    var yRotQzQxQy=yRotQzQx;
    //var zRotQzQxQy=zRotQzQx*Math.cos(Qy)-xRotQzQx*Math.sin(Qy);
    return [xRotQzQxQy,yRotQzQxQy];
  }
  
  //function that draws the cube
  function drawCube(){
    //console.log("drawCube");
    
    //these clear the canvas of previous traces
    ctx.clearRect(0,0,650,400);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,650,400);
    
    var verticesPixLoc=[];
    //vertex coordinates in 3D are first projected to 2D and then transformed into pixel location
    //this latter is needed as (0,0) of canvas is not at the center of the canvas but at upper left
    for(var i=0;i<vertices.length;i++){
      var xyLoc=project3D(vertices[i][0],vertices[i][1],vertices[i][2]);
      var pixLoc=transformXYtoPixels(xyLoc[0],xyLoc[1]);
      verticesPixLoc.push(pixLoc);
      
      //give vertices a bit of a circular shape
      ctx.beginPath();
      ctx.arc(pixLoc[0],pixLoc[1],2,0,2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fill();
      
      
    }
  
    //draw the cube edges
    for(var j=0;j<vertices.length-1;j++){
      ctx.beginPath();
      ctx.moveTo(verticesPixLoc[j][0],verticesPixLoc[j][1]);
      ctx.lineTo(verticesPixLoc[j+1][0],verticesPixLoc[j+1][1]);
      ctx.stroke();
      outputVert.innerHTML = verticesPixLoc[j][0] + '<div>' + verticesPixLoc[j][1] + '<div>' + verticesPixLoc[j+1][0] + '<div>' + verticesPixLoc[j+1][1] + '<div>'; 
    }
      
  }
  
  //this function transforms (x,y) of cartesian plane to proper pixel location of canvas with (0,0)
  //at the upper left
  function transformXYtoPixels(x,y) {
    return [x+650/2,-y+400/2];
  }
};