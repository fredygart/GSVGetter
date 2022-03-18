var pIDs = ["GaqmNOrvJK4I5alXaq-THg","BN7XzbnJINOvLy_YJtrtoQ","N7yY_C93TOBrY7OJpPnK3Q","b3-EalEDM9UBsHIFxN00ig","qH5j52IfcQ937Q6H3F1JcA","i3z0kpfz7va-pFK7JE3GJg","SRFeo-OlDKxdqLkoJAxf4A","UIguM5XkGQ5N9OO5jPtJpQ","q_dhTS2mp047z-6DKubKyA","z2bn5a8YZIfoHFzwHRbEWg","F0huJjqPyC1xL34rSdcjXw","g_aiRmUNrqxR_YfC7sOUGw","OE1nySvYw3gmD7fnt_cn1A","kddQcHb8xQRS7RryObNs6g","PJQirgpwVUZTMmCoL7rsrA","oT7kR5VvGOrGspQ3OmL87g","hqxeOP80Fia30UzCU8dgEw","9GcMY5V_Lgq3sNxNH0zblg","9w7h115sFriwNXHmqYDAcQ","v1QitDRsAZN5XIWaVN6hEw","YOirhxzfYsI18MpMQN7EoQ","X_WbVkdg3Pip0ufFZYVHtQ","UL-n08FwdqBtIth_7ZMzjw","6FdzjaosyMP1ap8qre8Lrw","tsxQAcWq7a0ifjlYBneLiw","D4tTZxAizFs5JNuZZA--qQ","VnU7tgDIYDBlLMRleMF7jQ","jM3BgRbQt-upZASEk6Lrgw","CtS9b4kzOcZxDqj4dFMCAw","8rsm2YBiUMNAzCXh9sXSXA","SxFLot30ONCXsDAmUaTQsw","gorfSfeYRx3kltzgQ0euxQ","V71Zjtw6gXW6h1uI90_9yg","ZSAZ9lLfurHWNT2cUj7j9w"];

var bodyDoc = document.getElementById("bodyDoc");
var spinnerE = document.getElementById("spinnerE");
var loadImageBtn = document.getElementById("loadImageBtn");
var myBar = document.getElementById("myBar");
var progEls = document.getElementById("progEls");
var myRangeW = document.getElementById("myRangeW");
var myRangeH = document.getElementById("myRangeH");
var demoW = document.getElementById("demoW");
var demoH = document.getElementById("demoH");
var applyCropBtn = document.getElementById("applyCropBtn");
var cropPosX = document.getElementById("cropPosX");
var cropPosY = document.getElementById("cropPosY");
var btnsContainer = document.getElementById("btnsContainer");
var cropBtn = document.getElementById("cropBtn");
var cropControls = document.getElementById("cropControls");
var displayCropCtrls = false;
var canvasImageFit = true;
var dCW, cINW, dCH, cINH;

var progloadN = 0;
var progloadL = 0;
var startPanoID = 0;
	
function getDrawImages(){
spinnerE.style.display = "block";
progEls.style.display = "block";
document.getElementById('canvas').width = 2048; document.getElementById('canvas').height = 1024;
var currentImages = document.querySelectorAll(".imgsxd");
for(var x=0; x < currentImages.length; x++){
	currentImages[x].remove();
}
panoid = (startPanoID == 1) ? idField.value : pIDs[Math.floor(Math.random()*pIDs.length)];
noPic = panoid.length == 22;
pEI = (noPic) ? {e:2,i:4}:{e:4,i:8};
if(panoid.length > 22){document.getElementById('canvas').width = 4096; document.getElementById('canvas').height = 2048;}
for (var e = 0; e < pEI.e; e++) { for (var i=0; i < pEI.i; i++) { if(noPic){ bodyDoc.innerHTML += "<img class='imgsxd' crossOrigin='anonymous' src='https://streetviewpixels-pa.googleapis.com/v1/tile?cb_client=maps_sv.tactile&panoid=" + panoid + '&x=' + i + '&y=' + e + "&zoom=2'>" ; } else { bodyDoc.innerHTML += "<img class='imgsxd' crossOrigin='anonymous' src='https://lh3.ggpht.com/p/" + panoid + '=x' + i + '-y' + e + "-z3'>" ; } } }
startPanoID = 1;
progLoad();
document.getElementById('id01').style.display='none';
}
	
getDrawImages();

var canvasImage = document.getElementById("canvasImage");	
var contentDivB = document.getElementById("contentDivB");
var rotIcon = document.getElementById("rotIcon");
var idField = document.getElementById("idField");
	
canvasImage.style.width = "100%";

var canvas = document.getElementById('renderCanvas');
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
	return new BABYLON.Engine(canvas, true, {
	  preserveDrawingBuffer: true,
	  stencil: true,
	  disableWebGL2Support: false,
	});
};

