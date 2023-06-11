import fs from 'fs';
import path from 'path';
import express from 'express';

const app = express();
const modulesDir = path.join(__dirname, 'modules');

const loadModulesRoutes = (modulePath: string) => {
  const routesPath = path.join(modulePath, 'routes.ts');

  if (fs.existsSync(routesPath)) {
    import(routesPath).then((routes) => {
      if (routes.default) {
        app.use(`/${path.basename(modulePath)}`, routes.default);
      }
    });
  }
};

fs.readdirSync(modulesDir)
  .map((module) => path.join(modulesDir, module))
  .filter((modulePath) => fs.lstatSync(modulePath).isDirectory())
  .forEach(loadModulesRoutes);

const port = process.env.PORT || 3000;

app.use(express.json());
app.listen(port, () => console.log(`API server running on port ${port}`));
