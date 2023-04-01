import React, { useState } from 'react'
import axios from "axios";
import Sentiment from 'sentiment';
import { countWords } from '../utils';

const Home = () => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false);
  const [summarize, setsummarize] = useState('')
  const [Score, setScore] = useState(null);

  const [synth, setSynth] = useState(window.speechSynthesis);
  const [voice, setVoice] = useState(null);
  const sentiment = new Sentiment();

  const createSummarizeParams = (text, numSentences) => {
    const params = {
      text,
      num_sentences: numSentences
    };
    return JSON.stringify(params);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('showSummary').classList.add('hidden')
    setLoading(true)
    const options = {
      method: 'POST',
      url: 'https://gpt-summarization.p.rapidapi.com/summarize',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '8e26854509msh49a75b197e64648p140485jsn9d4e00fb2be9',
        'X-RapidAPI-Host': 'gpt-summarization.p.rapidapi.com'
      },
      data: createSummarizeParams(text, 10)
    };
    
    axios.request(options).then(function (response) {
      setsummarize(response.data.summary)
      const result = sentiment.analyze(response.data.summary);
      setScore(result.score)
      setLoading(false);
      document.getElementById('showSummary').classList.remove('hidden')
      
    }).catch(function (error) {
      console.error(error);
    });


  }


  const handleVoiceChange = (event) => {
    const selectedVoice = synth.getVoices()[event.target.value];
    setVoice(selectedVoice);
  };

  const handleSpeak = () => {
    if (text !== '') {
      const utterance = new SpeechSynthesisUtterance(summarize);
      utterance.voice = voice;
      synth.speak(utterance);
    }
  };

  const handleStop = () => {
    synth.cancel();
  };

  console.log(countWords(text))
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base text-gray-400 font-semibold tracking-wide uppercase">Welcome to</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-800 sm:text-4xl">
            Text Summarization
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-3xl rounded-lg shadow-lg">
            <div className="bg-white rounded-lg px-4 py-4 sm:p-6">
              <div className="flex flex-col">
                <div className='flex flex-row justify-between'>
                  <div>
                    <label for="textMessage" className="leading-7 font-medium text-gray-900">Paste your text</label>  
                  </div>
                  <div>
                    <h3>Words Entered : {countWords(text)}</h3>
                  </div>
                </div>
                <textarea
                  rows={14}
                  cols={80}
                  placeholder="Please note: A minimum of 200 words are allowed for this section."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-textarea mt-2 border-2 p-2"
                />
              </div>
              <div>

              </div>
              <div className="flex justify-end mt-4">
                {
                  countWords(text) > 200 ? 
                  loading ? <p className='text-sm animate-pulse  block flex mb-4' > <img src='./loader.gif' width={'100px'} className="relative bottom-7" />Please wait while we summarize your longer text into a shorter, more concise version. This may take a few moments, but we promise it will be worth it!....... </p> :
                    <button type="button" className={` 'hidden'} bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded`} onClick={handleSubmit}>
                      Summarize
                    </button> : ''
                }
              </div>

              <div className={`hidden`} id='showSummary'>
                    <h2 className='text-2xl font-bold mb-2'> Summarized Text</h2>
                    <select className='appearance-none bg-gray-100 border rounded p-2 text-gray-700 mr-2' onChange={handleVoiceChange}>
                      {synth && synth.getVoices().map((voice, index) => (
                        <option key={index} value={index}>
                          {`${voice.name} (${voice.lang})`}
                        </option>
                      ))}
                    </select>

                    <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded' onClick={handleSpeak}>Speak</button>

                    <button className='ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={handleStop}>Stop</button>
                    <p className='text-justify mt-5 mb-5'>{summarize}</p>
                    <hr></hr>
                    <h1 className='mt-5 font-bold text-center text-3xl'>Sentiment Score: {Score}</h1>
                    <div className='flex flex-row gap-[20px] justify-center p-5'>
                     {
                      Score > 0 ? <div className='flex justify-center items-center relative'> 
                        <img src='./happy.gif' className='w-28' alt="Positive" />
                        <p className='absolute -bottom-5'>Positive</p>
                      </div> :
                      Score === 0 ? <div className='flex justify-center items-center relative'> 
                      <img src='./neutral.gif' className='w-28' alt="Neutral" />
                      <p className='absolute -bottom-5'>Neutral</p>
                    </div> : 
                      Score < 0 ? <div className='flex justify-center items-center relative'> 
                      <img src='./sad.gif' className='w-28' alt="sad" />
                      <p className='absolute -bottom-5'>Negative</p>
                    </div> :
                      <p className='text-red-500'>Something Went Wrong</p>
                     }
                    </div>
            

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home