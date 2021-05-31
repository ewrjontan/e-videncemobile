import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function EditCase(){
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size='large' color='black' />
            <Text style={styles.loadingText}>Loading . . .</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        loadingView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        loadingText: {
            color: 'black',
            fontSize: 14,
            fontWeight: 'bold'
        }
    }
)

export default EditCase;