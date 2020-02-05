function ShaderLoader(vertex_url, fragment_url, onLoad, onProgress, onError) {
  var vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
  vertex_loader.setResponseType('text');
  vertex_loader.load(vertex_url, function (vertex_text) {
    var fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
    fragment_loader.setResponseType('text');
    fragment_loader.load(fragment_url, function (fragment_text) {
      onLoad(vertex_text, fragment_text);
    });
  }, onProgress, onError);
}

var start = Date.now();

// Set up scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 8;
camera.position.y = 5.5;
camera.rotation.x = -Math.PI/6;

// Set up renderer
//var renderer = new THREE.WebGLRenderer({antialias: true});
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth-20, window.innerHeight-20 );
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

// canvas resize with window function
// windowresize author: https://github.com/jeromeetienne/threex.windowresize
//var winResize	= new THREEx.WindowResize(renderer, camera);

// Light settings
var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 12, 0 );
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 100;
scene.add( light );

//Camera helper
// var helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

// Scene construction
// Room
var geo_plane_square = new THREE.PlaneGeometry( 16, 16, 1 );
var geo_plane_wide = new THREE.PlaneGeometry( 16, 8, 1 );
var mat_plane = new THREE.MeshPhongMaterial( { shininess: 30.0, side: THREE.DoubleSide} );
var plane1 = new THREE.Mesh( geo_plane_square, mat_plane );
var plane2 = new THREE.Mesh( geo_plane_wide, mat_plane );
var plane3 = new THREE.Mesh( geo_plane_wide, mat_plane );
var plane4 = new THREE.Mesh( geo_plane_wide, mat_plane );
plane1.rotation.x -= Math.PI/2;
plane2.position.z = -8;
plane2.position.y = 4;
plane3.position.x = 8;
plane3.position.y = 4;
plane3.rotation.y = Math.PI/2;
plane4.position.x = -8;
plane4.position.y = 4;
plane4.rotation.y = -Math.PI/2;
plane1.receiveShadow = true;
plane2.receiveShadow = true;
plane3.receiveShadow = true;
plane4.receiveShadow = true;
scene.add( plane1 );
scene.add( plane2 );
scene.add( plane3 );
scene.add( plane4 );

var geometry_water = new THREE.PlaneGeometry( 16, 16, 256, 256 );

// Using shader loader
ShaderLoader("shader/vertexShader.vert", "shader/fragmentShader.frag",
  function (vertex, fragment) {
    var material_water = new THREE.ShaderMaterial({

      uniforms:{
        time: { type: "f", value: 0.0 },
        lightPos: {type: "vec3", value: light.position},
        eyePos: {type: "vec3", value: camera.position},
        time: {type: "f", value: 0.0 }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    });

    var water = new THREE.Mesh(geometry_water, material_water);
    water.position.y = 1;
    water.rotation.x = -Math.PI/2;
    water.castShadow = true;
    scene.add( water );

    //Render loop
    var render = function () {
      // Give a new seed to the noise function
      material_water.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );

      //Set maximum framerate
      setTimeout( function() {
        requestAnimationFrame( render );
      }, 1000 / 15);
      renderer.render( scene, camera );
    };

    render();
  }
)