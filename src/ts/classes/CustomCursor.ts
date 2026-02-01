import type Phaser from 'phaser';
import { cursorAutoKey, cursorPointerKey, cursorScale } from '../cursors';

export default class CustomCursor {

    private scene: Phaser.Scene;
    private cursorImage: Phaser.GameObjects.Image;
    private overCount = 0;

    constructor (scene: Phaser.Scene)
    {
        this.scene = scene;

        this.cursorImage = scene.add.image(0, 0, cursorAutoKey)
            .setOrigin(0, 0)
            .setDepth(10000)
            .setScrollFactor(0)
            .setScale(cursorScale);

        const pointer = scene.input.activePointer;
        this.cursorImage.setPosition(pointer.x, pointer.y);

        scene.input.on('pointermove', this.handleMove, this);
        scene.input.on('gameobjectover', this.handleOver, this);
        scene.input.on('gameobjectout', this.handleOut, this);
        scene.events.once('shutdown', this.destroy, this);
    }

    private handleMove (pointer: Phaser.Input.Pointer): void
    {
        this.cursorImage.setPosition(pointer.x, pointer.y);
    }

    private handleOver (): void
    {
        this.overCount++;
        this.cursorImage.setTexture(cursorPointerKey);
    }

    private handleOut (): void
    {
        this.overCount = Math.max(0, this.overCount - 1);
        if (this.overCount === 0)
        {
            this.cursorImage.setTexture(cursorAutoKey);
        }
    }

    destroy (): void
    {
        this.scene.input.off('pointermove', this.handleMove, this);
        this.scene.input.off('gameobjectover', this.handleOver, this);
        this.scene.input.off('gameobjectout', this.handleOut, this);
        this.cursorImage.destroy();
    }
}
