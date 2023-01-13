'use strict'

function fetchSession() {
  return fetch('/api/session', {
      method: 'GET',
  })
      .catch( () => Promise.reject({ error: 'networkError' }) )
      .then( response => {
          if (response.ok) {
              return response.json();
          }
          return response.json()
              .catch( error => Promise.reject({ error }) )
              .then( err => Promise.reject(err) );
      });
}

function fetchLogout() {
  return fetch('/api/session', {
      method: 'DELETE',
  })
      .catch( () => Promise.reject({ error: 'networkError' }) )
      .then( response => {
          if (response.ok) {
              return response.json();
          }
          return response.json()
              .catch( error => Promise.reject({ error }) )
              .then( err => Promise.reject(err) );
      });
}

function fetchLogin(username) {
  return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
          'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
  })
      .catch( () => Promise.reject({ error: 'networkError' }) )
      .then( response => {
          if (response.ok) {
              return response.json();
          }
          return response.json()
              .catch( error => Promise.reject({ error }) )
              .then( err => Promise.reject(err) );
      });
}

function fetchWord() {
  return fetch('/api/word',{
      method: 'GET',
    })
      .catch( () => Promise.reject({ error: 'networkError' }) )
      .then( response => {
          if (response.ok) {
              return response.json();
          }
          return response.json()
              .catch( error => Promise.reject({ error }) )
              .then( err => Promise.reject(err) );
      });
}

function fetchChangeWord(username, word ) {
  return fetch('/api/word', {
      method: 'POST',
      headers: new Headers({
      'content-type': 'application/json'
      }),
    body: JSON.stringify({ username, word }),
    })
      .catch( () => Promise.reject({ error: 'networkError' }) )
      .then( response => {
          if (response.ok) {
              return response.json();
          }
          return response.json()
              .catch( error => Promise.reject({ error }) )
              .then( err => Promise.reject(err) );
      });
}

export{fetchSession, fetchLogin, fetchLogout,
        fetchWord, fetchChangeWord}