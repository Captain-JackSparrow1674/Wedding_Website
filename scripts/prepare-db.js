const fs = require('fs');
const path = require('path');

const rootDb = path.join(__dirname, '..', 'dev.db');
const prismaDir = path.join(__dirname, '..', 'prisma');
const prismaDb = path.join(prismaDir, 'dev.db');

if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir, { recursive: true });
}

if (fs.existsSync(prismaDb) && !fs.existsSync(rootDb)) {
  fs.copyFileSync(prismaDb, rootDb);
  console.log('Synchronized: copied prisma/dev.db -> root dev.db');
} else if (fs.existsSync(rootDb) && !fs.existsSync(prismaDb)) {
  fs.copyFileSync(rootDb, prismaDb);
  console.log('Synchronized: copied root dev.db -> prisma/dev.db');
} else if (fs.existsSync(prismaDb) && fs.existsSync(rootDb)) {
  console.log('Database exists in both locations (root and prisma).');
} else {
  console.log('No existing dev.db found.');
}
