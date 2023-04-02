import React, {useState} from 'react'
import Tesseract from 'tesseract.js';
import Sentiment from 'sentiment';

const ImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setSentiment] = useState([]);
  const [loading, setLoading] = useState('')
  const sentiment = new Sentiment();

  const handleImageUpload = async (event) => {
    setLoading(true)
    const file = event.target.files[0];
    setSelectedFile(file)
    window.scrollTo(0, 700);
  
    let result, textWithIndent;
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/webp') {
      result = await Tesseract.recognize(file, 'eng');
      textWithIndent = result.data.text.replace(/\n/g, '\n    ');
    } else {
      setLoading(false);
      return alert('Unsupported file format!');
    }
  
    const resultSentiment = sentiment.analyze(textWithIndent)
    setSentiment(resultSentiment)
    setLoading(false)
  };
  
  return (
    <div className='h-[800px]'>
        <div className="flex flex-col items-center justify-center h-[500px]">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <label
          htmlFor="file-input"
          className="block text-xl text-gray-600 mb-4 text-center"
        >
          Upload an Image
        </label>
        <input type="file" onChange={handleImageUpload}
        className="block bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <div className="flex justify-center items-center">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected file"
              className="w-44 h-auto mt-5 object-cover"
            />
          ) : (
            <div className="w-48 h-48 mt-5 border-4 border-gray-300 rounded-lg flex justify-center items-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l6 6m0 0l-6 6m6-6V4"
                />
              </svg>
            </div>
          )}
        </div>
       
      </div>
    </div>
      
      {
        loading === '' ?  '' : loading ? <p className='text-sm animate-pulse  block flex relative top-[100px]' > <img src='./loader.gif' width={'100px'} className="relative bottom-7" />Please wait while we analyze your image to provide accurate output, more concise version. This may take a few moments, but we promise it will be worth it!....... </p> : 
       <div id="sentimentData" className='mt-[60px] h-[100vh]'>
        <h1 className='text-2xl underline text-center mb-5 font-medium'> Generated Output:</h1>
        <h1 className=' text-xl mb-4 whitespace-pre-wrap text-justify'>{data.tokens?.map(str => str.split('').join('')).join(' ')}</h1>
        <hr></hr>
          <h1 className='mt-5 font-bold text-center text-3xl'>Sentiment Score: {data.score}</h1>
          <div className='flex flex-row gap-[20px] justify-center p-5 '>
          {
            data.score > 0 ? <div className='flex justify-center items-center relative'> 
              <img src='./happy.gif' className='w-28' alt="Positive" />
              <p className='absolute -bottom-5'>Positive</p>
            </div> :
            data.score === 0 ? <div className='flex justify-center items-center relative'> 
            <img src='./neutral.gif' className='w-28' alt="Neutral" />
            <p className='absolute -bottom-5'>Neutral</p>
          </div> : 
            data.score < 0 ? <div className='flex justify-center items-center relative'> 
            <img src='./sad.gif' className='w-28' alt="sad" />
            <p className='absolute -bottom-5'>Negative</p>
          </div> :
            <p className='text-red-500'>Something Went Wrong</p>
          }
          </div>
       </div>
      }

    </div>
  )
}

export default ImageAnalysis