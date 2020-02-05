varying float noise;
varying float max_displacement;

void main(){

   float shade = (noise + max_displacement)/(max_displacement * 2.0);
   gl_FragColor = vec4(shade, shade, shade, 1.0);

}