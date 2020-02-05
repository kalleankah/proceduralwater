uniform vec3 lightPos;
uniform vec3 eyePos;

varying vec4 worldPos

void main(){

   gl_FragColor = vec4(abs(worldPos));

}