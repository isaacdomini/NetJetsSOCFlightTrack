    /**
     * Handle the sign in button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var token = document.getElementById('tokentext').value;
        if (token.length < 10) {
          alert('Please enter a token in the text area');
          return;
        }
        // Sign in with custom token generated following previous instructions.
        // [START authwithtoken]
        firebase.auth().signInWithCustomToken(token).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/invalid-custom-token') {
            alert('The token you provided is not valid.');
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        // [END authwithtoken]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          user.displayName = "shantanu";
          console.log(user.displayName);
          initChat(user);
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE]

        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', signIn, false);
    }

    function getHashValue(key) {
      var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
      return matches ? matches[1] : null;
    }

    window.onload = function() {
      initApp();
      // If a token has been passed in the hash fragment we display it in the UI and start the sign in process.
      document.getElementById('tokentext').value = getHashValue('token') || '';
      if (document.getElementById('tokentext').value) {
        firebase.auth().signInWithCustomToken(getHashValue('token'));
      }
    };

    function initChat(user) {
        // Get a Firebase Database ref
        var chatRef = firebase.database().ref("chat");

        // Create a Firechat instance
        var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

        // Set the Firechat user
        console.log("userId: "+ user.uid + "    userName: " + user.displayName);
        chat.setUser(user.uid, "shantanu");
      }

    function signIn() {
      firebase.auth().signInWithCustomToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjViMTIyZjcxNzAwYjY3ZjIyYmQ0ZjY1ZGQ0NzA1YjI4OGE3Mzg0ZmMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImV4cCI6MTQ4ODM5NzgxMCwiaWF0IjoxNDg4Mzk0MjEwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1uejhsekBmaXJlY2hhdGRldi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLW56OGx6QGZpcmVjaGF0ZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidXNlcl9pZCI6InNoYW45NCIsImRpc3BsYXlOYW1lIjoic2hhbnRhbnUiLCJzY29wZSI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvaWRlbnRpdHl0b29sa2l0In0.MWnJwApQFDa8x84Gpex9wUyV7-mOKwNjoUl90DQW3OaXLXf_0QHkX1Dd3ZOd5m3gwToCXjqhdDxzbTpXWdPtID5Uq8MNd53wwf57hOvkCli--m42_R9qTzljiFGj1kSJh_ReQR7BZWFOagtFVSPwLvCZsi-2bKSxIn3GHJvwpkBiIq8Mfoe3RLneQWzxUD6VX9bKT78bV_kcsKj4x0hy7FzXuav57PTfmYpSk44lvC_mhw-1C6agti1Ze2OXzk_0k7ateKddZSgMbjAt-0-wHDO5wtn_I2-eTNko29A5_AHzuXZtSGm74OcwSnaOhQfEHxx8gw3okv6It4ISn3CvwQ").catch(function(error) {
        console.log("Error authenticating user:", error);
      });
    }