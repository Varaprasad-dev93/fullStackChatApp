import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { axiosInstance } from '../lib/axios';
import { LoaderCircle } from 'lucide-react';

export default function Compiler() {
  const [lang, setLang] = useState('python');
  const [output, setOutput] = useState('Compile the Program and come here!!');
  const [input, setInput] = useState('');
  const [showIO, setShowIO] = useState('Input');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-gray-900">
        <LoaderCircle className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  const compile = () => {
    setLoading(true);
    setShowIO('Output');
    try {
      if (code.trim() === "") {
        setOutput("Write your code!!");
        setLoading(false);
        return;
      }
      axiosInstance
        .post('/auth/compile', { code, input, lang })
        .then((res) => {
          setOutput(res.data.stdout || res.data.stderr.err);
        })
        .catch(() => {
          setShowIO('Output');
          setOutput("Error in compiler response. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Compilation error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-y-scroll w-full bg-gray-800 text-white flex flex-col">
      
      {/* Header with Language Select & Run Button */}
      <div className="flex items-center justify-between bg-gray-800 px-6 py-3 border-b border-gray-700 shadow-md">
        <div className="text-lg font-semibold text-gray-300">
          Languages:
          <select
            className="ml-2 p-2 bg-gray-700 text-white border rounded-lg focus:outline-none"
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
        </div>
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          onClick={() => { compile(); setOutput(''); }}
        >
          Run
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 w-full ">
        <Editor
          height="70vh"
          width="100%"
          theme="vs-dark"
          language={lang}
          value={code}
          onChange={(newValue) => setCode(newValue)}
        />
      </div>

      {/* Input / Output Toggle Tabs */}
      <div className="flex bg-gray-800 border-t border-gray-700">
        <button
          className={`flex-1 py-2 text-center ${showIO === 'Input' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500`}
          onClick={() => setShowIO('Input')}
        >
          Input
        </button>
        <button
          className={`flex-1 py-2 text-center ${showIO === 'Output' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500`}
          onClick={() => setShowIO('Output')}
        >
          Output
        </button>
      </div>

      {/* Input & Output Sections */}
      <div className="p-4">
        {showIO === 'Input' ? (
          <textarea
            className="w-full h-40 bg-gray-800 text-white p-3 rounded-lg border border-gray-700 outline-none"
            placeholder="Enter input data..."
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          <div className="w-full h-40 bg-gray-800 text-white p-3 rounded-lg border border-gray-700">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
