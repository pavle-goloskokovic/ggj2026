export default class SelectableItem extends Phaser.GameObjects.Container {

    private outline: Phaser.GameObjects.Image;
    private selected = false;

    constructor (
        scene: Phaser.Scene,
        x: number,
        y: number,
        child: Phaser.GameObjects.GameObject
    )
    {
        super(scene, x, y);

        // Add the child item first
        this.add(child);

        // Add outline sprite from atlas after the child
        this.outline = scene.add.image(0, 0, 'sprites', 'outline-unselected');
        this.add(this.outline);

        // Add this container to the scene
        scene.add.existing(this);

        child.setInteractive()
            .on('pointerdown', this.toggle, this);
    }

    toggle (): void
    {
        this.setSelected(!this.selected);
    }

    getSelected (): boolean
    {
        return this.selected;
    }

    setSelected (value: boolean): void
    {
        this.selected = value;
        this.outline.setFrame(this.selected ? 'outline-selected' : 'outline-unselected');
        this.emit('toggled', this.selected);
    }
}
