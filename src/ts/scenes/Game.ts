import Phaser from 'phaser';
import Scene = Phaser.Scene;
import AvatarBase from '../classes/AvatarBase';
import Avatar from '../classes/Avatar';
import SelectableItem from '../classes/SelectableItem';
import { getRandomSpriteName, itemCategories } from '../constants';

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

                bases.forEach((other) =>
                {
                    if (other !== base)
                    {
                        other.setSelected(false);
                    }
                });

                avatar.base.copy(base.list[0] as AvatarBase);
            });
        }

        const itemCount = 10;
        const itemsPerRow = 5;
        const row1Y = scale.height * 0.3;
        const row2Y = scale.height * 0.5;
        const itemSpacing = scale.width / (itemsPerRow + 1);
        const items: SelectableItem[] = [];
        const usedFrames = new Set<string>();

        for (let i = 0; i < itemCount; i++)
        {
            const rowIndex = i < itemsPerRow ? 0 : 1;
            const colIndex = i % itemsPerRow;
            const x = itemSpacing * (colIndex + 1);
            const y = rowIndex === 0 ? row1Y : row2Y;
            const category = Phaser.Utils.Array
                .GetRandom(itemCategories as any as typeof itemCategories[number][]);
            const spriteName = getRandomSpriteName(category);
            if (usedFrames.has(spriteName))
            {
                i--;
                continue;
            }
            usedFrames.add(spriteName);
            const image = this.add.image(0, 0, 'sprites', spriteName);
            const item = new SelectableItem(this, x, y, image)
                .setScale(3);
            items.push(item);
        }

        const secondRowBottom = items[itemsPerRow].getBounds().bottom;
        const avatarY = (scale.height + secondRowBottom) / 2;
        const avatar = new Avatar(this, scale.width / 3, avatarY)
            .setScale(5);

        items.forEach((item) =>
        {
            item.on('toggled', (selected: boolean) =>
            {
                const frame = (item.list[0] as Phaser.GameObjects.Image).frame.name;
                if (selected)
                {
                    avatar.addItem(frame);
                }
                else
                {
                    avatar.removeItem(frame);
                }
            });
        });

        bases[0].setSelected(true);
    }
}
