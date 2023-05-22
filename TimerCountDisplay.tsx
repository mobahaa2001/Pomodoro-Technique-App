import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    timerData: Date;
}

export const TimerCountDisplay: React.FC<Props> = ({ timerData }) => {
    return (
        <View>
          <Text style={styles.timerCountText}>{timerData.getMinutes().toString().padStart(2, "0")}:{timerData.getSeconds().toString().padStart(2, "0")}</Text>
        </View>
      )
}

const styles = StyleSheet.create ({
    timerCountText: {
        fontSize: 30,
        fontWeight: '700',

    },
})
