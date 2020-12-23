import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyAy1eakhEzpr7SoFNkZobMvf2oG7NuHvd0",
  authDomain: "authentication-30583.firebaseapp.com"
})

class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => { 
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>You are successfully signed in</div>
            <button onClick={() => firebase.auth().signOut()} className = "App-header">Sign out!</button>
            <h1>Hello {firebase.auth().currentUser.displayName}</h1>
            
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default App