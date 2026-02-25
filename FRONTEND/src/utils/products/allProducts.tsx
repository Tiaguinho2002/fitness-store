import creatina from './creatina.json';
import whey from './wheyProtein.json';
import preTreino from './preTreino.json';
import glutamina from './glutamina.json';
import hipercalorico from './hipercalorico.json';

const allProducts = [
  ...creatina.creatina.map((p) => ({ ...p, title: p.name })),
  ...whey.wheyProtein.map((p) => ({ ...p, title: p.name })),
  ...preTreino.preTreino.map((p) => ({ ...p, title: p.name })),
  ...glutamina.glutamina.map((p) => ({ ...p, title: p.name })),
  ...hipercalorico.hipercalorico.map((p) => ({ ...p, title: p.name })),
];

export default allProducts;