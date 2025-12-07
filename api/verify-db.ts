import { db } from './src/db/client.js';
import { sql } from 'drizzle-orm';
import 'dotenv/config';

async function verifyTables() {
  try {
    console.log('Checking database tables...\n');
    
    const result = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log('✅ Tables in database:');
    result.rows.forEach((row: any) => {
      console.log(`  - ${row.table_name}`);
    });
    
    console.log('\n✅ Database schema created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error verifying tables:', error);
    process.exit(1);
  }
}

verifyTables();
