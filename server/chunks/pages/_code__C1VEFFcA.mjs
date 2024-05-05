import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { like, eq } from '@astrojs/db/dist/runtime/virtual.js';

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN, {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://talingo.github.io", "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const User = asDrizzleTable("User", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true } }, "email": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "email", "collection": "User", "primaryKey": false, "optional": false } }, "name": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "name", "collection": "User", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const ShortenedUrl = asDrizzleTable("ShortenedUrl", { "columns": { "userId": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "ShortenedUrl", "primaryKey": false, "optional": true, "references": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true } } } }, "url": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "url", "collection": "ShortenedUrl", "primaryKey": false, "optional": false } }, "code": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "code", "collection": "ShortenedUrl", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

const getUserByEmail = async (email) => {
  try {
    const res = await db.select().from(User).where(
      like(User.email, email)
    );
    if (res.length === 0) {
      return {
        success: true,
        data: null
      };
    }
    return {
      success: true,
      data: res[0]
    };
  } catch (e) {
    const error = e;
    return {
      success: false,
      error: error.message
    };
  }
};
const getLinkUrl = async (code) => {
  try {
    const res = await db.select().from(ShortenedUrl).where(
      like(ShortenedUrl.code, code)
    );
    if (res.length === 0) {
      return {
        success: true,
        data: null
      };
    }
    return {
      success: true,
      data: res[0].url
    };
  } catch (e) {
    const error = e;
    return {
      success: false,
      error: error.message
    };
  }
};
const getUrlsFromUser = async (userId) => {
  try {
    const res = await db.select({
      url: ShortenedUrl.url,
      code: ShortenedUrl.code
    }).from(ShortenedUrl).where(
      eq(ShortenedUrl.userId, userId)
    );
    return {
      success: true,
      data: res
    };
  } catch (e) {
    const error = e;
    return {
      success: false,
      error: error.message
    };
  }
};

const GET = async ({ params }) => {
  const { code } = params;
  if (!code) {
    return new Response(null, {
      status: 400
    });
  }
  const url = await getLinkUrl(code);
  if (!url.success) {
    return new Response(null, {
      status: 500
    });
  }
  if (!url.data) {
    return new Response(null, {
      status: 404
    });
  }
  return new Response(null, {
    status: 307,
    headers: {
      "Location": url.data
    }
  });
};

const _code_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

export { ShortenedUrl as S, User as U, _code_ as _, getUrlsFromUser as a, db as d, getUserByEmail as g };
