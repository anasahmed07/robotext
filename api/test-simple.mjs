// Simple test - run with: node test-simple.mjs
const testEmail = `test${Date.now()}@example.com`;
let sessionCookie = '';

console.log('Testing API at http://localhost:4000');
console.log('Test email:', testEmail);
console.log('---');

// Test Health
console.log('\n1. Health Check');
try {
  const healthRes = await fetch('http://localhost:4000/health');
  console.log('Status:', healthRes.status);
  console.log('Response:', await healthRes.text());
} catch (e) {
  console.log('Error:', e.message);
}

// Test Sign-Up
console.log('\n2. Sign Up');
try {
  const signupRes = await fetch('http://localhost:4000/api/auth/sign-up/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: testEmail,
      password: 'password123'
    })
  });
  console.log('Status:', signupRes.status);
  const signupData = await signupRes.json();
  console.log('Response:', JSON.stringify(signupData, null, 2));
  
  // Save cookie for session test
  sessionCookie = signupRes.headers.get('set-cookie') || '';
  console.log('Session Cookie:', sessionCookie ? 'Received' : 'None');
} catch (e) {
  console.log('Error:', e.message);
}

// Test Sign-In
console.log('\n3. Sign In');
try {
  const signinRes = await fetch('http://localhost:4000/api/auth/sign-in/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      password: 'password123'
    })
  });
  console.log('Status:', signinRes.status);
  const signinData = await signinRes.json();
  console.log('Response:', JSON.stringify(signinData, null, 2));
  
  // Update cookie
  sessionCookie = signinRes.headers.get('set-cookie') || sessionCookie;
} catch (e) {
  console.log('Error:', e.message);
}

// Test Get Session
console.log('\n4. Get Session');
try {
  const sessionRes = await fetch('http://localhost:4000/api/auth/get-session', {
    headers: { 
      'Cookie': sessionCookie ? sessionCookie.split(';')[0] : '',
      'Origin': 'http://localhost:3000'
    }
  });
  console.log('Status:', sessionRes.status);
  const text = await sessionRes.text();
  console.log('Response:', text || '(empty/null session)');
} catch (e) {
  console.log('Error:', e.message);
}

// Test Sign-Out
console.log('\n5. Sign Out');
try {
  const signoutRes = await fetch('http://localhost:4000/api/auth/sign-out', {
    method: 'POST',
    headers: { 
      'Cookie': sessionCookie ? sessionCookie.split(';')[0] : '',
      'Origin': 'http://localhost:3000'
    }
  });
  console.log('Status:', signoutRes.status);
  const text = await signoutRes.text();
  console.log('Response:', text || '(empty)');
} catch (e) {
  console.log('Error:', e.message);
}

console.log('\n=== All Tests Complete ===');
