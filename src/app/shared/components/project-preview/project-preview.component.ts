import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer} from "three";
import {AssetManager} from "../../../core/asset/asset-manager";

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss']
})
export class ProjectPreviewComponent implements AfterViewInit {

  @Input() assetId: string = '';
  @ViewChild('canvasElement') canvas!: ElementRef<HTMLCanvasElement>;

  private _renderer!: WebGLRenderer;
  private _scene!: Scene;
  private _camera!: OrthographicCamera;
  private _geometry!: PlaneGeometry;
  private _material!: ShaderMaterial;
  private _mesh!: Mesh;
  private _shaderScale!: Vector2;

  ngAfterViewInit(): void {

    console.log(this.canvas)

    this._scene = new Scene();
    this._camera = new OrthographicCamera(
      -0.5, 0.5, 0.5, -0.5, // bounds
      -10, 10
    );
    this._camera.position.z = 2;
    this._geometry = new PlaneGeometry(1, 1);
    this._material = new ShaderMaterial({
      uniforms: {
        uTexture: {value: AssetManager.getInstance().getAssetById(this.assetId)},
        scale: {value: new Vector2(1, 1)}
      },
      vertexShader: `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 scale;
        varying vec2 vUv;
        void main()	{
          // SCALE, background size cover
          vec2 newUV = (vUv - vec2(0.5))/scale + vec2(0.5);
          gl_FragColor = texture2D(uTexture,newUV);
        }
       `
    })
    this._shaderScale = this._material.uniforms["scale"].value;
    this._mesh = new Mesh<PlaneGeometry, ShaderMaterial>(this._geometry, this._material)
    this._scene.add(this._mesh);
    this._renderer = new WebGLRenderer({antialias: true, canvas: this.canvas.nativeElement});
    this.resize();
    this._renderer.setAnimationLoop(() => {this.onUpdate()});
    window.addEventListener("resize", () => {this.resize()});
  }

  private onUpdate() {
    this._renderer.render(this._scene, this._camera);
  }

  private resize() {
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    const viewportAspect = window.innerWidth / window.innerHeight;
    const imageWidth: number = AssetManager.getInstance().getAssetById(this.assetId)?.image.width;
    const imageHeight: number = AssetManager.getInstance().getAssetById(this.assetId)?.image.height;
    const imageAspect = imageWidth / imageHeight;
    if (imageAspect > viewportAspect) {
      this._shaderScale.set(imageAspect / viewportAspect, 1);
    } else {
      this._shaderScale.set(1, viewportAspect / imageAspect);
    }
  }
}
