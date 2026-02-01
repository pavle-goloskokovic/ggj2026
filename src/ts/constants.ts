export const baseCategories = [
    'background',
    'base',
    'eyes',
    'eyebrows',
    'nose',
    'mouth',
    'clothing'
] as const;

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

export const itemCategories = [
    'facial',
    'glasses',
    'hair',
    'hat',
    'accessory'
] as const;

export const clues = [
    'Tall figure with distinctive gait',
    'Scarred individual, average build',
    'Weathered individual with calloused hands',
    'Hooded figure with methodical movements',
    'Lean person with striking features'
] as const;

export const targetAvatars = [
    {
        baseFrames: ['background01', 'base01', 'eyes03', 'eyebrows02', 'nose01', 'mouth05', 'clothing02'],
        itemFrames: ['hair15', 'accessory05']
    },
    {
        baseFrames: ['background02', 'base03', 'eyes08', 'eyebrows05', 'nose03', 'mouth07', 'clothing05'],
        itemFrames: ['facial08', 'hair22', 'accessory12']
    },
    {
        baseFrames: ['background03', 'base04', 'eyes12', 'eyebrows07', 'nose04', 'mouth09', 'clothing08'],
        itemFrames: ['facial03', 'hair28', 'hat10']
    },
    {
        baseFrames: ['background04', 'base02', 'eyes06', 'eyebrows03', 'nose02', 'mouth04', 'clothing11'],
        itemFrames: ['hair18', 'hat15', 'accessory07']
    },
    {
        baseFrames: ['background05', 'base05', 'eyes14', 'eyebrows08', 'nose05', 'mouth11', 'clothing03'],
        itemFrames: ['glasses08', 'hair33', 'accessory18']
    }
] as const;
