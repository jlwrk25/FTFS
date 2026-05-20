export type Gender = 'male' | 'female';

export interface FrameType {
  name: string;
  recommended: boolean;
}

export interface FaceShapeData {
  name: string;
  description: string;
  longDescription: string;
  characteristics: { name: string; score: number }[];
  celebrities: { name: string; imageUrl?: string }[];
  recommendedFrames: {
    women: string[];
    men: string[];
  };
  notRecommended: string[];
  frameGuidance: string;
  principles: string[];
}

export const FACE_SHAPES: Record<string, FaceShapeData> = {
  Oval: {
    name: 'Oval',
    description: 'Slightly longer than it is wide, with a softly curved jaw and forehead that are slightly narrower than the cheekbones.',
    longDescription: 'Widely considered the textbook blueprint for a symmetrical oval frame, keeping balanced length with slightly tapered jaw symmetry and smooth, curved edges.',
    characteristics: [
      { name: 'Oval', score: 48.2 },
      { name: 'Round', score: 25.4 },
      { name: 'Oblong', score: 15.1 },
    ],
    celebrities: [
      { name: 'Beyoncé' },
      { name: 'Rihanna' },
      { name: 'Bella Hadid' },
      { name: 'Charlize Theron' },
      { name: 'Megan Fox' },
      { name: 'Kim Kardashian' },
      { name: 'Jessica Alba' },
      { name: 'Ryan Gosling' },
      { name: 'Jude Law' },
      { name: 'Eva Mendes' },
    ],
    recommendedFrames: {
      women: ['Rectangle', 'Square', 'Round', 'Aviator'],
      men: ['Rectangle', 'Square', 'Browline'],
    },
    notRecommended: ['Oversized'],
    frameGuidance: 'If you have an oval face shape you\'re in luck. There are a variety of styles that would work well with an oval face and is considered the ideal face shape for glasses. The best rule of thumb for oval faces is finding eyeglass frames that are as wide (or a little wider) than the widest part of your face. Square and rectangular frames tend to add structure and contrast to the softer oval features.',
    principles: ['The right frame creates balance', 'The right style defines you'],
  },
  Heart: {
    name: 'Heart',
    description: 'Broad at the forehead and cheekbones, tapering down sharply to a narrow, pointed chin.',
    longDescription: 'Features a prominent forehead tapering to a sharp, delicate chin, paired with a steeply angled jawline or a soft brow breadth. Exhibits a delightful blend of symmetry with a slight heart-shaped peak.',
    characteristics: [
      { name: 'Heart', score: 45.5 },
      { name: 'Oval', score: 28.2 },
      { name: 'Diamond', score: 26.3 },
    ],
    celebrities: [
      { name: 'Reese Witherspoon' },
      { name: 'Scarlett Johansson' },
      { name: 'Taylor Swift' },
      { name: 'Nick Jonas' },
      { name: 'Zendaya' },
      { name: 'Jennifer Aniston' },
      { name: 'Naomi Campbell' },
      { name: 'Chloë Grace Moretz' },
      { name: 'Sydney Sweeney' },
      { name: 'Lily Collins' },
    ],
    recommendedFrames: {
      women: ['Rectangle', 'Round', 'Geometric', 'Aviator'],
      men: ['Rectangle', 'Round', 'Aviator'],
    },
    notRecommended: ['Square', 'Browline', 'Oval'],
    frameGuidance: 'Just like the triangle face shape, you can look to mirror the heart-shaped face by finding frames with heavier details on the bottom of the frame and lighter at the top. Look for eyeglasses with a geometric shape or an aviator-style frame. Round frames would also work well by softening the angular features of a heart-shaped face.',
    principles: ['Add weight to the bottom', 'Soften the angles', 'Balance is key'],
  },
  Round: {
    name: 'Round',
    description: 'Characterized by soft angles, a rounded jawline, and equal width and length measurements.',
    longDescription: 'Round faces lack prominent cheekbones and have a rounded chin with very few angles. Soft curves and balanced proportions lead to a classic circular face contour.',
    characteristics: [
      { name: 'Round', score: 50.1 },
      { name: 'Oval', score: 35.4 },
      { name: 'Heart', score: 14.5 },
    ],
    celebrities: [
      { name: 'Selena Gomez' },
      { name: 'Jennifer Lawrence' },
      { name: 'Emma Stone' },
      { name: 'Leonardo DiCaprio' },
      { name: 'Chrissy Teigen' },
      { name: 'Mila Kunis' },
      { name: 'Jennie Kim (Blackpink)' },
      { name: 'Usher' },
      { name: 'Miranda Kerr' },
      { name: 'Ginnifer Goodwin' },
    ],
    recommendedFrames: {
      women: ['Rectangle', 'Square', 'Aviator'],
      men: ['Rectangle', 'Square', 'Aviator'],
    },
    notRecommended: ['Small', 'Oval', 'Browline'],
    frameGuidance: 'Pick eyewear frames that add more angles to the face like square, rectangle or angular frames. Rectangle and square frame shapes offset the roundness and can make the face appear longer and thinner.',
    principles: ['Add angles to the face', 'Offset the roundness', 'Balance is key'],
  },
  Square: {
    name: 'Square',
    description: 'Features strong, prominent, angular corners, a wide forehead, and a jawline that sits roughly equal in width.',
    longDescription: 'Renowned for sharp, structurally prominent, and wide jawline definitions. Built with block-angular lower facial structure and distinct, box-proportioned bone alignments.',
    characteristics: [
      { name: 'Square', score: 48.2 },
      { name: 'Rectangular', score: 32.1 },
      { name: 'Triangle', score: 19.7 },
    ],
    celebrities: [
      { name: 'Angelina Jolie' },
      { name: 'Brad Pitt' },
      { name: 'Olivia Wilde' },
      { name: 'Johnny Depp' },
      { name: 'Margot Robbie' },
      { name: 'Keira Knightley' },
      { name: 'Michael B. Jordan' },
      { name: 'Sandra Bullock' },
      { name: 'Henry Cavill' },
      { name: 'Natalie Portman' },
    ],
    recommendedFrames: {
      women: ['Browline', 'Oval', 'Round'],
      men: ['Browline', 'Oval', 'Round'],
    },
    notRecommended: ['Rectangle', 'Small'],
    frameGuidance: 'Rounded shapes like round, oval, or browline frames complement the angular lines of square face shapes. It creates a pleasing balance between facial features and frame shape. Frame width is important to take into consideration for square face shapes. Find frames that sit wider on the sides to avoid glasses that look too small for your face.',
    principles: ['Add width at the sides', 'Soften the angles', 'Balance is key'],
  },
  Diamond: {
    name: 'Diamond',
    description: 'Characterized by a narrow forehead and a narrow chin, with the cheekbones being the widest, most prominent part of the face.',
    longDescription: 'Defined by high, prominent cheekbone structure with severe tapering at both temporal and mandibular extremes. Narrow temples transition out into wider cheeks and back down.',
    characteristics: [
      { name: 'Diamond', score: 42.5 },
      { name: 'Triangle', score: 30.2 },
      { name: 'Oval', score: 27.3 },
    ],
    celebrities: [
      { name: 'Jennifer Lopez' },
      { name: 'Halle Berry' },
      { name: 'Robert Pattinson' },
      { name: 'Timothée Chalamet' },
      { name: 'Anna Kendrick' },
      { name: 'Shakira' },
      { name: 'Tyra Banks' },
      { name: 'Serena Williams' },
      { name: 'Vanessa Hudgens' },
      { name: 'Cillian Murphy' },
    ],
    recommendedFrames: {
      women: ['Oval', 'Round', 'Cat Eye'],
      men: ['Oval', 'Round', 'Browline'],
    },
    notRecommended: ['Rectangle', 'Square'],
    frameGuidance: 'Rounded shapes like round, oval, or browline frames complement the angular lines of diamond face shapes. It creates a pleasing balance between facial features and frame shape. Frame width is important to take into consideration. Find frames that sit wider on the sides to avoid glasses that look too small for your face.',
    principles: ['Soften cheekbones', 'Add width to forehead', 'Minimize jawline'],
  },
  Triangle: {
    name: 'Triangle',
    description: 'A triangle (or pear) face shape typically has a narrow forehead and is widest around the jawline.',
    longDescription: 'The face creates a triangular shape where jaw width is distinctly wider than the hairline or temple width, tapering upward toward the top of the head.',
    characteristics: [
      { name: 'Triangle', score: 45.1 },
      { name: 'Square', score: 35.4 },
      { name: 'Rectangular', score: 19.5 },
    ],
    celebrities: [
      { name: 'Kelly Osbourne' },
      { name: 'Meghan Markle' },
      { name: 'Timothée Chalamet' },
      { name: 'Lucy Hale' },
      { name: 'Kanye West' },
      { name: 'Minnie Driver' },
      { name: 'Jonah Hill' },
      { name: 'Ali Larter' },
      { name: 'Édgar Ramírez' },
      { name: 'Renee Zellweger' },
      { name: 'Matt Bomer' },
      { name: 'Billie Piper' },
    ],
    recommendedFrames: {
      women: ['Browline', 'Oval', 'Aviator'],
      men: ['Browline', 'Oval', 'Aviator'],
    },
    notRecommended: ['Square'],
    frameGuidance: 'Triangle face shapes do well with frames that mirror or add contrast to the shape of the face. Since the triangle face shape is widest at the jaw and narrows at the forehead, look to mirror the shape using frames with heavy accents at the top and lighter features at the bottom. This can be cat-eye or browline frames for women and rounded frames with top-heavy details like a wayfarer or browline frames for men.',
    principles: ['Add width at the top', 'Soften the angles', 'Balance is key'],
  },
  Oblong: {
    name: 'Oblong',
    description: 'Significantly longer than it is wide, keeping a mostly straight perimeter with minimal tapering.',
    longDescription: 'An elongated facial canvas with consistent vertical width and a high length-to-width ratio, characterized by long, striking structural lines.',
    characteristics: [
      { name: 'Oblong', score: 52.4 },
      { name: 'Oval', score: 28.7 },
      { name: 'Square', score: 18.9 },
    ],
    celebrities: [
      { name: 'Sarah Jessica Parker' },
      { name: 'Ben Affleck' },
      { name: 'Liv Tyler' },
      { name: 'Gisele Bündchen' },
      { name: 'Adam Levine' },
      { name: 'Sarah Paulson' },
      { name: 'Benedict Cumberbatch' },
      { name: 'Courtney Cox' },
      { name: 'LeBron James' },
      { name: 'Hugh Jackman' },
    ],
    recommendedFrames: {
      women: ['Square', 'Round', 'Aviator'],
      men: ['Square', 'Round', 'Aviator'],
    },
    notRecommended: ['Rectangle', 'Small'],
    frameGuidance: 'Since your face is longer than it is wide, opt for frames that are deeper rather than wider. Large, oversized glasses or those with strong horizontal lines like aviators or round spectacles add much-needed width and visual balance to the elongated facial profile.',
    principles: ['Deeper frame profiles', 'Aesthetic width balance', 'Offset vertical length'],
  },
};
