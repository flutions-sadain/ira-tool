import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import csv from 'csv-parser';
import fs from 'fs';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Jira API credentials
const jiraBaseUrl = '';
const jiraUsername = '';
const jiraApiToken = '';

app.post('/api/server', async (req, res) => {
    try {
        const { csv: csvFile, files } = req.files;

        // Read CSV file and extract key-filename mappings
        const keyFilenameMappings = await new Promise((resolve, reject) => {
            const mappings = {};
            fs.createReadStream(csvFile.tempFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    const key = row.key;
                    const filenames = row.filenames.split(',').map(filename => filename.trim());
                    mappings[key] = filenames;
                })
                .on('end', () => {
                    resolve(mappings);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });

        console.log('Key-filename mappings:', keyFilenameMappings);

        // Attach files to Jira issues based on key-filename mappings
        const attachmentResponses = [];
        for (const [key, filenames] of Object.entries(keyFilenameMappings)) {
            const issueKey = key; // Assuming the key in the CSV file is the issue key in Jira

            const jiraApiUrl = `${jiraBaseUrl}/rest/api/2/issue/${issueKey}/attachments`;
            const auth = Buffer.from(`${jiraUsername}:${jiraApiToken}`).toString('base64');

            const promises = filenames.map(async (filename) => {
                const file = files.find(file => file.name === filename);
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await fetch(jiraApiUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Basic ${auth}`,
                            'Accept': 'application/json'
                        },
                        body: formData
                    });

                    const responseData = await response.json();
                    return responseData;
                }
            });

            attachmentResponses.push(...(await Promise.all(promises)));
        }

        console.log('Attachment responses:', attachmentResponses);

        res.send('Files attached to Jira successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
