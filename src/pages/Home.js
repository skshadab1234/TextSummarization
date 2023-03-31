import React, { useState } from 'react'
import axios from "axios";


const Home = () => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false);
  const [summarize, setsummarize] = useState('');

  const [synth, setSynth] = useState(window.speechSynthesis);
  const [voice, setVoice] = useState(null);


  const createSummarizeParams = (text, numSentences) => {
    const params = {
      text,
      num_sentences: numSentences
    };
    return JSON.stringify(params);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const options = {
      method: 'POST',
      url: 'https://gpt-summarization.p.rapidapi.com/summarize',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '8e26854509msh49a75b197e64648p140485jsn9d4e00fb2be9',
        'X-RapidAPI-Host': 'gpt-summarization.p.rapidapi.com'
      },
      data: createSummarizeParams(text, 5)
    };

    axios.request(options).then(function (response) {
      setsummarize(response.data.summary)
      setLoading(false)
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
                <label for="textMessage" className="leading-7 font-medium text-gray-900">Paste your text</label>
                <textarea
                  rows={14}
                  cols={80}
                  placeholder="Put your text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-textarea mt-2 border-2 p-2"
                />
              </div>
              <div className="flex justify-end mt-4">
                {
                  loading ? 'Loading' :
                    <button type="button" className={`${text === '' ? "hidden" : ''} bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded`} onClick={handleSubmit}>
                      Summarize
                    </button>
                }
              </div>

              <div className='mt-10'>

                {
                  summarize !== '' ? <>
                    <h2 className='text-2xl font-bold mb-2'> Summarized Text</h2>
                    <select className='appearance-none bg-gray-100 border rounded p-2 text-gray-700 mr-2' onChange={handleVoiceChange}>
                      {synth && synth.getVoices().map((voice, index) => (
                        <option key={index} value={index}>
                          {`${voice.name} (${voice.lang})`}
                        </option>
                      ))}
                    </select>
                    
                    <button className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded' onClick={handleSpeak}>Speak</button>
                    
                    <button className='ml-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded' onClick={handleStop}>Stop</button>
                    <p className='text-justify mt-2'>{summarize}</p>
                  </>
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home