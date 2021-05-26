/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native';

import {isIphoneX} from 'react-native-iphone-x-helper';

import {icons, SIZES, COLORS, FONTS} from '../constants';

const Restaurant = ({route, navigation}) => {
  const [restaurant, setRestaurant] = useState();
  const [location, setLocation] = useState();
  console.log(route);

  const scrollX = new Animated.Value(0);

  useEffect(() => {
    const {item, currentLocation} = route.params;
    setRestaurant(item);
    setLocation(currentLocation);
  }, [route.params]);

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnLeft}>
          <Image source={icons.back} style={styles.iconSize} />
        </TouchableOpacity>
        <View style={styles.restaurantNameWrapper}>
          <View style={styles.restaurantName}>
            <Text style={FONTS.h3}>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnRight}>
          <Image
            source={icons.list}
            style={styles.iconSize}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false}
        )}>
        {restaurant?.menu.map((item, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.35}}>
              <Image
                source={item?.photo}
                resizeMode="cover"
                style={{width: SIZES.width, height: '100%'}}
              />
              <View style={styles.qtyWrapper}>
                <TouchableOpacity style={styles.qtyCount}>
                  <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>
                <View style={styles.qty}>
                  <Text style={{...FONTS.h2}}>1</Text>
                </View>
                <TouchableOpacity style={styles.qtyCountP}>
                  <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Name & Description */}
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2
              }}>
              <Text style={{marginVertical: 10, textAlign: 'center'}}>
                {item.name}
              </Text>
              <Text style={{...FONTS.body3}}>{item.description}</Text>
            </View>
            {/* Calories */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10
              }}>
              <Image
                source={icons.fire}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding
          }}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp'
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp'
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrdering() {
    return <View>{renderDots()}</View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrdering()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2
  },
  btnLeft: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: 'center'
  },
  iconSize: {
    width: 30,
    height: 30
  },
  restaurantNameWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  restaurantName: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: SIZES.padding * 3,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray3
  },
  btnRight: {
    width: 50,
    paddingRight: SIZES.padding * 2,
    justifyContent: 'center'
  },
  qtyWrapper: {
    position: 'absolute',
    bottom: -20,
    width: SIZES.width,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  qtyCount: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  qtyCountP: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  qty: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Restaurant;
