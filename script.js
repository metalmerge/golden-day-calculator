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
    const totalsResult = document.getElementById('totalsResult');
  
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
      
      totalsResult.textContent = `Against Total: ${againstTotal} | For Total: ${forTotal}`;
    });
  });
  