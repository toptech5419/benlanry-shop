import 'dotenv/config'
import { db } from '../db'
import { categories } from '../db/schema'

const defaultCategories = [
  { name: 'Electronics', slug: 'electronics', description: 'Phones, laptops, tablets, and more', icon: '💻', sortOrder: 1 },
  { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Appliances, cookware, and home essentials', icon: '🏠', sortOrder: 2 },
  { name: 'Sports & Outdoors', slug: 'sports', description: 'Fitness gear, outdoor equipment, and activewear', icon: '🏃', sortOrder: 3 },
  { name: 'Beauty & Personal Care', slug: 'beauty', description: 'Skincare, haircare, and grooming', icon: '✨', sortOrder: 4 },
  { name: 'Fashion', slug: 'fashion', description: 'Clothing, shoes, and accessories', icon: '👗', sortOrder: 5 },
  { name: 'Books', slug: 'books', description: 'Bestsellers, educational, and fiction', icon: '📚', sortOrder: 6 },
  { name: 'Toys & Games', slug: 'toys', description: 'Toys, board games, and kids\' essentials', icon: '🎮', sortOrder: 7 },
  { name: 'Garden & Outdoor', slug: 'garden', description: 'Gardening tools, patio furniture, and outdoor living', icon: '🌱', sortOrder: 8 },
  { name: 'Health & Wellness', slug: 'health', description: 'Vitamins, supplements, and health devices', icon: '💊', sortOrder: 9 },
  { name: 'Smart Home', slug: 'smart-home', description: 'Smart speakers, security cameras, and automation', icon: '🏡', sortOrder: 10 },
]

async function seed() {
  console.log('Seeding categories...')
  for (const cat of defaultCategories) {
    await db.insert(categories).values(cat).onConflictDoNothing()
    console.log(`  ✓ ${cat.name}`)
  }
  console.log('Done!')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
