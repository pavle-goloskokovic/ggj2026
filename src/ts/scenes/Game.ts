import Phaser from 'phaser';
import Scene = Phaser.Scene;

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export class Game extends Scene {

    constructor () { super('game'); }

    create (): void
    {
        console.info('Game enter');

        const scale = this.scale;
        const x = scale.width / 2;
        const y = scale.height / 2;

        const frames = this.textures.get('sprites').getFrameNames();
        const frame = Phaser.Utils.Array.GetRandom(frames);
        this.add.sprite(x, y, 'sprites', frame);
    }
}