var panoURL = '';
var createScene = function () {
var scene = new BABYLON.Scene(engine);
var camera = new BABYLON.ArcRotateCamera( 'Camera', -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);
camera.inputs.attached.mousewheel.detachControl(canvas);

var doPano3DB = true;
var dome;
doPano3D = function () {
engine.resize();
	if (doPano3DB) {
	dome = new BABYLON.PhotoDome('testdome', panoURL, { resolution: 32, size: 1000, useDirectMapping: false, }, scene);
	dome.fovMultiplier = 2;
	doPano3DB = false;
	} else {
	dome.photoTexture.updateURL(panoURL);
	}
};

return scene;
};

window.initFunction = async function () {
var asyncEngineCreation = async function () { try { return createDefaultEngine(); } catch (e) { console.log( 'the available createEngine function failed. Creating the default engine instead' ); return createDefaultEngine(); } };

window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
window.scene = createScene();
};
initFunction().then(() => {
sceneToRender = scene;
	engine.runRenderLoop(function () {
		if (sceneToRender && sceneToRender.activeCamera) {
		sceneToRender.render();
		}
	});
});

window.addEventListener('resize', function () { engine.resize(); });

canvasImage.onclick = function(){
dCW = document.documentElement.clientWidth;
dCH = document.documentElement.clientHeight;
cINW = canvasImage.naturalWidth;
cINH = canvasImage.naturalHeight;
canvasImageFit = !canvasImageFit;
	if(canvasImageFit){
		this.removeAttribute("style");
		this.style.width = "100%";
	} else {
		this.removeAttribute("style");
		this.style.width = this.naturalWidth;
		this.setAttribute("style","position:fixed;");
	}
}

document.body.onmousemove = function(event){
	canvasImage.style.left = -(event.clientX*((cINW-dCW)/dCW))+"px";
	canvasImage.style.top = -(event.clientY*((cINH-dCH)/dCH))+"px";
}

function progLoad(){
var pCurrentImages = document.querySelectorAll(".imgsxd");
progloadN = 0;
progloadL = pCurrentImages.length;
progloadCounter.innerText = "progloadL: "+progloadL+" | progloadN: "+progloadN;

	for(var x=0; x < pCurrentImages.length; x++){
		pCurrentImages[x].onload = function(){
		progloadN++;
		progloadCounter.innerText = "progloadL: "+progloadL+" | progloadN: "+progloadN;
		myBar.style.width = progloadN*100/progloadL+"%";
		myBar.innerText = progloadN*100/progloadL+"%";
		if(progloadN == progloadL){draw();}
		}
	}
}

	function randomIdToValue(){
	idField.value = pIDs[Math.floor(Math.random()*pIDs.length)];
	loadImageBtn.click();
	}
	
myRangeW.oninput = function() {
demoW.innerHTML = this.value;
cropPosX.style.left = (this.value/(document.getElementById('canvas').width/document.getElementById("canvasImage").width)+20)+"px";
cropPosX.style.height = document.getElementById("canvasImage").height+"px";
}
myRangeH.oninput = function() {
demoH.innerHTML = this.value;
cropPosY.style.top = (this.value/(document.getElementById('canvas').height/document.getElementById("canvasImage").height)+(btnsContainer.clientHeight+20))+"px";
cropPosY.style.width = document.getElementById("canvasImage").width+"px";
}
	
cropBtn.onclick = function(){
displayCropCtrls = !displayCropCtrls;
if(displayCropCtrls){
cropControls.style.display = "block";
cropPosX.style.opacity = 1;
cropPosY.style.opacity = 1;
} else {
cropControls.style.display = "none";
cropPosX.style.opacity = 0;
cropPosY.style.opacity = 0;
}
}

function crop(w,h) {
  document.getElementById('canvas').width = w;
  document.getElementById('canvas').height = h;
  draw();
  to3D();
}

applyCropBtn.onclick = function(){
crop(myRangeW.value, myRangeH.value);
contentDiv.scrollIntoView();
cropBtn.click();
}

function download() {
var link = document.createElement('a');
link.download = 'file.jpg';
link.href = document.getElementById("canvasImage").src;
link.click();
}

function to3D() {
document.getElementById('canvas').style.display = 'none';
document.getElementById('renderCanvas').style.display = 'block';
panoURL = document.getElementById("canvasImage").src;
doPano3D();
rotIcon.style.display = "block";
viewBtnMsg.style.display = "none";
}

function draw() {
var canvasA = document.getElementById('canvas');
var ctx = canvasA.getContext('2d');
var tileN = 0;
for (var cy = 0; cy < pEI.e; cy++) {
  for (var c = 0; c < pEI.i; c++) {
    var image = document.querySelectorAll(".imgsxd")[tileN];
    ctx.drawImage(image, 0, 0, 512, 512, c * 512, cy * 512, 512, 512);
    tileN++;
  }
}
window.scroll(0,0);
document.getElementById("canvasImage").src = canvasA.toDataURL('image/jpeg', 1.0);
to3D();
spinnerE.style.display = "none";
progEls.style.display = "none";
myRangeW.max = canvasA.width;
myRangeH.max = canvasA.height;
}