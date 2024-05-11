import React, { useState } from 'react';
import Layout from '../layouts';

export default function Home() {
    return (
        <Layout>
            <div className="flex flex-col w-auto bg-white border shadow-sm rounded-xl">
                <div className="p-4 md:p-5">
                    {/* Folder Directory for Attachments */}
                    <h3 className="text-lg font-bold text-gray-800">
                        Select the Attachment
                    </h3>
                    <form className="max-w-sm py-2" >
                        <label htmlFor="folder-input" className="block mb-1">Choose folder:</label>
                        <input
                            type="file"
                            name="folder-input"
                            id="folder-input"
                            className="w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-100 file:border-0 file:me-4 file:py-3 file:px-4"
                            directory=""
                            webkitdirectory=""
                        />

                        {/* Upload CSV File */}
                        <h3 className="text-lg font-bold text-gray-800 mt-4">
                            Upload CSV File
                        </h3>
                        <label htmlFor="csv-input" className="block mb-1">Choose CSV file:</label>
                        <input
                            type="file"
                            name="csv-input"
                            id="csv-input"
                            className="w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-100 file:border-0 file:me-4 file:py-3 file:px-4"
                        />
                        <button type="submit" className="mt-4 py-3 px-10 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
