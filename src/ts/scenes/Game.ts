import Phaser from 'phaser';
import Scene = Phaser.Scene;
import AvatarBase from '../classes/AvatarBase';
import SelectableItem from '../classes/SelectableItem';
import { getRandomSpriteName } from '../constants';

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

        const itemCategories = ['accessory', 'facial', 'glasses', 'hair', 'hat'] as const;
        const itemCount = 10;
        const itemsPerRow = 5;
        const row1Y = scale.height * 0.3;
        const row2Y = scale.height * 0.5;
        const itemSpacing = scale.width / (itemsPerRow + 1);
        const items: SelectableItem[] = [];

        for (let i = 0; i < itemCount; i++)
        {
            const rowIndex = i < itemsPerRow ? 0 : 1;
            const colIndex = i % itemsPerRow;
            const x = itemSpacing * (colIndex + 1);
            const y = rowIndex === 0 ? row1Y : row2Y;
            const category = itemCategories[i % itemCategories.length];
            const spriteName = getRandomSpriteName(category);
            const image = this.add.image(0, 0, 'sprites', spriteName);
            const item = new SelectableItem(this, x, y, image)
                .setScale(3);
            items.push(item);
        }
    }
}
