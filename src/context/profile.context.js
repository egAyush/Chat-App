import { auth, database, messaging } from '../misc/firebase';
import firebase from 'firebase/app';
const { createContext, useState, useContext, useEffect } = require('react');

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userStatusRef;
    let userRef;
    let tokenRefreshUnsub;

    const authUnsub = auth.onAuthStateChanged(async authObj => {
      if (authObj) {
        // console.log(authObj.uid);
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);

        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };

          setProfile(data);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          // If we're not currently connected, don't do anything.
          if (!!snapshot.val() === false) {
            return;
          }

          // If we are currently connected, then use the 'onDisconnect()'
          // method to add a set which will only trigger once this
          // client has disconnected by closing the app,
          // losing internet, or any other means.
          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              // The promise returned from .onDisconnect().set() will
              // resolve as soon as the server acknowledges the onDisconnect()
              // request, NOT once we've actually disconnected:
              // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

              // We can now safely set ourselves as 'online' knowing that the
              // server will mark us as offline once we lose connection.
              userStatusRef.set(isOnlineForDatabase);
            });
        });

        if (messaging) {
          try {
            const currentToken = await messaging.getToken();
            if (currentToken) {
              await database
                .ref(`/fcm_tokens/${currentToken}`)
                .set(authObj.uid);
            }
          } catch (err) {
            console.log('An error occured while retrieving token', err);
          }

          tokenRefreshUnsub = messaging.onTokenRefresh(async () => {
            try {
              const currentToken = await messaging.getToken();
              if (currentToken) {
                await database
                  .ref(`/fcm_tokens/${currentToken}`)
                  .set(authObj.uid);
              }
            } catch (err) {
              console.log('An error occured while retrieving token', err);
            }
          });
        }
      } else {
        if (userRef) {
          userRef.off();
        }

        if (userStatusRef) {
          userStatusRef.off();
        }

        if (tokenRefreshUnsub) {
          tokenRefreshUnsub();
        }

        database.ref('.info/connected').off();

        setProfile(null);
        setIsLoading(false);
      }
      //   console.log('authObj', authObj);
    });

    return () => {
      authUnsub();

      database.ref('.info/connected');
      if (userRef) {
        userRef.off();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }

      if (tokenRefreshUnsub) {
        tokenRefreshUnsub();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
