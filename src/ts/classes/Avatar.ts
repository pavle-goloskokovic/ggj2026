import AvatarBase from './AvatarBase';
import { itemCategories } from '../constants';

export default class Avatar extends Phaser.GameObjects.Container {

    readonly base: AvatarBase;
    readonly items: Phaser.GameObjects.Image[] = [];

    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y);

        this.base = new AvatarBase(scene, 0, 0);
        this.add(this.base);

        scene.add.existing(this);
    }

    addItem (frame: string): void
    {
        if (this.items.some((item) => item.frame.name === frame))
        {
            return;
        }

        this.items.forEach((item) => { this.remove(item); });

        const image = this.scene.add.image(0, 0, 'sprites', frame);
        this.items.push(image);

        this.items.sort((a, b) =>
        {
            const categoryA = a.frame.name.replace(/\d+/g, '');
            const categoryB = b.frame.name.replace(/\d+/g, '');
            return itemCategories.indexOf(categoryA as any) - itemCategories.indexOf(categoryB as any);
        });

        this.items.forEach((item) => { this.add(item); });
    }

    removeItem (frame: string): void
    {
        const index = this.items.findIndex((item) => item.frame.name === frame);
        if (index === -1)
        {
            return;
        }

        const [item] = this.items.splice(index, 1);
        this.remove(item, true);
    }
}
