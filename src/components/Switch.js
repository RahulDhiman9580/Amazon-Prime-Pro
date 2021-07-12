import * as React from "react";
import { View, Switch, StyleSheet } from "react-native";

//custom imports


export const SwitchButton = (props) => {
  

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#00AAE1" }}
        thumbColor={props.isEnabled ? "#blue" : "#f4f3f4"}
        ios_backgroundColor="#999999"
        onValueChange={props.toggleSwitch}
        value={props.isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  }
});
