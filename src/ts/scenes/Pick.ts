import Phaser from 'phaser';
import Scene = Phaser.Scene;
import Avatar from '../classes/Avatar';
import SelectableItem from '../classes/SelectableItem';
import { targetAvatars, itemCategories, getRandomSpriteName, clues } from '../constants';
import CustomCursor from '../classes/CustomCursor';
import { playSound } from './utils';

/**
 * Pick Phaser scene.
 */
export class Pick extends Scene {

    constructor () { super('pick'); }

    create (): void
    {
        console.info('Pick enter');

        // Play random melodic sound
        const melodicSound = Phaser.Math.RND.pick(['melodic1', 'melodic2']);
        playSound(this, melodicSound);

        // Fade in from black
        this.cameras.main.fadeIn(400, 0, 0, 0);

        new CustomCursor(this);

        const data = this.scene.settings.data as { baseFrames: string[], itemFrames: string[], clueIndex: number };
        console.info('Pick data', data);

        const scale = this.scale;

        const bg = this.add.image(scale.width / 2, scale.height / 2, 'sprites', 'bg');
        const scaleX = scale.width / bg.width;
        const scaleY = scale.height / bg.height;
        const bgScale = Math.max(scaleX, scaleY);
        bg.setScale(bgScale)
            .setAlpha(0.15);

        const avatarCount = 12;
        const avatars: Avatar[] = [];
        for (let i = 0; i < avatarCount; i++)
        {
            let avatar: Avatar;
            if (i === 0)
            {
                avatar = new Avatar(this, 0, 0, data.baseFrames, data.itemFrames);
            }
            else if (i === 1)
            {
                const target = targetAvatars[data.clueIndex];
                avatar = new Avatar(this, 0, 0, target.baseFrames as any, target.itemFrames as any);
            }
            else
            {
                const itemCount = Phaser.Math.Between(2, 4);
                const itemFrames: string[] = [];
                const usedCategories = new Set<string>();

                for (let j = 0; j < itemCount; j++)
                {
                    const category = Phaser.Utils.Array.GetRandom(itemCategories as any as typeof itemCategories[number][]);
                    if (usedCategories.has(category))
                    {
                        j--;
                        continue;
                    }
                    usedCategories.add(category);
                    itemFrames.push(getRandomSpriteName(category));
                }

                avatar = new Avatar(this, 0, 0, undefined, itemFrames);
            }
            avatars.push(avatar);
        }
        Phaser.Utils.Array.Shuffle(avatars);

        const cols = 4;
        const rows = 3;
        const itemSpacing = scale.width / (cols + 1);
        const rowSpacing = itemSpacing;
        const gridWidth = itemSpacing * (cols - 1);
        const gridHeight = rowSpacing * (rows - 1);
        const startX = (scale.width - gridWidth) / 2;
        const startY = (scale.height - gridHeight) / 2;

        this.add.text(scale.width / 2, (startY - avatars[0].height * 3.3 / 2) / 2, clues[data.clueIndex], {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: scale.width - 100 }
        }).setOrigin(0.5);

        avatars.forEach((avatar, i) =>
        {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = startX + itemSpacing * col;
            const y = startY + rowSpacing * row;

            const selectableItem = new SelectableItem(this, x, y, avatar)
                .setScale(3.3);

            // Fade in sequentially with slight delay
            selectableItem.setAlpha(0);
            this.tweens.add({
                targets: selectableItem,
                alpha: 1,
                duration: 300,
                delay: i * 60,
                ease: 'Power2.easeIn'
            });

            selectableItem.on('toggled', (selected: boolean) =>
            {
                if (!selected)
                {
                    return;
                }

                // Camera shake on selection
                this.cameras.main.shake(300, 0.01);

                // Fade out to black and transition back to game scene
                this.cameras.main.fadeOut(400, 0, 0, 0);
                this.time.delayedCall(400, () =>
                {
                    this.scene.start('game');
                });
            });
        });
    }
}
