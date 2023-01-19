import React, { useState } from 'react'
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
        <label htmlFor='file' className='db mb2'>File:</label>
        <input id='file' className='db pa2 w-100 ba br2' type='file' onChange={e => setFile(e.target.files[0])} required />
      </div>
      <button type='submit' className='ph3 pv2'>Upload</button>
    </form>
  )
}

const Uploading = ({ file, uploadedCarChunks }) => (
  <div className='flex items-center'>
    <div className='spinner mr3 flex-none' />
    <div className='flex-auto'>
      <p className='truncate'>Uploading DAG for {file.name}</p>
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
    <p className='near-white'>Chunks ({uploadedCarChunks.length}):</p>
    {uploadedCarChunks.map(({ cid, size }) => (
      <p key={cid.toString()} className='f7 truncate'>
        {cid.toString()} ({size} bytes)
      </p>
    ))}
    <h1 className='near-white'>UPLOAD COMPLETO!</h1>
    <p className='near-white'>HASH: {dataCid.toString()}</p>
    <p className='near-white'>LINK FW:</p><p><a href={`https://LinkDiretoPremium.ga/ipfs/${dataCid}/${file.name}`} className='blue'></a><h1{file.name}</h1></p>
    <p className='near-white'>LINK W3S.Link:</p><p><a href={`https://w3s.link/ipfs/${dataCid}/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK Gateway.IpfsCDN.io:</p><p><a href={`https://gateway.ipfscdn.io/ipfs/${dataCid}/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK IPFS.Astyanax.io:</p><p><a href={`https://ipfs.astyanax.io/ipfs/${dataCid}/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK ipfs.best-practice.se:</p><p><a href={`https://ipfs.best-practice.se/ipfs/${dataCid}/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK ipfs.nftstorage.link:</p><p><a href={`https://${dataCid}.ipfs.nftstorage.link/ipfs/${dataCid}/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK cloudflare-ipfs.com:</p><p><a href={`https://cloudflare-ipfs.com/ipfs/${dataCid}/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK ipfs.4everland.io:</p><p><a href={`https://${dataCid}.ipfs.4everland.io/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK gateway.ipfs.io:</p><p><a href={`https://gateway.ipfs.io/ipfs/${dataCid}/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK fleek.ipfs.io:</p><p><a href={`https://fleek.ipfs.io/ipfs/${dataCid}/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK ipfs-gateway.cloud:</p><p><a href={`https://${dataCid}.ipfs.ipfs-gateway.cloud/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK ipfs.dweb.link:</p><p><a href={`https://${dataCid}.ipfs.dweb.link/${file.name}`} className='blue'>{file.name}</a></p>
    <p className='near-white'>LINK STORRY.TV:</p><p><a href={`https://${dataCid}.ipfs.storry.tv/${file.name}`} className='blue'>{file.name}</a></p>
  </div>
)

export default withIdentity(ContentPage)

