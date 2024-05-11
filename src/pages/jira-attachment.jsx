import React, { useState } from 'react';
import Layout from '../layouts';
import axios from 'axios';

export default function Home() {
    const [csvFile, setCsvFile] = useState(null);
    const [folderFiles, setFolderFiles] = useState([]);

    const handleCsvChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const handleFolderChange = (event) => {
        setFolderFiles(Array.from(event.target.files));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!csvFile || !folderFiles.length) {
            alert('Please select CSV file and folder files.');
            return;
        }

        const formData = new FormData();
        formData.append('csv', csvFile);
        folderFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/api/server', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col w-auto bg-white border shadow-sm rounded-xl">
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800">Select the Attachment</h3>
                    <form className="max-w-sm py-2" onSubmit={handleSubmit}>
                        <label htmlFor="folder-input" className="block mb-1">Choose folder:</label>
                        <input
                            type="file"
                            name="folder-input"
                            id="folder-input"
                            className="w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-100 file:border-0 file:me-4 file:py-3 file:px-4"
                            directory=""
                            webkitdirectory=""
                            onChange={handleFolderChange}
                            multiple
                        />

                        <h3 className="text-lg font-bold text-gray-800 mt-4">Upload CSV File</h3>
                        <label htmlFor="csv-input" className="block mb-1">Choose CSV file:</label>
                        <input
                            type="file"
                            name="csv-input"
                            id="csv-input"
                            className="w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-100 file:border-0 file:me-4 file:py-3 file:px-4"
                            onChange={handleCsvChange}
                        />
                        <button type="submit" className="mt-4 py-3 px-10 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}



// import React, { useState } from 'react';

// const JiraAttachment = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!selectedFile) {
//       setError('Please select a file.');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('file', selectedFile);
  
//     setLoading(true);
//     setError(null);
  
//     try {
//       const response = await fetch('/api/upload', { // Use your backend URL
//         method: 'POST',
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to upload file');
//       }
  
//       setSuccess(true);
//     } catch (error) {
//       setError('Failed to upload file.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit" disabled={loading}>
//           Upload
//         </button>
//       </form>
//       {error && <div>Error: {error}</div>}
//       {success && <div>File uploaded successfully!</div>}
//     </div>
//   );
// };

// export default JiraAttachment;
