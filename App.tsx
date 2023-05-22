import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TimerCountDisplay } from './TimerCountDisplay';
import { TimerToggleButton } from './TimerToggleButton';


const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000* 60
const BREAk_TIME_MINUTES = 0.1 * 60 * 1000 *60

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null)

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  const startTimer = () => {
    setIsTimerRunning(true)
    const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000)
    setTimerInterval(id)
  }

  const stopTimer = () => {
    if (timerInterval != null) {
      clearInterval(timerInterval)
    }
    setIsTimerRunning(false)
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} />
      <TimerCountDisplay timerData={new Date(timerCount)} />

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
});
