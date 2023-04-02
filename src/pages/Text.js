import React, { useState } from 'react';
import Sentiment from 'sentiment';

const Text = () => {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState('')
    const [sentimentData, setSentimentData] = useState([])
    const sentiment = new Sentiment();
    const handleFileSelect = (event) => {
        setLoading(true)
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("page", "1");
        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': '8e26854509msh49a75b197e64648p140485jsn9d4e00fb2be9',
                'X-RapidAPI-Host': 'pdf-to-text-converter.p.rapidapi.com'
            },
            body: data
        };

        fetch('https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert', options)
            .then(response => response.text())
            .then(response => {
                const normalText = response;
                const convertedText = normalText.replace(/^\s+|\s+$/g, '');
                const trimmeedText = convertedText.trim()
                setText(trimmeedText)
                const resultSentiment = sentiment.analyze(trimmeedText)
                setSentimentData(resultSentiment)
                setLoading(false)
                console.log(sentimentData)
            })
            .catch(err => console.error(err));
    };

    return (
       
        <div className='h-[800px]'>
            <div className="flex flex-col items-center justify-center h-[500px]">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <label
                        htmlFor="file-input"
                        className="block text-xl text-gray-600 mb-4 text-center"
                    >
                        Upload an File {loading}
                    </label>
                    <input type="file" accept='.pdf' onChange={handleFileSelect}
                        className="block bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    />

                </div>
            </div>
            {
                loading == '' ? '' : 
                loading ? <p className='text-sm animate-pulse text-white block flex  z-[999]' > 
                        <img src='./loader.gif' width={'100px'} className="relative bottom-7" />
                            Please wait while we analyze your pdf to provide accurate output, more concise version. This may take a few moments, but we promise it will be worth it!....... 
                        </p> 
                :
                    <div id="sentimentData" className='mt-[50px] h-[100vh]'>
                        <h1 className='text-2xl underline text-center mb-5 font-medium'> Generated Output:</h1>
                        {text}
                        <hr className='mt-10' />
                        <h1 className='mt-5 font-bold text-center text-3xl'>Sentiment Score: {sentimentData.score}</h1>
                        <div className='flex flex-row gap-[20px] justify-center p-5 '>
                            {
                                sentimentData.score > 0 ? <div className='flex justify-center items-center relative'>
                                    <img src='./happy.gif' className='w-28' alt="Positive" />
                                    <p className='absolute -bottom-5'>Positive</p>
                                </div> :
                                    sentimentData.score === 0 ? <div className='flex justify-center items-center relative'>
                                        <img src='./neutral.gif' className='w-28' alt="Neutral" />
                                        <p className='absolute -bottom-5'>Neutral</p>
                                    </div> :
                                        sentimentData.score < 0 ? <div className='flex justify-center items-center relative'>
                                            <img src='./sad.gif' className='w-28' alt="sad" />
                                            <p className='absolute -bottom-5'>Negative</p>
                                        </div> :
                                            <p className='text-red-500'>Something Went Wrong</p>
                            }
                        </div>
                    </div>
            }

        </div>
    );
};

export default Text;
