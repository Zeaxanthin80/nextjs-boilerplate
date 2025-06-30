// test-database.js
const { PrismaClient } = require("./app/generated/prisma");

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log("🔍 Testing database connection...");

    // Test connection
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

    // Create test user
    const testUser = await prisma.user.create({
      data: {
        email: "test@marketingsaas.com",
        name: "Test User",
        role: "USER",
      },
    });
    console.log("✅ Test user created:", testUser);

    // Create test account
    const testAccount = await prisma.account.create({
      data: {
        name: "Test Marketing Account",
        plan: "FREE",
        ownerId: testUser.id,
      },
    });
    console.log("✅ Test account created:", testAccount);

    // Create test campaign
    const testCampaign = await prisma.campaign.create({
      data: {
        name: "Welcome Campaign",
        description: "Test marketing campaign",
        status: "DRAFT",
        accountId: testAccount.id,
        creatorId: testUser.id,
      },
    });
    console.log("✅ Test campaign created:", testCampaign);

    // Add analytics
    const testAnalytics = await prisma.analytics.create({
      data: {
        campaignId: testCampaign.id,
        impressions: 1000,
        clicks: 50,
        conversions: 5,
        cost: 25.0,
      },
    });
    console.log("✅ Test analytics created:", testAnalytics);

    console.log("🎉 All database operations working correctly!");
  } catch (error) {
    console.error("❌ Database test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
