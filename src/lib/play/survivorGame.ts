/**
 * Survivor-lite core: fixed-timestep-friendly update + pure helpers.
 * Presentation lives in the canvas component.
 */

import { skills } from '@/lib/data';

export type Vec2 = { x: number; y: number };

export type UpgradeId =
    | 'damage'
    | 'fire_rate'
    | 'move_speed'
    | 'max_hp'
    | 'regen'
    | 'pickup_range'
    | 'projectile_size'
    | 'multishot';

export type UpgradeStacks = Record<UpgradeId, number>;

export type UpgradeOffer = {
    id: UpgradeId;
    /** Which slice of Aidan’s skills this perk draws from (shown on the card). */
    source: string;
    title: string;
    /** Full blurb — prefer on `md+` viewports in the UI. */
    blurb: string;
    /** One-line blurb for narrow screens. */
    blurbShort: string;
};

export const WORLD = { w: 720, h: 405 };

const PLAYER_R = 15;
const BASE_PLAYER_SPEED = 200;
const BASE_FIRE_MS = 520;
const BASE_PROJ_DAMAGE = 11;
const BASE_PROJ_R = 5;
const BASE_PROJ_SPEED = 420;
export const GEM_RADIUS = 6;
const BASE_PICKUP = 52;
const MAX_STACK: Record<UpgradeId, number> = {
    damage: 12,
    fire_rate: 10,
    move_speed: 10,
    max_hp: 8,
    regen: 6,
    pickup_range: 10,
    projectile_size: 8,
    multishot: 5,
};

function xpThresholdForLevel(level: number): number {
    return Math.floor(36 * Math.pow(1.17, Math.max(0, level - 1)));
}

const technologies = skills['Technologies 🤖'];
const frameworks = skills['Frameworks 🖼️'];
const languages = skills['Programming Languages ⌨️'];

function pickFrom(pool: readonly string[], rng: () => number): string {
    if (pool.length === 0) return 'the stack';
    const i = Math.floor(rng() * pool.length);
    return pool[i] ?? pool[0]!;
}

/** Subset of `Technologies 🤖` — must stay in sync with data.ts wording where possible. */
function techMatching(re: RegExp): readonly string[] {
    const m = technologies.filter((t) => re.test(t));
    return m.length ? m : ['Git'];
}

function dataGravityPool(): readonly string[] {
    return techMatching(/PostgreSQL|Redis|MongoDB|Snowflake|Aurora/i);
}

function infraBackbonePool(): readonly string[] {
    return techMatching(/AWS|Azure|Terraform|PostgreSQL|Aurora|Snowflake|MongoDB|Redis|Factory|Functions|DevOps/i);
}

function observabilityPool(): readonly string[] {
    const m = technologies.filter((t) => /DataDog|LaunchDarkly/i.test(t));
    return m.length ? m : techMatching(/Git/i);
}

function pipelinePool(): readonly string[] {
    return techMatching(/CircleCI|Github CI|GitLab CI|Jenkins|Vercel/i);
}

function runtimeMassPool(): readonly string[] {
    const fromLang = languages.filter((s) => ['C#', 'TypeScript', 'JavaScript'].includes(s));
    const fromFx = frameworks.filter((s) => s.includes('.NET'));
    const merged = [...fromLang, ...fromFx];
    return merged.length ? merged : languages;
}

function concurrentPool(): readonly string[] {
    const want = new Set(['ReactJS', 'NextJS', 'Node.js', 'React Native']);
    const m = frameworks.filter((f) => want.has(f));
    return m.length ? m : frameworks;
}

/** Shown in small type so each card is obviously tied to Aidan’s résumé data. */
const SKILL_SOURCE_LABEL: Record<UpgradeId, string> = {
    damage: 'Aidan’s programming languages',
    fire_rate: 'Aidan’s CI/CD & deploy tools',
    move_speed: 'Aidan’s frameworks',
    max_hp: 'Aidan’s cloud & data platforms',
    regen: 'Aidan’s observability stack',
    pickup_range: 'Aidan’s data & storage tooling',
    projectile_size: 'Aidan’s core languages & .NET',
    multishot: 'Aidan’s UI & API frameworks',
};

