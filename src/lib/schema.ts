import { pgTable, text, integer, boolean, timestamp, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const organizations = pgTable("organizations", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  clerkOrgId: text("clerk_org_id").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  plan: text("plan").notNull().default("free"),
  queryLimit: integer("query_limit").notNull().default(50),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  clerkOrgIdx: uniqueIndex("orgs_clerk_org_id_idx").on(t.clerkOrgId),
}))

export const dataSources = pgTable("data_sources", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  orgId: text("org_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  connectionUrl: text("connection_url"),
  schemaCache: jsonb("schema_cache"),
  isDemo: boolean("is_demo").notNull().default(false),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  orgIdx: index("ds_org_id_idx").on(t.orgId),
}))

export const queries = pgTable("queries", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  orgId: text("org_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  dataSourceId: text("data_source_id").references(() => dataSources.id),
  naturalLanguage: text("natural_language").notNull(),
  generatedSql: text("generated_sql"),
  resultRows: integer("result_rows"),
  resultPreview: jsonb("result_preview"),
  chartType: text("chart_type"),
  // 3-layer analyst response
  whatHappened: text("what_happened"),
  whyItHappened: text("why_it_happened"),
  whatToDo: text("what_to_do"),
  estimatedImpact: text("estimated_impact"),
  executionMs: integer("execution_ms"),
  status: text("status").notNull().default("pending"),
  errorMessage: text("error_message"),
  isPinned: boolean("is_pinned").notNull().default(false),
  isShared: boolean("is_shared").notNull().default(false),
  shareToken: text("share_token"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  orgCreatedIdx: index("queries_org_created_idx").on(t.orgId, t.createdAt),
  shareTokenIdx: uniqueIndex("queries_share_token_idx").on(t.shareToken),
}))

export const dashboards = pgTable("dashboards", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  orgId: text("org_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Organization = typeof organizations.$inferSelect
export type DataSource = typeof dataSources.$inferSelect
export type Query = typeof queries.$inferSelect
