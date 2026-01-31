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
        const y = scale.height * 0.1;
        const count = 5;
        const spacing = scale.width / (count + 1);
        const bases: SelectableItem[] = [];

        for (let i = 0; i < count; i++)
        {
            const x = spacing * (i + 1);
            const base = new SelectableItem(this, x, y, new AvatarBase(this, 0, 0))
                .setScale(3);
            bases.push(base);

            base.on('toggled', (selected: boolean) =>
            {
                if (!selected)
                {
                    return;
                }

                bases.forEach(other =>
                {
                    if (other !== base)
                    {
                        other.setSelected(false);
                    }
                });
            });
        }

        bases[0].setSelected(true);
    }
}