/**
 * Each upgrade maps to a slice of `skills` in `data.ts`.
 * Title = stable perk name; blurb names one concrete entry from that slice.
 */
const UPGRADE_PRESENTATION: Record<
    UpgradeId,
    {
        title: string;
        pool: () => readonly string[];
        blurb: (skill: string) => string;
        blurbShort: (skill: string) => string;
    }
> = {
    damage: {
        title: 'Shipped languages → damage',
        pool: () => languages,
        blurb: (s) =>
            `+Projectile damage — “${s}” is listed under Aidan’s programming languages; full-stack work there maps to harder hits here.`,
        blurbShort: (s) => `+Damage — “${s}” from Aidan’s language list; harder hits.`,
    },
    fire_rate: {
        title: 'Release train → fire rate',
        pool: () => pipelinePool(),
        blurb: (s) =>
            `+Fire rate — “${s}” is how Aidan keeps deploys moving in real roles; the same cadence shows up as faster auto-fire.`,
        blurbShort: (s) => `+Fire rate — “${s}” from Aidan’s deploy tooling; faster shots.`,
    },
    move_speed: {
        title: 'Framework agility',
        pool: () => frameworks,
        blurb: (s) =>
            `+Move speed — “${s}” is on Aidan’s frameworks list for shipped apps; ducking swarms borrows the same quick-footed energy Aidan uses when shipping with that stack.`,
        blurbShort: (s) => `+Move speed — “${s}” from Aidan’s frameworks; stay mobile.`,
    },
    max_hp: {
        title: 'Production-grade HP',
        pool: () => infraBackbonePool(),
        blurb: (s) =>
            `+Max HP — “${s}” is part of the cloud/data platforms Aidan actually operates; treat it as extra runway when things get crowded.`,
        blurbShort: (s) => `+Max HP — “${s}” from Aidan’s infra stack; more room.`,
    },
    regen: {
        title: 'Observability → recovery',
        pool: () => observabilityPool(),
        blurb: (s) =>
            `+Slow HP regen — “${s}” is in Aidan’s production observability toolkit; here it reads as watching the bar and easing back from mistakes.`,
        blurbShort: (s) => `+Slow regen — “${s}” from Aidan’s observability tools.`,
    },
    pickup_range: {
        title: 'Data gravity',
        pool: () => dataGravityPool(),
        blurb: (s) =>
            `+Pickup range — “${s}” is in Aidan’s data/storage tooling; XP gems pull in from farther the way good pipelines pull work forward.`,
        blurbShort: (s) => `+Pickup range — “${s}” from Aidan’s data tooling; farther pull.`,
    },
    projectile_size: {
        title: 'Heavy runtime hits',
        pool: () => runtimeMassPool(),
        blurb: (s) =>
            `+Projectile size — “${s}” anchors Aidan’s .NET + typed front-end work; bolts grow a footprint to match that “real service” feel.`,
        blurbShort: (s) => `+Bigger shots — “${s}” from Aidan’s .NET & typed JS work.`,
    },
    multishot: {
        title: 'Parallel surfaces',
        pool: () => concurrentPool(),
        blurb: (s) =>
            `+Extra firing stream — “${s}” is how Aidan builds user-facing and API surfaces; attacks fan out the same way modern stacks fan out traffic.`,
        blurbShort: (s) => `+Extra stream — “${s}” from Aidan’s UI/API frameworks.`,
    },
};

export const ALL_UPGRADE_IDS: UpgradeId[] = [
    'damage',
    'fire_rate',
    'move_speed',
    'max_hp',
    'regen',
    'pickup_range',
    'projectile_size',
    'multishot',
];

