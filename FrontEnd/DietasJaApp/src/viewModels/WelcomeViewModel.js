import { useNavigation } from '@react-navigation/native';

export const useWelcomeViewModel = () => {
    const navigation = useNavigation();

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    return {
        handleLoginPress,
    };
};