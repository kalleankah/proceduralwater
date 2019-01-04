  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth-1, window.innerHeight-1 );
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild( renderer.domElement );

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
  var helper = new THREE.CameraHelper( light.shadow.camera );
  scene.add( helper );

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
  // // Box in the room
  // var geo_box = new THREE.BoxGeometry( 2, 2, 2 );
  // var mat_box = new THREE.MeshPhongMaterial( { shininess: 30.0, side: THREE.DoubleSide} );
  // var box1 = new THREE.Mesh( geo_box, mat_box );
  // box1.position.y = 2;
  // box1.castShadow = true;
  // scene.add( box1 );
  // box1.rotation.x += 0.02;
  // box1.rotation.y += 0.01;

  var geo_water = new THREE.PlaneGeometry( 6, 6, 128 );
  var mat_water = new THREE.MeshPhongMaterial( { shininess: 30.0, side: THREE.DoubleSide} );
  var water = new THREE.Mesh( geo_water, mat_water );
  water.position.y = 1;
  water.rotation.x = -Math.PI/2;
  water.castShadow = true;
  scene.add( water );

  //Camera settings
  camera.position.z = 8;
  camera.position.y = 5.5;
  camera.rotation.x = -Math.PI/6;

  //Render loop
  var render = function () {
  requestAnimationFrame( render );
  water.rotation.z += 0.01;
  renderer.render( scene, camera );
};

render();
