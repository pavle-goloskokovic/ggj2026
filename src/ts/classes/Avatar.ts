import AvatarBase from './AvatarBase';

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
}
