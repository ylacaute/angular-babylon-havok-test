import {Component, OnInit} from '@angular/core';
import {IPhysicsEngine} from "@babylonjs/core/Physics/IPhysicsEngine";
import HavokPhysics from "@babylonjs/havok";
import {Engine, HavokPlugin, Scene, Vector3} from "@babylonjs/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-havok';

  ngOnInit(): void {
    const canvas = document
      .getElementById('gameCanvas') as HTMLCanvasElement;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    HavokPhysics().then(havok => {
      let havokPlugin = new HavokPlugin(false, havok);
      scene.enablePhysics(new Vector3(0, -9.81, 0), havokPlugin);
      this.init(engine, scene);
    })
  }

  init(engine: Engine, scene: Scene): void {
    let physEngine: IPhysicsEngine | null = scene.getPhysicsEngine();
    if (!physEngine) {
      throw new Error("Unable to get physic engine");
    } else {
      engine.runRenderLoop((): void => {
        scene.render();
      });
    }
  }
}
