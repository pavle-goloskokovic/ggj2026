import Phaser from 'phaser';
import Scene = Phaser.Scene;
import AvatarBase from '../classes/AvatarBase';
import SelectableItem from '../classes/SelectableItem';

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

        new SelectableItem(this, x, y, new AvatarBase(this, 0, 0))
            .setScale(5);
    }
}
