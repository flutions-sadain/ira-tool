import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layouts';

export default function JiraDescription() {
    const [description, setDescription] = useState('');
    const [issueKeys, setIssueKeys] = useState([]);
    const [selectedIssueKey, setSelectedIssueKey] = useState('');

    useEffect(() => {
        fetchIssueKeys();
    }, []);

    const fetchIssueKeys = async () => {
        try {
            const response = await axios.get('/api/description');
            setIssueKeys(response.data);
            setSelectedIssueKey(response.data[0]);
        } catch (error) {
            console.error('Error fetching issue keys:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/description', {
                issueKey: selectedIssueKey,
                description: description
            });
            console.log('Description updated successfully');
            setDescription('');
            setSelectedIssueKey(issueKeys[0]);
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col w-auto bg-white border shadow-sm rounded-xl">
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800">
                        Change Description
                    </h3>
                    <form className="max-w-sm py-2" onSubmit={handleSubmit}>
                        <label htmlFor="description" className="block text-md font-bold text-gray-800 mb-2">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            className="py-4 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Write Description to the Issue'
                        />
                        <label htmlFor="issueKey" className="block text-md font-bold text-gray-800 mb-2">Select Issue Key:</label>
                        <select
                            id="issueKey"
                            className="py-4 px-4 pe-9 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            value={selectedIssueKey}
                            onChange={(e) => setSelectedIssueKey(e.target.value)}
                        >
                            {issueKeys.map((key) => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>
                        <button type="submit" className="mt-4 py-3 px-10 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
