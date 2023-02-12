import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer} from "three";
import {AssetManager} from "../../../core/asset/asset-manager";

import imageAnimationFragmentShader from '../../../shader/image-animation-shader/image-animation-fragment.frag'
import imageAnimationVertexShader from '../../../shader/image-animation-shader/image-animation-vertex.vert'

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss']
})
export class ProjectPreviewComponent implements AfterViewInit {

  @Input() assetId: string = '';
  @Input() assetHoverId: string = '';
  @ViewChild('canvasElement') canvas!: ElementRef<HTMLCanvasElement>;

  private _renderer!: WebGLRenderer;
  private _scene!: Scene;
  private _camera!: OrthographicCamera;
  private _geometry!: PlaneGeometry;
  private _material!: ShaderMaterial;
  private _mesh!: Mesh;
  private _shaderScale!: Vector2;
  private _delta: number = 1;

  ngAfterViewInit(): void {
    this._scene = new Scene();
    this._camera = new OrthographicCamera(
      -0.5, 0.5, 0.5, -0.5, // bounds
      -10, 10
    );
    this._camera.position.z = 2;
    this._geometry = new PlaneGeometry(1, 1);
    this._material = new ShaderMaterial({
      uniforms: {
        uMap: {value: AssetManager.getInstance().getAssetById(this.assetId)},
        uHoverMap: {value: AssetManager.getInstance().getAssetById(this.assetId)},
        uScale: {value: new Vector2(1, 1)},
        uTime: { value: this._delta }
      },
      vertexShader: imageAnimationVertexShader,
      fragmentShader: imageAnimationFragmentShader
    })
    this._shaderScale = this._material.uniforms["uScale"].value;
    this._mesh = new Mesh<PlaneGeometry, ShaderMaterial>(this._geometry, this._material)
    this._scene.add(this._mesh);
    this._renderer = new WebGLRenderer({antialias: true, canvas: this.canvas.nativeElement});
    this.resize();
    this._renderer.setAnimationLoop(() => {this.onUpdate()});
    window.addEventListener("resize", () => {this.resize()});
  }

  private onUpdate() {
    this._delta = this._delta * 0.001;
    this._material.uniforms["uTime"].value = this._delta;
    this._renderer.render(this._scene, this._camera);
  }

  private resize() {
    const rect = this.canvas.nativeElement.parentElement!.getBoundingClientRect();
    this._renderer.setSize(rect.width, rect.height);
    const viewportAspect = rect.width / rect.height;
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
