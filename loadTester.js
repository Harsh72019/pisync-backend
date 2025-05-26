const axios = require("axios");
const { faker } = require("@faker-js/faker");

// CONFIG
const TOTAL_REQUESTS = 5000; 
const API_URL = "http://localhost:5000/api/sync-event";

function generateSyncEvent() {
  return {
    deviceId: faker.string.uuid(),
    timestamp: new Date().toISOString(),
    totalFilesSynced: faker.number.int({ min: 1, max: 100 }),
    totalErrors: faker.number.int({ min: 0, max: 5 }),
    internetSpeed: faker.number.float({ min: 0.5, max: 100, precision: 0.1 }),
  };
}

async function runTest() {
  let success = 0;
  let failure = 0;

  const requests = Array.from({ length: TOTAL_REQUESTS }, async () => {
    const data = generateSyncEvent();
    try {
      const response = await axios.post(API_URL, data);
      if (response.status === 202 || response.status === 201) {
        success++;
      } else {
        failure++;
        console.log("Non-201/202 Response:", response.status);
      }
    } catch (err) {
      failure++;
      console.error("Request failed:", err.message);
    }
  });

  await Promise.all(requests);
  console.log(`\n✅ Test Completed: ${success} succeeded, ❌ ${failure} failed`);
}

runTest();
