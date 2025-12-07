// Test API endpoints using Node.js fetch
const baseUrl = 'http://localhost:4000';

async function testAPI() {
  console.log('=== Testing Robotext API ===\n');
  
  // Test health check
  console.log('1. Testing Health Check...');
  try {
    const healthRes = await fetch(`${baseUrl}/health`);
    const health = await healthRes.json();
    console.log('   ✅ Health:', health);
  } catch (error) {
    console.log('   ❌ Health Check Failed:', error.message);
  }
  
  console.log('\n2. Testing Sign-Up...');
  const randomEmail = `testuser${Date.now()}@example.com`;
  try {
    const signupRes = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: randomEmail,
        password: 'password123'
      })
    });
    const signupData = await signupRes.json();
    console.log('   Status:', signupRes.status);
    console.log('   Response:', JSON.stringify(signupData, null, 2));
    
    if (signupRes.ok) {
      console.log('   ✅ Sign-Up Successful!');
      
      // Test sign-in with the same credentials
      console.log('\n3. Testing Sign-In...');
      const signinRes = await fetch(`${baseUrl}/api/auth/sign-in/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: randomEmail,
          password: 'password123'
        })
      });
      const signinData = await signinRes.json();
      console.log('   Status:', signinRes.status);
      console.log('   Response:', JSON.stringify(signinData, null, 2));
      
      if (signinRes.ok) {
        console.log('   ✅ Sign-In Successful!');
        
        // Get session cookie from response
        const setCookieHeader = signinRes.headers.get('set-cookie');
        console.log('\n4. Testing Get Session...');
        const sessionRes = await fetch(`${baseUrl}/api/auth/session`, {
          method: 'GET',
          headers: {
            'Cookie': setCookieHeader || ''
          }
        });
        const sessionData = await sessionRes.json();
        console.log('   Status:', sessionRes.status);
        console.log('   Response:', JSON.stringify(sessionData, null, 2));
      } else {
        console.log('   ❌ Sign-In Failed:', signinData);
      }
    } else {
      console.log('   ❌ Sign-Up Failed:', signupData);
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  console.log('\n=== Tests Complete ===');
}

testAPI();
