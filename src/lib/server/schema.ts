import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const users = sqliteTable('users', {
  id: integer(),
  githubId: integer('github_id').notNull().primaryKey(),
    githubLogin: text('github_login').notNull(),
    githubAvatarUrl: text('github_avatar_url').notNull(),
  
});
