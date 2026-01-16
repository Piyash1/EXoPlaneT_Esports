/**
 * Simple API Test Script
 * Run with: bun scripts/test-api.ts
 */

const BASE_URL = "http://localhost:3000/api";

async function testEndpoint(
  name: string,
  path: string,
  method = "GET",
  body?: any,
) {
  console.log(`\n--- Testing ${name} [${method} ${path}] ---`);
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${path}`, options);
    const data = await res.json();

    console.log(`Status: ${res.status}`);
    console.log(`Success: ${data.success}`);
    if (!data.success) {
      console.log(`Error: ${data.error}`);
      if (data.details)
        console.log(`Details:`, JSON.stringify(data.details, null, 2));
    } else {
      console.log(
        `Data:`,
        JSON.stringify(data.data, null, 2).substring(0, 200) + "...",
      );
    }
    return data;
  } catch (error) {
    console.error(
      `Failed to test ${name}:`,
      error instanceof Error ? error.message : error,
    );
  }
}

async function runTests() {
  console.log("Starting Backend API Tests...");
  console.log("Ensure your dev server is running on http://localhost:3000");

  // 1. Test Games
  const game = await testEndpoint("Create Game", "/games", "POST", {
    name: "PUBG Mobile",
    type: "Mobile",
  });

  await testEndpoint("Fetch Games", "/games");

  if (game?.success) {
    const gameId = game.data.id;

    // 2. Test Teams
    await testEndpoint("Create Team", "/teams", "POST", {
      name: "Exoplanet Alpha",
      gameId: gameId,
      logoUrl: "https://example.com/logo.png",
    });

    await testEndpoint("Fetch Teams", "/teams");
    await testEndpoint("Fetch Teams by Game", `/teams?gameId=${gameId}`);
  }

  // 3. Test Tryouts
  await testEndpoint("Submit Tryout", "/tryouts", "POST", {
    name: "John Doe",
    email: "john@example.com",
    ign: "Exo_John",
    game: "PUBG Mobile",
    discord: "john#1234",
  });

  await testEndpoint("Fetch Tryouts", "/tryouts");

  console.log("\n--- Tests Completed ---");
}

runTests();
