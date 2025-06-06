const { PrismaClient } = require('./app/generated/prisma')
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Testing Marketing SaaS Database Connection...\n')
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Test creating a user
    const testUser = await prisma.user.create({
      data: {
        email: 'jose@test.com',
        name: 'Jose (Test User)',
        role: 'ADMIN'
      }
    })
    console.log('✅ Created test user:', testUser)
    
    // Test creating an account
    const testAccount = await prisma.account.create({
      data: {
        name: 'Marketing SaaS Test Account',
        plan: 'STARTER',
        ownerId: testUser.id
      }
    })
    console.log('✅ Created test account:', testAccount)
    
    // Test creating a campaign
    const testCampaign = await prisma.campaign.create({
      data: {
        name: 'Holiday Marketing Campaign',
        description: 'Q4 holiday promotion campaign',
        status: 'DRAFT',
        budget: 5000.00,
        accountId: testAccount.id,
        creatorId: testUser.id
      }
    })
    console.log('✅ Created test campaign:', testCampaign)
    
    // Test analytics
    const testAnalytics = await prisma.analytics.create({
      data: {
        campaignId: testCampaign.id,
        impressions: 1000,
        clicks: 50,
        conversions: 5,
        cost: 100.50
      }
    })
    console.log('✅ Created test analytics:', testAnalytics)
    
    // Count all records
    const userCount = await prisma.user.count()
    const accountCount = await prisma.account.count()
    const campaignCount = await prisma.campaign.count()
    const analyticsCount = await prisma.analytics.count()
    
    console.log('\n📊 Database Summary:')
    console.log(`   Users: ${userCount}`)
    console.log(`   Accounts: ${accountCount}`)
    console.log(`   Campaigns: ${campaignCount}`)
    console.log(`   Analytics Records: ${analyticsCount}`)
    
    console.log('\n🎉 All tests passed! Your marketing SaaS database is ready!')
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()