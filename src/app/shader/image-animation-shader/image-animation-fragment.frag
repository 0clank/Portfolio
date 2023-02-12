uniform sampler2D   uTexture;
uniform float       uOpacity;

varying vec2        vUv;

void main() {

  gl_FragColor = texture2D( uTexture, vUv);
  if( uOpacity <= 0.0 ) { discard; }
  gl_FragColor.rgb *= uOpacity;

}
