import Phaser from 'phaser';
import Scene = Phaser.Scene;

/**
 * Pick Phaser scene.
 */
export class Pick extends Scene {

    constructor () { super('pick'); }

    create (): void
    {
        console.info('Pick enter');
        console.info('Pick data', this.scene.settings.data);

        const scale = this.scale;

        const bg = this.add.image(scale.width / 2, scale.height / 2, 'bg');
        const scaleX = scale.width / bg.width;
        const scaleY = scale.height / bg.height;
        const bgScale = Math.max(scaleX, scaleY);
        bg.setScale(bgScale)
            .setAlpha(0.15);
    }
}
