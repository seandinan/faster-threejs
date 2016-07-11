var canvas = document.getElementById('testCanvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var scene    = new THREE.Scene();
var camera   = new THREE.PerspectiveCamera(25, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.z = 15;
var renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true, precision: 'lowp'});
renderer.setClearColor(0xF3F3F4);
var newModel;
// -----------------------------------------------------------------------------------
var loader = new THREE.PLYLoader();
// loader.load('/resources/monkey.ply', function(geometry){
loader.load('/resources/20160127-111211-FinalHighColorMesh.ply', function(geometry){
	geometry.computeFaceNormals();
	geometry.center();
	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		vertexColors: THREE.VertexColors,
		side: THREE.DoubleSide
	});
	var teeth = new THREE.Mesh(geometry, material);
	teeth.scale.set(.08, .08, 0.08);
	// teeth.scale.set(1, 1, 1);
	teeth.rotation.x = 3 * Math.PI / 2;
	teeth.rotation.z = - Math.PI / 2;
	scene.add(teeth);
	var colors = JSON.stringify(teeth.geometry.colors);
	var faces = JSON.stringify(teeth.geometry.faces);
	var vertices = JSON.stringify(teeth.geometry.vertices);
	var p = document.createElement('p');
	var BSON = bson().BSON;
	var bsonText = BSON.serialize(teeth.geometry);
	console.log(bsonText);
	document.body.removeChild(canvas);
	sendModelData();
});	
// -----------------------------------------------------------------------------------
function sendModelData(){
	console.log(scene.children[0]);
	// scene.children[0].toJSON = function(){return this};
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'modelThings', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function(event){
		if (xhr.readyState == xhr.DONE && xhr.status == 200){
			newModel = JSON.parse(JSON.parse(event.target.responseText).modelData);
		}
	}
	xhr.send('modelData=' + JSON.stringify(scene.children[0]));

}
// -----------------------------------------------------------------------------------
function render(){
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};
render();



