import { playSound } from '../scenes/utils';

export default class SelectableItem extends Phaser.GameObjects.Container {

    private outline: Phaser.GameObjects.Image;
    private selected = false;
    private baseScale = 1;
    private hoverTween?: Phaser.Tweens.Tween;
    private pulseTween?: Phaser.Tweens.Tween;

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
            .on('pointerdown', this.handleClick, this)
            .on('pointerover', this.handleHoverIn, this)
            .on('pointerout', this.handleHoverOut, this);

        scene.events.once('shutdown', this.cleanup, this);
    }

    private handleHoverIn (): void
    {
        if (this.hoverTween)
        {
            this.hoverTween.stop();
        }

        // Play hover sound
        playSound(this.scene, 'hover');

        // Change outline to hover state
        if (!this.selected)
        {
            this.outline.setFrame('outline-hover');
        }

        this.hoverTween = this.scene.tweens.add({
            targets: this,
            scaleX: this.baseScale * 1.08,
            scaleY: this.baseScale * 1.08,
            duration: 150,
            ease: 'Back.easeOut'
        });
    }

    private handleHoverOut (): void
    {
        if (this.hoverTween)
        {
            this.hoverTween.stop();
        }

        // Restore outline to unselected state
        if (!this.selected)
        {
            this.outline.setFrame('outline-unselected');
        }

        this.hoverTween = this.scene.tweens.add({
            targets: this,
            scaleX: this.baseScale,
            scaleY: this.baseScale,
            duration: 150,
            ease: 'Back.easeOut'
        });
    }

    private handleClick (): void
    {
        // Click animation: scale down then bounce back
        this.scene.tweens.add({
            targets: this,
            scaleX: this.baseScale * 0.92,
            scaleY: this.baseScale * 0.92,
            duration: 80,
            ease: 'Power2',
            yoyo: true,
            onComplete: () =>
            {
                this.toggle();
            }
        });
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

        // Play select or deselect sound
        playSound(this.scene, this.selected ? 'select' : 'deselect');

        // Stop any existing pulse
        if (this.pulseTween)
        {
            this.pulseTween.stop();
            this.pulseTween = null;
        }

        // Add pulse effect when selected
        if (this.selected)
        {
            this.outline.setAngle(0);
            this.pulseTween = this.scene.tweens.add({
                targets: this.outline,
                angle: { from: -1, to: 1 },
                duration: 800,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        }
        else
        {
            this.outline.setAngle(0);
        }

        this.emit('toggled', this.selected);
    }

    setScale (x: number, y?: number): this
    {
        this.baseScale = x;
        return super.setScale(x, y);
    }

    private cleanup (): void
    {
        if (this.hoverTween)
        {
            this.hoverTween.stop();
        }
        if (this.pulseTween)
        {
            this.pulseTween.stop();
        }
    }
}
