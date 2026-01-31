export const spriteCategories = [
    'accessory',
    'background',
    'base',
    'clothing',
    'eyebrows',
    'eyes',
    'facial',
    'glasses',
    'hair',
    'hat',
    'mouth',
    'nose'
] as const;

export const spriteCountsByCategory: Record<typeof spriteCategories[number], number> = {
    accessory: 23,
    background: 10,
    base: 6,
    clothing: 14,
    eyebrows: 9,
    eyes: 16,
    facial: 17,
    glasses: 12,
    hair: 38,
    hat: 21,
    mouth: 13,
    nose: 6
};

export const getRandomSpriteName = (category: typeof spriteCategories[number]): string =>
{
    const max = spriteCountsByCategory[category];
    const index = Math.floor(Math.random() * max) + 1;
    return `${category}${String(index).padStart(2, '0')}`;
};
