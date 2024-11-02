import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordsList, setPasswordsList] = useState([])

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = "";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str +="0123456789";
    if(charAllowed) str +="!@#$%^&*()_+";

    for(let i = 0; i < length; i++){
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
    console.log(pass)

    setPasswordsList(prev => [pass, ...prev])
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  const resetPasswordList = () =>{
    setPasswordsList([])
  }

  const generateNewPassword = () => {
    generatePassword()
  }
  useEffect(()=>{generatePassword()}, [length, numberAllowed, charAllowed]);

  return (
    <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-3xl font-bold mb-2 text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef} 
          />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 w-3/5'
        >Copy</button>
         <button
          onClick={resetPasswordList}
          className='outline-none bg-blue-700 text-white px-3 ml-2 w-3/5'
        >Reset password list</button>
        <button
          onClick={generateNewPassword}
          className='outline-none bg-blue-700 text-white px-3 ml-2 w-3/5'
        >New password with {length} characters</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e)=> setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length">Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} 
            name=""
            id=""
          />
          <label htmlFor="number">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }} 
          name=""
          id="characterInput"
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>

      <div>
        <h1>Generated Pass</h1>
        <div>
          <ul>
            {passwordsList.map((pwd, index) => (
            <li key = {index}>{pwd}</li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
