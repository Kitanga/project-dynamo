import { Camera, Shake } from "pixi-game-camera";
import { Application, Container } from "pixi.js";
import { getApp } from "../Utils";

export const CAMERA_CONTAINER_NAME = "camera-main";

export class CameraController {
    public static instance: CameraController | undefined;

    public static getInstance(): CameraController {
        if (!CameraController.instance) {
            CameraController.instance = new CameraController();
        }

        return CameraController.instance;
    }

    protected camera: Camera;
    protected cameraContainer!: Container;
    protected app: Application;

    private constructor() {
        this.app = getApp() as Application;

        const options = {
            ticker: this.app.ticker,
        };

        this.camera = new Camera(options);
    }

    public screenShake(intensity: number, duration: number): void {
        this.camera.effect(new Shake(this.app.stage, intensity, duration));
    }

    public resetCamera(): void {
        this.app.stage.position.set(0, 0);
    }
}
