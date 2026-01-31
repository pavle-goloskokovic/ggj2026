import Phaser from 'phaser';
import Scene = Phaser.Scene;
import AvatarBase from '../classes/AvatarBase';

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

        new AvatarBase(this, x, y);
    }
}
