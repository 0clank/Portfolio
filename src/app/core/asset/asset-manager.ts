import {EventDispatcher, LoadingManager, Texture, TextureLoader} from "three";

export class AssetManager extends EventDispatcher {

  private readonly _texMap: Map<string, Texture>;
  private readonly _manager: LoadingManager;
  private readonly _texLoader: TextureLoader;

  private static instance: AssetManager;

  private constructor() {
    super();
    this._manager = new LoadingManager();
    this._texLoader = new TextureLoader(this._manager);
    this._texMap = new Map<string, Texture>();
    this._manager.onLoad = () => {
      this.onLoaded();
    }
  }

  private onLoaded(): void {
    this.dispatchEvent({type: 'asset:manager:loaded', target: ''});
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }

    return AssetManager.instance;
  }

  public loadImage(id: string, url: string) {
    new TextureLoader(this._manager).load(url, (tex) => {
      this._texMap.set(id, tex);
    })
  }

  public getAssetById(id: string): Texture | null {
    return this._texMap.get(id) || null
  }

}
