var canvas = document.getElementById('testCanvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var scene    = new THREE.Scene();
var camera   = new THREE.PerspectiveCamera(25, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.z = 15;
var renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true, precision: 'lowp'});
renderer.setClearColor(0xF3F3F4);
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
	// teeth.scale.set(.08, .08, 0.08);
	teeth.scale.set(1, 1, 1);
	teeth.rotation.x = 3 * Math.PI / 2;
	teeth.rotation.z = - Math.PI / 2;
	scene.add(teeth);
	sendModelData();
});	
// -----------------------------------------------------------------------------------
function sendModelData(){
	console.log('making model data...');
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'modelThings', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function(event){
		if (xhr.readyState == xhr.DONE && xhr.status == 200){
			console.log(JSON.parse(JSON.parse(event.target.responseText).modelData));
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



