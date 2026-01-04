const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001/api';

async function testFeedbackAPI() {
  console.log('🧪 Testing Feedback API...\n');

  try {
    // Test 1: Get all feedback (should return empty array initially)
    console.log('1. Testing GET /api/feedback...');
    const getResponse = await fetch(`${BASE_URL}/feedback`);
    const getData = await getResponse.json();
    console.log('✅ GET Response:', getData);
    console.log('Status:', getResponse.status);
    console.log('');

    // Test 2: Create new feedback
    console.log('2. Testing POST /api/feedback...');
    const postResponse = await fetch(`${BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'testuser',
        feedback: 'This is a test feedback from the backend test script!'
      })
    });
    const postData = await postResponse.json();
    console.log('✅ POST Response:', postData);
    console.log('Status:', postResponse.status);
    console.log('');

    // Test 3: Get all feedback again (should now have 1 item)
    console.log('3. Testing GET /api/feedback again...');
    const getResponse2 = await fetch(`${BASE_URL}/feedback`);
    const getData2 = await getResponse2.json();
    console.log('✅ GET Response:', getData2);
    console.log('Status:', getResponse2.status);
    console.log('');

    // Test 4: Get feedback by username
    console.log('4. Testing GET /api/feedback/testuser...');
    const getUserResponse = await fetch(`${BASE_URL}/feedback/testuser`);
    const getUserData = await getUserResponse.json();
    console.log('✅ GET by username Response:', getUserData);
    console.log('Status:', getUserResponse.status);
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

// Run the test
testFeedbackAPI();
