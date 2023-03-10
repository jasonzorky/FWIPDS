import React, { useState } from 'react'
import { useAuth, AuthStatus } from '@w3ui/react-keyring'

export default function Authenticator ({ children }) {
  const { authStatus, identity, registerAndStoreIdentity, cancelRegisterAndStoreIdentity } = useAuth()
  const [email, setEmail] = useState('')

  if (authStatus === AuthStatus.SignedIn) {
    return children
  }

  if (authStatus === AuthStatus.EmailVerification) {
    return (
      <div>
        <h1 className='near-white'>Verifique seu email!</h1>
        <p>Clique no link enviado para o email: {identity && identity.email} para fazer login.</p>
        <form onSubmit={e => { e.preventDefault(); cancelRegisterAndStoreIdentity() }}>
          <button type='submit' className='ph3 pv2'>Cancelar</button>
        </form>
      </div>
    )
  }

  const handleRegisterSubmit = async e => {
    e.preventDefault()
    try {
      await registerAndStoreIdentity(email)
    } catch (err) {
      throw new Error('Falha no Login', { cause: err })
    }
  }

  return (
    <form onSubmit={handleRegisterSubmit}>
      <div className='mb3'>
        <label htmlFor='email' className='db mb2'>Digite seu Email:</label>
        <input id='email' className='db pa2 w-100' type='email' value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <button type='submit' className='ph3 pv2'>LOGIN</button>
    </form>
  )
}

/**
 * Wrapping a component with this HoC ensures an identity exists.
 */
export function withIdentity (Component) {
  return props => (
    <Authenticator>
      <Component {...props} />
    </Authenticator>
  )
}