export function rollUpgradeOffers(stacks: UpgradeStacks, rng: () => number, count = 3): UpgradeOffer[] {
    const candidates = ALL_UPGRADE_IDS.filter((id) => stacks[id] < MAX_STACK[id]);
    if (candidates.length === 0) {
        return [];
    }
    const picks: UpgradeId[] = [];
    const pool = [...candidates];
    for (let i = 0; i < count && pool.length; i++) {
        const idx = Math.floor(rng() * pool.length);
        const id = pool[idx]!;
        picks.push(id);
        pool.splice(idx, 1);
    }
    return picks.map((id) => {
        const row = UPGRADE_PRESENTATION[id];
        const skill = pickFrom(row.pool(), rng);
        return {
            id,
            source: SKILL_SOURCE_LABEL[id],
            title: row.title,
            blurb: row.blurb(skill),
            blurbShort: row.blurbShort(skill),
        };
    });
}

export type Enemy = {
    id: number;
    pos: Vec2;
    hp: number;
    maxHp: number;
    speed: number;
    radius: number;
    dmg: number;
};

export type Projectile = {
    id: number;
    pos: Vec2;
    vel: Vec2;
    damage: number;
    radius: number;
    lifeMs: number;
};

export type Gem = {
    id: number;
    pos: Vec2;
    value: number;
};

export type PlayerState = {
    pos: Vec2;
    hp: number;
    maxHp: number;
    radius: number;
    level: number;
    xp: number;
    xpToNext: number;
    invulnMs: number;
};

export type GameState = {
    t: number;
    player: PlayerState;
    stacks: UpgradeStacks;
    enemies: Enemy[];
    projectiles: Projectile[];
    gems: Gem[];
    nextEnemyId: number;
    nextProjId: number;
    nextGemId: number;
    spawnAcc: number;
    fireAcc: number;
    takedowns: number;
    alive: boolean;
};

function emptyStacks(): UpgradeStacks {
    return {
        damage: 0,
        fire_rate: 0,
        move_speed: 0,
        max_hp: 0,
        regen: 0,
        pickup_range: 0,
        projectile_size: 0,
        multishot: 0,
    };
}

export function createInitialState(): GameState {
    return {
        t: 0,
        player: {
            pos: { x: WORLD.w / 2, y: WORLD.h / 2 },
            hp: 100,
            maxHp: 100,
            radius: PLAYER_R,
            level: 1,
            xp: 0,
            xpToNext: xpThresholdForLevel(1),
            invulnMs: 0,
        },
        stacks: emptyStacks(),
        enemies: [],
        projectiles: [],
        gems: [],
        nextEnemyId: 1,
        nextProjId: 1,
        nextGemId: 1,
        spawnAcc: 0,
        fireAcc: 0,
        takedowns: 0,
        alive: true,
    };
}

function clamp(v: number, a: number, b: number) {
    return Math.min(b, Math.max(a, v));
}

function len(x: number, y: number) {
    return Math.hypot(x, y);
}

function statFireIntervalMs(stacks: UpgradeStacks): number {
    const mul = 1 + 0.11 * stacks.fire_rate;
    return BASE_FIRE_MS / mul;
}

function statDamage(stacks: UpgradeStacks): number {
    return BASE_PROJ_DAMAGE * (1 + 0.14 * stacks.damage);
}

function statProjRadius(stacks: UpgradeStacks): number {
    return BASE_PROJ_R + stacks.projectile_size * 1.2;
}

function statPlayerSpeed(stacks: UpgradeStacks): number {
    return BASE_PLAYER_SPEED * (1 + 0.075 * stacks.move_speed);
}

function statPickup(stacks: UpgradeStacks): number {
    return BASE_PICKUP + stacks.pickup_range * 14;
}

function statMultishot(stacks: UpgradeStacks): number {
    return 1 + stacks.multishot;
}

