const { v1: uuidv1, v3: uuidv3, v4: uuidv4, v5: uuidv5 } = require('uuid');
const readline = require('readline');

// NIL UUID (all zeros)
const uuidNil = '00000000-0000-0000-0000-000000000000';

// Namespace for v3 and v5 UUIDs
const namespace = uuidv4(); // You could use a static namespace UUID here if needed

// Setup readline for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to generate UUID based on user input
function generateUUID(version) {
  switch (version) {
    case 'nil':
      return uuidNil;
    case '1':
      return uuidv1();
    case '3':
      return uuidv3('example', namespace);
    case '4':
      return uuidv4();
    case '5':
      return uuidv5('example', namespace);
    default:
      return 'Invalid version. Please enter nil, 1, 3, 4, or 5.';
  }
}

// Prompt the user for the UUID version
rl.question('Enter the UUID version (nil, 1, 3, 4, or 5): ', (version) => {
  const uuid = generateUUID(version.toLowerCase());
  console.log(`Generated UUID (v${version}):`, uuid);
  rl.close();
});
