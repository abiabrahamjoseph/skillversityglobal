import * as migration_20260516_185516_initial from './20260516_185516_initial';
import * as migration_20260517_161340_cms_admin_integration from './20260517_161340_cms_admin_integration';

export const migrations = [
  {
    up: migration_20260516_185516_initial.up,
    down: migration_20260516_185516_initial.down,
    name: '20260516_185516_initial',
  },
  {
    up: migration_20260517_161340_cms_admin_integration.up,
    down: migration_20260517_161340_cms_admin_integration.down,
    name: '20260517_161340_cms_admin_integration',
  },
];
