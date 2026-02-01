import { getRandomSpriteName } from '../constants';

export default class AvatarBase extends Phaser.GameObjects.Container {
    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y);

        // Add sprites in the specified order
        const categories = ['background', 'base', 'eyes', 'eyebrows', 'nose', 'mouth', 'clothing'] as const;

        categories.forEach((category) =>
        {
            const spriteName = getRandomSpriteName(category);
            const image = scene.add.image(0, 0, 'sprites', spriteName);
            this.add(image);
        });

        // Set container size to first child size
        const firstChild = this.list[0] as Phaser.GameObjects.Image;
        this.setSize(firstChild.width, firstChild.height);

        // Add this container to the scene
        scene.add.existing(this);
    }

    copy (source: AvatarBase): void
    {
        const targetChildren = this.list as Phaser.GameObjects.Image[];
        const sourceChildren = source.list as Phaser.GameObjects.Image[];

        for (let i = 0; i < targetChildren.length; i++)
        {
            targetChildren[i].setFrame(sourceChildren[i].frame.name);
        }
    }
}
