import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f7f8fa",
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 8,
        color: '#333',
    },
    subHeaderText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    card: {
        width: width * 0.9,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginBottom: 16,
    },
    indexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    indexValue: {
        fontSize: 42,
        fontWeight: 'bold',
    },
    indexLabel: {
        fontSize: 16,
        color: '#888',
        marginTop: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f8fa',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    statusText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    alertBox: {
        width: width * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF1F0',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 5,
        borderLeftColor: '#F17163',
    },
    alertText: {
        marginLeft: 10,
        fontSize: 15,
        color: '#D94C3D',
        flex: 1,
    },

    colorNormal: { color: '#04C84E' },
    colorWarning: { color: '#F2994A' },
    colorDanger: { color: '#D94C3D' },
});

export default styles;