async function executeQuery() {
    const query = document.getElementById('query').value;
  
    const response = await fetch('/execute-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
    });
  
    const result = await response.json();
    document.getElementById('result').textContent = JSON.stringify(result, null, 2);
  }
  