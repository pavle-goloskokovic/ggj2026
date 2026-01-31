import { getRandomSpriteName } from '../constants';

export default class AvatarBase extends Phaser.GameObjects.Container {
    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y);

        // Add sprites in the specified order
        const categories = ['background', 'base', 'eyes', 'eyebrows', 'nose', 'mouth', 'clothing'] as const;

        categories.forEach(category =>
        {
            const spriteName = getRandomSpriteName(category);
            const sprite = scene.add.sprite(0, 0, 'sprites', spriteName);
            this.add(sprite);
        });

        // Add this container to the scene
        scene.add.existing(this);
    }
}