function spawnEnemy(state: GameState, rng: () => number) {
    const edge = Math.floor(rng() * 4);
    let x = 0;
    let y = 0;
    if (edge === 0) {
        x = rng() * WORLD.w;
        y = -20;
    } else if (edge === 1) {
        x = WORLD.w + 20;
        y = rng() * WORLD.h;
    } else if (edge === 2) {
        x = rng() * WORLD.w;
        y = WORLD.h + 20;
    } else {
        x = -20;
        y = rng() * WORLD.h;
    }
    const baseHp = 18 + state.t / 22000;
    const hp = baseHp * (0.85 + rng() * 0.35);
    const speed = (55 + Math.min(95, state.t / 900)) * (0.9 + rng() * 0.2);
    const radius = 11 + Math.min(5, state.t / 100000);
    const dmg = 9 + Math.min(18, state.t / 35000);
    state.enemies.push({
        id: state.nextEnemyId++,
        pos: { x, y },
        hp,
        maxHp: hp,
        speed,
        radius,
        dmg,
    });
}

function fireProjectiles(state: GameState, rng: () => number) {
    const p = state.player;
    const dmg = statDamage(state.stacks);
    const r = statProjRadius(state.stacks);
    const streams = statMultishot(state.stacks);
    let best: Enemy | null = null;
    let bestD = 1e9;
    for (const e of state.enemies) {
        const dx = e.pos.x - p.pos.x;
        const dy = e.pos.y - p.pos.y;
        const d = len(dx, dy);
        if (d < bestD) {
            bestD = d;
            best = e;
        }
    }
    const baseAngle = best
        ? Math.atan2(best.pos.y - p.pos.y, best.pos.x - p.pos.x)
        : rng() * Math.PI * 2;
    const spread = streams > 1 ? 0.22 : 0;
    for (let i = 0; i < streams; i++) {
        const t = streams === 1 ? 0 : (i - (streams - 1) / 2) * spread;
        const ang = baseAngle + t;
        const dir = { x: Math.cos(ang), y: Math.sin(ang) };
        state.projectiles.push({
            id: state.nextProjId++,
            pos: { x: p.pos.x + dir.x * 18, y: p.pos.y + dir.y * 18 },
            vel: { x: dir.x * BASE_PROJ_SPEED, y: dir.y * BASE_PROJ_SPEED },
            damage: dmg,
            radius: r,
            lifeMs: 1100,
        });
    }
}

export type MoveInput = { x: number; y: number };

/**
 * Advance simulation. Mutates `state`. `rng` should return [0,1).
 */
