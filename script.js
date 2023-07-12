document.addEventListener('DOMContentLoaded', () => {
    const array = [
      { name: 'Religion', votes: 53, coalition: 'Blue' },
      { name: 'Motivation', votes: 37, coalition: 'Blue' },
      { name: 'Maintenance', votes: 37, coalition: 'Blue' },
      { name: 'Mental', votes: 42, coalition: 'Red' },
      { name: 'Education', votes: 32, coalition: 'Blue' },
      { name: 'Sports', votes: 47, coalition: 'Blue' },
      { name: 'Exercise', votes: 41, coalition: 'Blue' },
      { name: 'Watch', votes: 20, coalition: 'Red' },
      { name: 'Work', votes: 50, coalition: 'Green' },
      { name: 'Pomodomo', votes: 30, coalition: 'Blue' },
      { name: 'Invest', votes: 0, coalition: 'Green' },
      { name: 'Streak', votes: 0, coalition: 'Green' },
      { name: 'Sleep', votes: 50, coalition: 'Red' },
      { name: 'Music', votes: 20, coalition: 'Red' },
      { name: 'Social', votes: 17, coalition: 'Red' },
      { name: 'Fun', votes: 6, coalition: 'Red' },
      { name: 'Programming', votes: 48, coalition: 'Blue' },
      { name: 'Knowledge', votes: 20, coalition: 'Blue' }
    ];
  
    const againstItems = document.getElementById('againstItems');
    const forItems = document.getElementById('forItems');
  
    // Populate initial against list
    array.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name}: ${item.votes}`;
      li.setAttribute('data-coalition', item.coalition);
      li.addEventListener('click', () => switchList(li));
      againstItems.appendChild(li);
    });
  
    function switchList(li) {
      const parentList = li.parentNode;
      const targetList = parentList.id === 'againstItems' ? forItems : againstItems;
      parentList.removeChild(li);
      targetList.appendChild(li);
    }
  
    const calculateButton = document.getElementById('calculateButton');
    const resultsContainer = document.getElementById('resultsContainer');
  
    calculateButton.addEventListener('click', () => {
      const againstList = Array.from(againstItems.children);
      const forList = Array.from(forItems.children);
      
      const againstTotal = againstList.reduce((total, item) => {
        const votes = parseInt(item.textContent.split(':')[1].trim());
        return total + votes;
      }, 0);
      
      const forTotal = forList.reduce((total, item) => {
        const votes = parseInt(item.textContent.split(':')[1].trim());
        return total + votes;
      }, 0);
      
      const totalVotes = againstTotal + forTotal;
      
      const againstPercentage = ((againstTotal / totalVotes) * 100).toFixed(0);
      const forPercentage = ((forTotal / totalVotes) * 100).toFixed(0);
      
      const againstResult = `${array.filter(item => item.coalition !== 'Green').length} ${againstPercentage}% (${againstTotal})`;
      const forResult = `${array.filter(item => item.coalition === 'Green').length} ${forPercentage}% (${forTotal})`;
      
      const totalResult = `${((forTotal / totalVotes) * 100).toFixed(0)}% ${totalVotes}/${array.length}`;
      
      let classification = 'Limbo';
      if (forPercentage === '100') classification = 'Perfect Game';
      else if (forPercentage >= '75') classification = 'Rhodium Day';
      else if (forPercentage >= '67') classification = 'Titanium Day';
      else if (forPercentage >= '60') classification = 'Diamond Day';
      else if (forPercentage >= '51') classification = 'Golden Day';
      
      const coalitionResults = array.reduce((result, item) => {
        if (item.coalition === 'Green') return result;
        return `${result}${item.name}: ${((item.votes / totalVotes) * 100).toFixed(0)}% (${item.votes})\n`;
      }, '');
      
      resultsContainer.innerHTML = `
        <p>${againstResult}</p>
        <p>${forResult}</p>
        <p>Total: ${totalResult}</p>
        <p>${classification}</p>
        <p>For:</p>
        <pre>${coalitionResults}</pre>
      `;
    });
  });
  