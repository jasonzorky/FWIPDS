import React, {useState} from 'react'
import { useUploader } from '@w3ui/react-uploader'
import { withIdentity } from './components/Authenticator'
import './spinner.css'


export function ContentPage () {
  const [{ uploadedCarChunks }, uploader] = useUploader()
  const [file, setFile] = useState(null)
  const [dataCid, setDataCid] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)

  if (!uploader) return null

  const handleUploadSubmit = async e => {
    e.preventDefault()
    try {
      setStatus('uploading')
      const cid = await uploader.uploadFile(file)
      setDataCid(cid)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setStatus('done')
    }
  }

  if (status === 'uploading') {
    return <Uploading file={file} uploadedCarChunks={uploadedCarChunks} />
  }

  if (status === 'done') {
    return error ? <Errored error={error} /> : <Done file={file} dataCid={dataCid} uploadedCarChunks={uploadedCarChunks} />
  }

  return (
    <form onSubmit={handleUploadSubmit}>
      <div className='db mb3'>
        <label htmlFor='file' className='db mb2'>Arquivo:</label>
        <input id='file' className='db pa2 w-100 ba br2' type='file' onChange={e => setFile(e.target.files[0])} required />
      </div>
      <button type='submit' className='ph3 pv2'>UPLOAD</button>
    </form>
  )
}

const Uploading = ({ file, uploadedCarChunks }) => (
  <div className='flex items-center'>
    <div className='spinner mr3 flex-none' />
    <div className='flex-auto'>
      <p className='truncate'>Upando em partes para: {file.name}</p>
      {uploadedCarChunks.map(({ cid, size }) => (
        <p key={cid.toString()} className='f7 truncate'>
          {cid.toString()} ({size} bytes)
        </p>
      ))}
    </div>
  </div>
)

const Errored = ({ error }) => (
  <div>
    <h1 className='near-white'>⚠️ Error: Falha em fazer o upload: {error.message}</h1>
    <p>Cheque o console para mais informação.</p>
  </div>
)


const Done = ({ file, dataCid, uploadedCarChunks }) => (

  <div>
    <p className='near-white'>Partes Divididas ({uploadedCarChunks.length}):</p>
    {uploadedCarChunks.map(({ cid, size }) => (
      <p key={cid.toString()} className='f7 truncate'>
        {cid.toString()} ({size} bytes)
      </p>
    ))}
    
    <h1 className='near-white'>UPLOAD COMPLETO!</h1>
    <p className='near-white'>HASH:{dataCid.toString()}</p>

<h5><a href={`https://LinkDiretoPremium.ga/${dataCid}/?filename=${file.name}`} className='blue' rel="noopener" target="_blank">https://LinkDiretoPremium.ga/{dataCid.toString()}/?filename={file.name}</a></h5>
<h5><a href={`https://cloudflare-ipfs.com/ipfs/${dataCid}/?filename=${file.name}`} className='blue' rel="noopener" target="_blank">https://cloudflare-ipfs.com/ipfs/{dataCid.toString()}/?filename={file.name}</a></h5>
<h5><a href={`https://gateway.ipfs.io/ipfs/${dataCid}/?filename=${file.name}`} className='blue' rel="noopener" target="_blank">https://gateway.ipfs.io/ipfs/{dataCid.toString()}/?filename={file.name}</a></h5>
<h5><a href={`https://gateway.ipfscdn.io/ipfs/${dataCid}/?filename=${file.name}`} className='blue' rel="noopener" target="_blank">https://gateway.ipfscdn.io/ipfs/{dataCid.toString()}/?filename={file.name}</a></h5>
<h5><a href={`https://ipns.co/ipfs/${dataCid}/?filename=${file.name}`} className='blue' rel="noopener" target="_blank">https://ipns.co/ipfs/{dataCid.toString()}/?filename={file.name}</a></h5>
<h5><a href={`https://gateway.pinata.cloud/ipfs/${dataCid}/?filename=${file.name}`} className='blue' rel="noopener" target="_blank">https://gateway.pinata.cloud/ipfs/{dataCid.toString()}/?filename={file.name}</a></h5>




  </div>
)

export default withIdentity(ContentPage)
