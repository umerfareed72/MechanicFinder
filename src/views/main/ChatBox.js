import React from 'react';
import Pusher from 'pusher-js/react-native';
import {StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import pusherConfig from '../../config/pusher.json';
import ChatView from './ChatView';
import AsyncStorage from '@react-native-community/async-storage';
export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      data: [],
      firstname: '',
      lastname: '',
    };
    this.pusher = new Pusher(pusherConfig.key, pusherConfig); // (1)
    this.chatChannel = this.pusher.subscribe('chat_channel'); // (2)
    this.chatChannel.bind('pusher:subscription_succeeded', () => {
      // (3)
      this.chatChannel.bind('message', (data) => {
        // (6)
        this.handleMessage(data.name, data.message);
      });
    });

    this.handleSendMessage = this.onSendMessage.bind(this); // (9)
  }

  handleMessage(name, message) {
    // (6)
    const messages = this.state.messages.slice();
    messages.push({action: 'message', name: name, message: message});
    this.setState({
      messages: messages,
    });
  }
  componentDidMount() {
    AsyncStorage.getItem('userdata').then((res) => {
      res = JSON.parse(res);
      console.log(this.state.data, 'User data');
      this.setState({data: res});
      this.setState({
        firstname: this.state.data.firstname,
      });
      this.setState({
        lastname: this.state.data.lastname,
      });
    });
  }
  onSendMessage(text) {
    // (9)
    const payload = {
      message: text,
    };
    fetch(
      `${pusherConfig.restServer}/users/'${this.state.firstname}'/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
  }

  render() {
    // (10)
    const messages = this.state.messages;

    return (
      <ChatView messages={messages} onSendMessage={this.handleSendMessage} />
    );
  }
}