export function stepGame(state: GameState, input: MoveInput, dtMs: number, rng: () => number) {
    if (!state.alive) return;

    state.t += dtMs;
    const p = state.player;
    const spd = statPlayerSpeed(state.stacks);
    const nx = input.x;
    const ny = input.y;
    const nLen = len(nx, ny);
    const ix = nLen > 0 ? nx / nLen : 0;
    const iy = nLen > 0 ? ny / nLen : 0;
    p.pos.x = clamp(p.pos.x + ix * spd * (dtMs / 1000), p.radius + 2, WORLD.w - p.radius - 2);
    p.pos.y = clamp(p.pos.y + iy * spd * (dtMs / 1000), p.radius + 2, WORLD.h - p.radius - 2);

    /* Regen */
    const regen = 0.35 * state.stacks.regen * (dtMs / 1000);
    if (regen > 0) {
        p.hp = Math.min(p.maxHp, p.hp + regen);
    }

    if (p.invulnMs > 0) {
        p.invulnMs = Math.max(0, p.invulnMs - dtMs);
    }

    /* Spawn pacing */
    const spawnEvery = Math.max(380, 1650 - state.t * 0.022);
    state.spawnAcc += dtMs;
    while (state.spawnAcc >= spawnEvery) {
        state.spawnAcc -= spawnEvery;
        spawnEnemy(state, rng);
    }

    /* Auto-fire */
    const fireIv = statFireIntervalMs(state.stacks);
    state.fireAcc += dtMs;
    while (state.fireAcc >= fireIv) {
        state.fireAcc -= fireIv;
        fireProjectiles(state, rng);
    }

    /* Enemies → player */
    for (const e of state.enemies) {
        const dx = p.pos.x - e.pos.x;
        const dy = p.pos.y - e.pos.y;
        const d = len(dx, dy);
        if (d < 1e-6) continue;
        const step = e.speed * (dtMs / 1000);
        e.pos.x += (dx / d) * step;
        e.pos.y += (dy / d) * step;
        if (p.invulnMs <= 0 && d < p.radius + e.radius) {
            p.hp -= e.dmg;
            p.invulnMs = 520;
            if (p.hp <= 0) {
                p.hp = 0;
                state.alive = false;
            }
        }
    }

    /* Projectiles */
    const pickup = statPickup(state.stacks);
    for (const pr of state.projectiles) {
        pr.pos.x += pr.vel.x * (dtMs / 1000);
        pr.pos.y += pr.vel.y * (dtMs / 1000);
        pr.lifeMs -= dtMs;
    }
    state.projectiles = state.projectiles.filter((pr) => pr.lifeMs > 0 && pr.pos.x > -40 && pr.pos.x < WORLD.w + 40 && pr.pos.y > -40 && pr.pos.y < WORLD.h + 40);

    for (const pr of state.projectiles) {
        for (const e of state.enemies) {
            const dx = e.pos.x - pr.pos.x;
            const dy = e.pos.y - pr.pos.y;
            if (dx * dx + dy * dy > (e.radius + pr.radius) * (e.radius + pr.radius)) continue;
            e.hp -= pr.damage;
            pr.lifeMs = 0;
            break;
        }
    }
    state.projectiles = state.projectiles.filter((pr) => pr.lifeMs > 0);

    const dead: Enemy[] = [];
    const live: Enemy[] = [];
    for (const e of state.enemies) {
        if (e.hp <= 0) {
            dead.push(e);
        } else {
            live.push(e);
        }
    }
    state.enemies = live;
    for (const e of dead) {
        state.takedowns += 1;
        const value = 4 + Math.min(6, Math.floor(state.t / 40000));
        state.gems.push({
            id: state.nextGemId++,
            pos: { x: e.pos.x, y: e.pos.y },
            value,
        });
    }

    /* Gems */
    for (const g of state.gems) {
        const dx = p.pos.x - g.pos.x;
        const dy = p.pos.y - g.pos.y;
        const d = len(dx, dy);
        if (d < pickup && d > 0.01) {
            const pull = Math.min(280, pickup * 2.2) * (dtMs / 1000);
            g.pos.x += (dx / d) * pull;
            g.pos.y += (dy / d) * pull;
        }
        if (d < p.radius + GEM_RADIUS) {
            p.xp += g.value;
            g.value = 0; /* mark consumed */
        }
    }
    state.gems = state.gems.filter((g) => g.value > 0);
}

export function needsLevelUp(state: GameState): boolean {
    return state.player.xp >= state.player.xpToNext;
}

/** After the player picks an upgrade: grant one level (XP bar chunk). */
export function tryConsumeLevelUp(state: GameState): boolean {
    const p = state.player;
    if (p.xp < p.xpToNext) return false;
    p.xp -= p.xpToNext;
    p.level += 1;
    p.xpToNext = xpThresholdForLevel(p.level);
    return true;
}

export function applyUpgrade(state: GameState, id: UpgradeId) {
    const cap = MAX_STACK[id];
    if (state.stacks[id] >= cap) return;
    state.stacks[id] += 1;
    if (id === 'max_hp') {
        const add = 14;
        state.player.maxHp += add;
        state.player.hp += add;
    }
}

export function resetRun(): GameState {
    return createInitialState();
}
