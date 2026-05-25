import { pgTable, serial, text, varchar, decimal, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  imageUrl: text('image_url'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  shortDescription: text('short_description'),
  categoryId: integer('category_id').references(() => categories.id),
  amazonUrl: text('amazon_url').notNull(),
  affiliateTag: varchar('affiliate_tag', { length: 50 }).default('benlanry-20'),
  imageUrl: text('image_url'),
  images: jsonb('images').$type<string[]>().default([]),
  price: decimal('price', { precision: 10, scale: 2 }),
  originalPrice: decimal('original_price', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('USD'),
  rating: decimal('rating', { precision: 3, scale: 1 }),
  reviewCount: integer('review_count').default(0),
  pros: jsonb('pros').$type<string[]>().default([]),
  cons: jsonb('cons').$type<string[]>().default([]),
  specs: jsonb('specs').$type<Record<string, string>>().default({}),
  isBestPick: boolean('is_best_pick').default(false),
  isDeal: boolean('is_deal').default(false),
  isActive: boolean('is_active').default(true),
  quickVerdict: text('quick_verdict'),
  fullReview: text('full_review'),
  whoIsItFor: text('who_is_it_for'),
  verdict: text('verdict'),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const deals = pgTable('deals', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id).notNull(),
  dealPrice: decimal('deal_price', { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal('original_price', { precision: 10, scale: 2 }),
  discountPercent: integer('discount_percent'),
  dealExpiresAt: timestamp('deal_expires_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  pushSubscription: jsonb('push_subscription'),
  isEmailActive: boolean('is_email_active').default(true),
  isPushActive: boolean('is_push_active').default(false),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
})

export const priceAlerts = pgTable('price_alerts', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  targetPrice: decimal('target_price', { precision: 10, scale: 2 }),
  notifiedAt: timestamp('notified_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export const comparisons = pgTable('comparisons', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: text('title').notNull(),
  productIds: jsonb('product_ids').$type<number[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
