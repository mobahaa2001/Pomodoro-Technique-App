import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TimerCountDisplay } from './TimerCountDisplay';
import { TimerToggleButton } from './TimerToggleButton';
import { TimerModeDisplay, TimerModes } from './TimerModeDisplay';


const FOCUS_TIME_MINUTES = 25 * 1000 * 60
const BREAk_TIME_MINUTES = 5 * 1000 * 60

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null)

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  const [timerMode, setTimerMode] = useState<TimerModes>("Focus")

  useEffect(() => {
    if (timerCount == 0) {
      if(timerMode == "Focus"){
        setTimerMode("Break")
        setTimerCount(BREAk_TIME_MINUTES)
      } else {
        setTimerMode("Focus")
        setTimerCount(FOCUS_TIME_MINUTES)
      }
      stopTimer()
    }
  }, [timerCount])

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
    <View style={{...styles.container, ...{backgroundColor: timerMode == "Break" ? "#2a9d8f" : "#d95550"}}}>
      <TimerModeDisplay timerMode={timerMode}/>
      <StatusBar style="auto" />
      <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} />
      <TimerCountDisplay timerData={new Date(timerCount)} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d95550',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
