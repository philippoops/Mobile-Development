import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../UI/colors';

export default function Audio1() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState('');

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage('Please grant permission to app to access microphone');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      console.log(recordingLine.sound);
      return (
        <View key={index} style={styles.row}>
          <View style={styles.columnOutput}>
            <Text style={styles.fill}>
              Recording - {recordingLine.duration}
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => recordingLine.sound.playAsync()}
              >
                <Ionicons
                  style={styles.buttonRemote}
                  name="play-circle"
                  size={30}
                  color={GlobalStyles.colors.third}
                />
                <Text>Play</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => recordingLine.sound.pauseAsync()}
              >
                <Ionicons
                  style={styles.buttonRemote}
                  name="md-pause-circle-sharp"
                  size={30}
                  color={GlobalStyles.colors.third}
                />
                <Text>Pause</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => recordingLine.sound.stopAsync()}
              >
                <Ionicons
                  style={styles.buttonRemote}
                  name="ios-stop-circle-sharp"
                  size={30}
                  color={GlobalStyles.colors.third}
                />
                <Text>Stop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => recordingLine.sound.replayAsync()}
              >
                <MaterialIcons
                  style={styles.buttonRemote}
                  name="replay-circle-filled"
                  size={31.4}
                  color={GlobalStyles.colors.third}
                />
                <Text>Replay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>L_Buenaflor</Text>
        <Text style={styles.textHeader}>Lab 6- Audio App</Text>
      </View>
      <Text>{message}</Text>
      <Text
        style={{
          fontSize: 30,
          backgroundColor: GlobalStyles.colors.secondary,
          paddingVertical: 10,
          paddingHorizontal: 30,
          color: GlobalStyles.colors.third,
        }}
      >
        {recordings.length === 1 ? 'Recording Stopped' : 'Start Recording'}
      </Text>

      <View
        style={
          recordings.length === 1 ? styles.buttonHidden : styles.buttonContainer
        }
      >
        <TouchableOpacity style={styles.button} onPress={startRecording}>
          <Ionicons name="recording" size={25} color="red" />
          <Text style={{ marginLeft: 10, fontSize: 20, color: 'red' }}>
            Record
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={stopRecording}>
          <Ionicons name="ios-stop-circle-outline" size={25} color="black" />
          <Text style={{ marginLeft: 10, fontSize: 20, color: 'black' }}>
            Stop
          </Text>
        </TouchableOpacity>
      </View>
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnOutput: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    margin: 16,
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 30,
  },
  buttonHidden: {
    display: 'none',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: GlobalStyles.colors.gray,
    width: 120,
    padding: 10,
    borderRadius: 9,
    marginHorizontal: 10,
  },
  buttonRemote: {
    backgroundColor: GlobalStyles.colors.primary,
    padding: 6,
    marginHorizontal: 10,
  },
});
