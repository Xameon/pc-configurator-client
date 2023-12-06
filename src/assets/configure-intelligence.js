export const configureIntelligence = [
  {
    header: 'Specify computer perfomance',
    min: 1,
    max: 4,
    description: [
      'A simple computer for watching videos, listening to music and surfing the browser.',
      'A computer for undemanding or online games and simple tasks.',
      'A computer on which you can run “AAA” projects, set higher settings in games, and work with demanding editors.',
      'A computer for high settings in games and for working with powerful software tools.',
    ],
    property: 'perfomance',
  },
  {
    header: 'Budget for your computer',
    min: 100,
    max: 1000,
    description: [
      'Keep in mind that the scope within which the assembly is generated will depend on the budget (with a small budget you will not be able to get the most powerful computer).',
    ],
    property: 'budget',
  },
  {
    header: 'Amount of disk memory',
    min: 1,
    max: 6,
    description: [
      '128GB - The minimum amount of memory that may be needed in a modern computer.',
      '256GB - You can store photos or videos, install a couple of modern games.',
      '512GB - The average amount of memory in a modern computer allows you to store various files and install several modern games.',
      '1TB - A terabyte is enough to save a lot of heavy files, high-resolution videos and at the same time install a dozen or even more modern games.',
      '2TB - Rarely does anyone need such a large storage facility. But if you need to store a lot of graphic files or want to install most modern games, then this choice is for you.',
      '4TB - Do you need to save every moment of your life to pass on your video story to posterity, or have you decided to download all the AAA projects that currently exist? Well, the choice is yours.',
    ],
    property: 'memory',
  },
];
