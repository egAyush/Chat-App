// import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Row, Col, Panel, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signWithProvider = async provider => {
    try {
      const result = await auth.signInWithPopup(provider);
      if (result.additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${result.user.uid}`).set({
          name: result.user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      //   console.log('user', result.user);
      //   console.log('adduser', result.additionalUserInfo);

      Alert.success('Signed in', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onFaceBookSignIn = () => {
    signWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive Chat Platform is for Neophytes(_)</p>
              </div>

              <div className="mt-3">
                <Button block color="blue" onClick={onFaceBookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>

                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
