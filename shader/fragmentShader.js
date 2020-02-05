varying vec3 vPosition;
	  varying vec2 noise;
      uniform vec3 lightPos;
      uniform vec3 eyePos;
      float lol;

      void main(){

		gl_FragColor = vec4(0.65, 0.8, 1.0, 1.0) * vec4(noise.x, noise.x, noise.x, 1.0);
      }