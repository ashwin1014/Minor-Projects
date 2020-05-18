import React from 'react';
import { Text, View } from 'react-native';

import styles from './Header.styles';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>My Todos</Text>
        </View>
    )
};

export default Header;