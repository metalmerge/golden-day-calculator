document.addEventListener('DOMContentLoaded', () => {
  let array = [
    { name: 'Religion', votes: 53, coalition: 'Blue' },
    { name: 'Motivation', votes: 37, coalition: 'Blue' },
    { name: 'Maintenance', votes: 37, coalition: 'Blue' },
    { name: '(Mental) Health', votes: 42, coalition: 'Red' },
    { name: 'Education', votes: 32, coalition: 'Blue' },
    { name: 'Sports', votes: 47, coalition: 'Blue' },
    { name: 'Exercise', votes: 41, coalition: 'Blue' },
    { name: 'Watch', votes: 20, coalition: 'Red' },
    { name: 'Work', votes: 50, coalition: 'Green' },
    // { name: 'Pomodomo', votes: 30, coalition: 'Blue' },
    { name: 'Streak', votes: 0, coalition: 'Green' },
    { name: 'Special Occasion', votes: 0, coalition: 'Green' },
    { name: 'Sleep', votes: 50, coalition: 'Red' },
    { name: 'Music', votes: 20, coalition: 'Red' },
    { name: 'Social', votes: 17, coalition: 'Red' },
    { name: 'Fun', votes: 6, coalition: 'Red' },
    { name: 'Programming', votes: 48, coalition: 'Blue' },
    { name: 'Knowledge', votes: 20, coalition: 'Blue' },
    { name: 'Finance', votes: 30, coalition: 'Green' },
  ];
  // Get references to the against and for lists in the HTML
  const againstItems = document.getElementById('againstItems');
  const forItems = document.getElementById('forItems');

  // Populate the initial against list with items from the array
  array.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name}: <span class="vote-count">${item.votes}</span></span>
      <button class="edit-button">Edit</button>
    `;
    li.setAttribute('data-coalition', item.coalition);
    li.addEventListener('click', () => switchList(li));
    againstItems.appendChild(li);
  });

  // Function to switch an item between the against and for lists
  function switchList(li) {
    const parentList = li.parentNode;
    const targetList = parentList.id === 'againstItems' ? forItems : againstItems;
    parentList.removeChild(li);
    targetList.appendChild(li);
  }

  // Get references to the calculate button and results container in the HTML
  const calculateButton = document.getElementById('calculateButton');
  const resultsContainer = document.getElementById('resultsContainer');

  // Add a click event listener to the calculate button
  calculateButton.addEventListener('click', () => {
    // Get the lists of items from the against and for lists
    const againstList = Array.from(againstItems.children);
    const forList = Array.from(forItems.children);

    // Calculate the total votes for against and for items
    const againstTotal = againstList.reduce((total, item) => {
      const votes = parseInt(item.querySelector('.vote-count').textContent);
      return total + votes;
    }, 0);

    const forTotal = forList.reduce((total, item) => {
      const votes = parseInt(item.querySelector('.vote-count').textContent);
      return total + votes;
    }, 0);

    const totalVotes = againstTotal + forTotal;

    // Calculate the percentages and results
    const againstPercentage = ((againstTotal / totalVotes) * 100).toFixed(0);
    const forPercentage = ((forTotal / totalVotes) * 100).toFixed(0);

    const againstResult = `${array.filter(item => item.coalition !== 'Green').length} ${againstPercentage}% (${againstTotal})`;
    const forResult = `${array.filter(item => item.coalition === 'Green').length} ${forPercentage}% (${forTotal})`;

    const totalResult = `${((forTotal / totalVotes) * 100).toFixed(0)}% ${forTotal}/${array.length}`;

    // Determine the classification based on the forPercentage
    let classification = '';
    if (forPercentage === '100') classification = 'Perfect Game';
    else if (forPercentage >= '75') classification = 'Rhodium Day';
    else if (forPercentage >= '67') classification = 'Titanium Day';
    else if (forPercentage >= '60') classification = 'Diamond Day';
    else if (forPercentage >= '51') classification = 'Golden Day';
    else classification = 'Limbo';

    // Generate the results for the for and against lists
    const forResults = forList
      .map(item => `${item.textContent.split(':')[0]}: ${((parseInt(item.querySelector('.vote-count').textContent) / totalVotes) * 100).toFixed(0)}% (${parseInt(item.querySelector('.vote-count').textContent)})`)
      .join('\n');

    const againstResults = againstList
      .map(item => `${item.textContent.split(':')[0]}: ${((parseInt(item.querySelector('.vote-count').textContent) / totalVotes) * 100).toFixed(0)}% (${parseInt(item.querySelector('.vote-count').textContent)})`)
      .join('\n');

    // Update the results container with the calculated results
    resultsContainer.innerHTML = `
        <p>${array.filter(item => item.coalition === 'Blue')[0].coalition} Vote ${forPercentage}% (${forTotal}/${forTotal + againstTotal})</p>
        <p>${array.filter(item => item.coalition === 'Red')[0].coalition} Vote ${againstPercentage}% (${againstTotal}/${forTotal + againstTotal})</p>
        <p>Total: ${((forTotal / totalVotes) * 100).toFixed(0)}% ${forTotal}/${totalVotes}</p>
        <p>${classification}</p>
        <p>For:</p>
        <pre>${forResults}</pre>
        <p>Against:</p>
        <pre>${againstResults}</pre>
      `;

    // Send the calculated data to the database
    sendDataToDatabase(forPercentage);
  });

  // Function to send the calculated data to the database
  function sendDataToDatabase(forPercentage) {
    const currentDate = new Date().toLocaleDateString('en-US');

    // Replace `YOUR_DATABASE_URL` with your Firebase Realtime Database URL
    const databaseURL = 'https://golden-days-42906-default-rtdb.firebaseio.com/';
    const endpointURL = `${databaseURL}/votes.json`;

    const data = JSON.stringify({
      forPercentage: `${forPercentage}% ${currentDate}`
    });

    // Send a POST request to the endpoint URL with the data
    fetch(endpointURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent successfully to the database');
        } else {
          throw new Error('Error sending data to the database');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Add event listeners to the edit buttons
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach(button => {
    button.addEventListener('click', event => {
      const listItem = event.target.parentNode;
      const voteCount = listItem.querySelector('.vote-count');
      const itemName = listItem.textContent.split(':')[0];

      const newVoteCount = prompt(`Enter new vote count for ${itemName}:`, voteCount.textContent);
      if (newVoteCount !== null) {
        const parsedVoteCount = parseInt(newVoteCount);
        if (!isNaN(parsedVoteCount)) {
          voteCount.textContent = parsedVoteCount;
        }
      }
    });
  });


});