import React, {useState, useRef, useCallback, Fragment} from 'react';
import {StyleSheet, FlatList, Image, View, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

// Local import
import {OnBoardingSlide} from '../api/constant';
import {
  deviceHeight,
  deviceWidth,
  getHeight,
  moderateScale,
  screenFullHeight,
  screenHeight,
  screenWidth,
} from '../common/constants';
import AButton from '../components/common/AButtton';
import AText from '../components/common/AText';
import strings from '../i18n/strings';
import {StackNav} from '../navigation/NavigationKeys';
import {styles} from '../themes';
import {setOnBoarding} from '../utils/helpers';

const OnBoarding = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const slideRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = {itemVisiblePercentThreshold: 50};

  const onPressRightArrow = async () => {
    if (currentIndex === 2) {
      await setOnBoarding(true);
      navigation.reset({
        index: 0,
        routes: [{name: StackNav.Auth}],
      });
    } else {
      slideRef.current._listRef._scrollRef.scrollTo({
        x: screenWidth * (currentIndex + 1),
      });
    }
  };

  const TitlAText = () => {
    switch (currentIndex) {
      case 0:
        return strings.onBoardingTitle1;
      case 1:
        return strings.onBoardingTitle2;
      case 2:
        return strings.onBoardingTitle3;
      default:
        return strings.onBoardingTitle1;
    }
  };

  const RenderOnboardingItem = useCallback(
    ({item, index}) => {
      return (
        <View style={localStyles.rendetItemConatiner}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={localStyles.imageStyle}
          />
        </View>
      );
    },
    [OnBoardingSlide],
  );

  const BottomIndicator = () => {
    return (
      <View style={styles.rowCenter}>
        {OnBoardingSlide?.map((_, index) => (
          <View
            style={[
              localStyles.bottomIndicatorStyle,
              {
                width:
                  index !== currentIndex
                    ? moderateScale(10)
                    : moderateScale(20),
                backgroundColor:
                  index !== currentIndex ? colors.dark3 : colors.primary5,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={[styles.flex, {backgroundColor: colors.background}]}>
        <FlatList
          data={OnBoardingSlide}
          ref={slideRef}
          renderItem={({item, index}) => (
            <RenderOnboardingItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          pagingEnabled
        />
        <View
          style={[
            localStyles.bottomStyle,
            {backgroundColor: colors.background},
          ]}>
          <View style={localStyles.titleTextContainer}>
            <AText align={'center'} type={'B34'}>
              <TitlAText />
            </AText>
          </View>
          <BottomIndicator />
          <AButton
            title={currentIndex === 2 ? strings.getStarted : strings.next}
            containerStyle={localStyles.submitButton}
            textType={'B18'}
            color={colors.whiteColor}
            onPress={onPressRightArrow}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.background}} />
    </Fragment>
  );
};

const localStyles = StyleSheet.create({
  submitButton: {
    ...styles.mt15,
    ...styles.mh25,
    width: '100%',
  },
  rendetItemConatiner: {
    width: screenWidth,
    ...styles.center,
    ...styles.mt15,
  },
  imageStyle: {
    height: screenHeight - getHeight(200),
    width: screenWidth,
  },
  bottomIndicatorStyle: {
    height: moderateScale(10),
    ...styles.mv20,
    borderRadius: moderateScale(10),
    ...styles.mh5,
  },
  bottomStyle: {
    ...styles.pv10,
    top: moderateScale(-40),
    minHeight: getHeight(340),
    borderTopEndRadius: moderateScale(36),
    borderTopStartRadius: moderateScale(36),
    ...styles.center,
    ...styles.ph20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleTextContainer: {
    ...styles.mt10,
    width: '100%',
    height: moderateScale(160),
    ...styles.center,
    ...styles.selfCenter,
  },
});

export default OnBoarding;
