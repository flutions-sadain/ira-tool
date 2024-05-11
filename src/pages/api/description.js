import axios from 'axios';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get(
          'https://sadain-abdullah.atlassian.net/rest/api/2/search?jql=project%3DSAN',
          {
            auth: {
              username: '',
              password: ''
            }
          }
        );
        const keys = response.data.issues.map((issue) => issue.key);
        res.status(200).json(keys);
      } catch (error) {
        console.error('Error fetching issue keys:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'PUT':
      try {
        const { issueKey, description } = req.body;
        await axios.put(
          `https://sadain-abdullah.atlassian.net/rest/api/2/issue/${issueKey}`,
          {
            fields: {
              description: description
            }
          },
          {
            auth: {
              username: '',
              password: ''
            }
          }
        );
        res.status(200).json({ message: 'Description updated successfully' });
      } catch (error) {
        console.error('Error updating description:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
