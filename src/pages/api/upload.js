const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000; // Choose any available port

app.use(express.json());

app.post('/api/upload', async (req, res) => {
  const { file } = req.body;

  try {
    const response = await fetch('https://sadain-abdullah.atlassian.net/rest/api/3/issue/SAN-1/attachments', {
      method: 'POST',
      body: file,
      headers: {
        'Authorization': `Basic ${Buffer.from('email:token').toString('base64')}`,
        'X-Atlassian-Token': 'nocheck',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
