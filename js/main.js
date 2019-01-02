  var scene = new THREE.Scene();
  var aspect = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, 10 );
  scene.add( light );

  // var geometry_plane = new THREE.PlaneGeometry( 1, 1, 1 );
  // var material_plane = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide} );
  // var object = new THREE.Mesh( geometry_plane, material_plane );
  // scene.add( object );

  var geobox = new THREE.BoxGeometry( 2, 2, 2 );
  var matbox = new THREE.MeshPhongMaterial( { shininess: 30.0, side: THREE.DoubleSide} );
  var object = new THREE.Mesh( geobox, matbox );
  scene.add( object );

  camera.position.z = 5;
  camera.position.y = 1;

  var render = function () {
  requestAnimationFrame( render );
  object.rotation.x += 0.02;
  object.rotation.y += 0.01;
  renderer.render( scene, camera );
};

render();
