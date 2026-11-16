// Change the default theme for new visitors here. Existing visitor choices are local to their browser.
export const defaultTheme = 'sunrise';

const photo = id => `https://images.unsplash.com/${id}`;
// Ten distinct theme hero photos and color palettes. The MP4 is bundled locally; all themes retain the same product content.
// Photos change in hero spotlight, theme previews, story and contact panel. Story/detail images mix cows,
// farming landscapes and people (representative stock imagery, not our actual farm).
const images = {
  meadow: photo('photo-1500595046743-cd271d694d30'),
  sunrise: photo('photo-1500937386664-56d1dfef3854'),
  modern: photo('photo-1546443046-ed1ce6ffd1ab'),
  rustic: photo('photo-1500382017468-9049fed747ef'),
  lavender: photo('photo-1524024973431-2ad916746881'),
  ocean: photo('photo-1470071459604-3b5ec3a7fe05'),
  rose: photo('photo-1490750967868-88aa4486c946'),
  forest: photo('photo-1441974231531-c6227db76b6e'),
  autumn: photo('photo-1470252649378-9c29740c9fa8'),
  midnight: photo('photo-1518837695005-2083093ee35b'),
  cowsA: photo('photo-1500595046743-cd271d694d30'),
  cowsB: photo('photo-1580570598977-4b2412d01bbc'),
  cowsC: photo('photo-1621427400880-581f29f51f18'),
  farmerA: photo('photo-1592982537447-7440770cbfc9'),
  farmerB: photo('photo-1500648767791-00dcc994a43e'),
  people: photo('photo-1529156069898-49953e39b3ac'),
};

export const themes = {
  meadow:   { name:'Green Meadow',      subtitle:'Fresh · Natural',      primary:'#20553d', deep:'#194c35', accent:'#789c5e', surface:'#f2f0e5', storyBg:'#eef1e7', paper:'#fbfaf5', hero:images.meadow, video:'/videos/dairy-farm-v5.mp4', story:images.cowsA, detail:images.farmerA },
  sunrise:  { name:'Golden Sunrise',    subtitle:'Warm · Welcoming',    primary:'#7b4b26', deep:'#61391d', accent:'#bd8740', surface:'#faf0db', storyBg:'#f8ead4', paper:'#fffaf0', hero:images.sunrise, video:'/videos/dairy-farm-v5.mp4', story:images.cowsB, detail:images.farmerA },
  modern:   { name:'Clean & Modern',    subtitle:'Bright · Minimal',    primary:'#234a56', deep:'#173b48', accent:'#3e91a0', surface:'#eaf4f5', storyBg:'#e2f0f2', paper:'#f8fcfc', hero:images.modern, video:'/videos/dairy-farm-v5.mp4', story:images.cowsB, detail:images.farmerA },
  rustic:   { name:'Rustic Farmhouse',  subtitle:'Earthy · Cozy',       primary:'#6b4536', deep:'#543325', accent:'#a77a51', surface:'#f3e8db', storyBg:'#e9dbc9', paper:'#fffaf3', hero:images.rustic, video:'/videos/dairy-farm-v5.mp4', story:images.cowsA, detail:images.people },
  lavender: { name:'Lavender Fields',  subtitle:'Soft · Serene',       primary:'#685078', deep:'#513a62', accent:'#9677ae', surface:'#f5eff9', storyBg:'#eee5f4', paper:'#fcf9fe', hero:images.lavender, video:'/videos/dairy-farm-v5.mp4', story:images.cowsC, detail:images.people },
  ocean:    { name:'Ocean Breeze',     subtitle:'Calm · Refreshing',   primary:'#145e78', deep:'#104558', accent:'#48a9bc', surface:'#e6f4f6', storyBg:'#dceff2', paper:'#f7fbfc', hero:images.ocean, video:'/videos/dairy-farm-v5.mp4', story:images.cowsB, detail:images.farmerA },
  rose:     { name:'Rose Blossom',     subtitle:'Sweet · Elegant',     primary:'#854e61', deep:'#643747', accent:'#d28b9a', surface:'#f9edef', storyBg:'#f5e3e8', paper:'#fffaf9', hero:images.rose, video:'/videos/dairy-farm-v5.mp4', story:images.cowsC, detail:images.people },
  forest:   { name:'Deep Forest',      subtitle:'Bold · Botanical',    primary:'#225444', deep:'#143a31', accent:'#65a687', surface:'#e6f1e9', storyBg:'#d7e8dc', paper:'#f5fbf6', hero:images.forest, video:'/videos/dairy-farm-v5.mp4', story:images.cowsB, detail:images.farmerA },
  autumn:   { name:'Autumn Harvest',   subtitle:'Warm · Vibrant',      primary:'#98502b', deep:'#733d22', accent:'#d29b4a', surface:'#faf0df', storyBg:'#f4e2ce', paper:'#fffbf5', hero:images.autumn, video:'/videos/dairy-farm-v5.mp4', story:images.cowsA, detail:images.people },
  midnight: { name:'Midnight Blue',    subtitle:'Premium · Refined',   primary:'#2d426e', deep:'#1a2e50', accent:'#b1a16f', surface:'#e9edf6', storyBg:'#dee5f3', paper:'#f8faff', hero:images.midnight, video:'/videos/dairy-farm-v5.mp4', story:images.cowsC, detail:images.farmerA },
};
