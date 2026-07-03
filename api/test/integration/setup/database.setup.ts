import { randomUUID } from 'crypto';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { Client } from 'pg';
import { PrismaService } from '@/core/database/prisma.service';

type StartedPostgreSqlContainer = {
  getConnectionUri(): string;
  stop(): Promise<unknown>;
};

let container: StartedPostgreSqlContainer | undefined;
let databaseUrl: string | undefined;
let ownsContainer = false;

const DEFAULT_INTEGRATION_DB = 'akilli_garson_integration';
const DEFAULT_LOCAL_ADMIN_URL =
  'postgresql://postgres:postgres@127.0.0.1:5432/postgres';
const DEFAULT_INTEGRATION_URL = `postgresql://postgres:postgres@127.0.0.1:5432/${DEFAULT_INTEGRATION_DB}?schema=public`;

async function canConnect(url: string): Promise<boolean> {
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    await client.query('SELECT 1');
    return true;
  } catch {
    return false;
  } finally {
    await client.end().catch(() => undefined);
  }
}

async function ensureIntegrationDatabaseExists(): Promise<string> {
  const adminClient = new Client({ connectionString: DEFAULT_LOCAL_ADMIN_URL });

  try {
    await adminClient.connect();
    const exists = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [
      DEFAULT_INTEGRATION_DB,
    ]);

    if (exists.rowCount === 0) {
      await adminClient.query(`CREATE DATABASE "${DEFAULT_INTEGRATION_DB}"`);
    }
  } finally {
    await adminClient.end().catch(() => undefined);
  }

  return DEFAULT_INTEGRATION_URL;
}

async function startTestcontainersPostgres(): Promise<string> {
  const { PostgreSqlContainer } = await import('@testcontainers/postgresql');
  container = await new PostgreSqlContainer('postgres:16-alpine').start();
  ownsContainer = true;
  return container.getConnectionUri();
}

async function resolveDatabaseUrl(): Promise<string> {
  if (process.env.INTEGRATION_DATABASE_URL) {
    return process.env.INTEGRATION_DATABASE_URL;
  }

  try {
    return await startTestcontainersPostgres();
  } catch {
    const integrationUrl = await ensureIntegrationDatabaseExists().catch(() => null);

    if (integrationUrl && (await canConnect(integrationUrl))) {
      return integrationUrl;
    }

    if (process.env.DATABASE_URL && (await canConnect(process.env.DATABASE_URL))) {
      return process.env.DATABASE_URL;
    }

    throw new Error(
      [
        'Integration tests require PostgreSQL.',
        'Option A: Start Docker and rerun tests (Testcontainers).',
        'Option B: Start local postgres (api/docker/docker-compose.yml) and rerun.',
        'Option C: Set INTEGRATION_DATABASE_URL to a reachable PostgreSQL connection string.',
      ].join(' '),
    );
  }
}

function runMigrations(url: string): void {
  execSync('npx prisma migrate deploy', {
    cwd: join(__dirname, '../../..'),
    env: {
      ...process.env,
      DATABASE_URL: url,
    },
    stdio: 'pipe',
  });
}

export async function startIntegrationDatabase(): Promise<string> {
  if (databaseUrl) {
    return databaseUrl;
  }

  databaseUrl = await resolveDatabaseUrl();
  process.env.DATABASE_URL = databaseUrl;
  runMigrations(databaseUrl);

  return databaseUrl;
}

export async function stopIntegrationDatabase(): Promise<void> {
  if (ownsContainer) {
    await container?.stop();
  }

  container = undefined;
  databaseUrl = undefined;
  ownsContainer = false;
}

export async function resetIntegrationDatabase(prisma: PrismaService): Promise<void> {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "order_lines",
      "orders",
      "menu_prices",
      "menu_category_placements",
      "menu_items",
      "menu_categories",
      "tables",
      "restaurants"
    RESTART IDENTITY CASCADE
  `);
}

export interface SeedRestaurantOptions {
  name?: string;
  slug?: string;
}

export async function seedRestaurant(
  prisma: PrismaService,
  options: SeedRestaurantOptions = {},
): Promise<{ id: string; slug: string }> {
  const id = randomUUID();
  const slug = options.slug ?? `restaurant-${id.slice(0, 8)}`;

  await prisma.restaurant.create({
    data: {
      id,
      name: options.name ?? 'Test Restaurant',
      slug,
    },
  });

  return { id, slug };
}
